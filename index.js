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
              cardImage.classList.add('.d-block');
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
          cardText.textContent = ''; 

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

        // fetch(pokemonData[0].url)
        //   .then(response => response.json())
        //   .then(data => {
        //     const carouselItem = document.querySelector('.carousel');
        //     carouselItem.classList.add('carousel-item', 'active');

        //     const cardImage = document.createElement('img');
        //     cardImage.classList.add('d-block', 'w-100');
        //     cardImage.src = data.sprites.front_default;

        //     carouselItem.appendChild(cardImage);

        //     const carouselInner = document.querySelector('.carousel-inner');
        //     carouselInner.appendChild(carouselItem);
        //   });
      });
  });

const images = document.querySelector(".d-block");

const btn = document.querySelector(".butaopincipal");
btn.addEventListener("click", clicou);

function clicou (){
 
}
