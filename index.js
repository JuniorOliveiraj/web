let pokemonData = [];
fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  .then(response => response.json())
  .then(data => {
    pokemonData = data.results;
    console.log(pokemonData);
  })
  .catch(error => {
    console.error('Erro ao fazer a requisição:', error);
  });
  const container = document.querySelector('.container');
  const imgCard = document.querySelector('.d-block w-100');

  fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  .then(response => response.json())
  .then(data => {
    const pokemonData = data.results;

    const promises = pokemonData.map(pokemon => {
      return fetch(pokemon.url)
        .then(response => response.json());
    });

    Promise.all(promises)
      .then(pokemonDetails => {
        pokemonDetails.forEach(pokemon => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.style.width = '18rem';

          const images = pokemon.sprites;
          for (const property in images) {
            if (typeof images[property] === 'string' && images[property].startsWith('http')) {
              const cardImage = document.createElement('img');
              cardImage.classList.add('card-img-top');
              cardImage.src = images[property];
              card.appendChild(cardImage);
            }
          }

          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          const cardTitle = document.createElement('h5');
          cardTitle.classList.add('card-title');
          cardTitle.textContent = pokemon.name;

          const cardText = document.createElement('p');
          cardText.classList.add('card-text');
          cardText.textContent = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';

          const cardLink = document.createElement('a');
          cardLink.classList.add('btn', 'btn-primary');
          cardLink.href = '#';
          cardLink.textContent = 'Go somewhere';

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(cardText);
          cardBody.appendChild(cardLink);

          card.appendChild(cardBody);

          container.appendChild(card);
        });
      });
  });

  fetch(pokemonData[0].url)
  .then(response => response.json())
  .then(data => {
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = data.sprites.front_default;
    container.querySelector('.card').appendChild(cardImage);
  });
