const content = document.getElementById('contenidorInfo');
const apiKey = '&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/search?';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

fetch(apiContent)
  .then(response => response.json())
  .then(data => {
    
    let breedsContainer = document.createElement('div');
    data.forEach(breed => {
        // Crear un elemento de lista para cada raza
        let breedItem = document.createElement('div');
        
        // Agregar introducción antes de la imagen
        let intro = document.createElement('p');
        intro.textContent = breed.name;
        breedItem.appendChild(intro);
        
        fetch(`${apiImages}${breed.id}${apiKey}`)
          .then(response => response.json())
          .then(json => {
            const image = document.createElement('img');
            image.src = json[0].url;
            breedItem.appendChild(image);
          });
        
        // Agregar el elemento de lista al contenedor de razas
        breedsContainer.appendChild(breedItem);
        
    });

    // Agregar el contenedor de razas al documento
    document.body.appendChild(breedsContainer);
  });