const selectDiv = document.getElementById('selector');
const content = document.getElementById('contenidorOrigen');
const apiKey = '&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/search?';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Aquí puedes hacer lo que desees con los datos de las razas de gatos
    
    let breedsContainer = document.createElement('div');
    data.forEach(breed => {
        // Crear un elemento de lista para cada raza
        const breedItem = document.createElement('li');
        breedItem.textContent = breed.name;

        // Agregar el elemento de lista al contenedor de razas
        breedsContainer.appendChild(breedItem);
    });

    // Agregar el contenedor de razas al documento
    document.body.appendChild(breedsContainer);
  });