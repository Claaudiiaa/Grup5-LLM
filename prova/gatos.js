const breedSelect = document.getElementById('breedSelect');
const breedInfo = document.getElementById('breedInfo');
const breedImage = document.getElementById('breedImage');
const origin = document.getElementById('origin');
const description = document.getElementById('description');
const affectionLevel = document.getElementById('affectionLevel');
const adaptability = document.getElementById('adaptability');
const childFriendly = document.getElementById('childFriendly');
const dogFriendly = document.getElementById('dogFriendly');
const energyLevel = document.getElementById('energyLevel');
const grooming = document.getElementById('grooming');
const healthIssues = document.getElementById('healthIssues');
const intelligence = document.getElementById('intelligence');
const sheddingLevel = document.getElementById('sheddingLevel');
const socialNeeds = document.getElementById('socialNeeds');
const strangerFriendly = document.getElementById('strangerFriendly');
const vocalisation = document.getElementById('vocalisation');
const wikipediaLink = document.getElementById('wikipediaLink');

async function getBreeds() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds/');
        const data = await response.json();
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function getBreedInfo() {
    const selectedBreedId = breedSelect.value;
    if (selectedBreedId) {
        try {
            const response = await fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`);
            const data = await response.json();
            breedInfo.style.display = 'block';
            breedImage.src = data.image.url;
            breedImage.alt = data.name;
            origin.textContent = data.origin;
            description.textContent = data.description;
            affectionLevel.textContent = data.affection_level;
            adaptability.textContent = data.adaptability;
            childFriendly.textContent = data.child_friendly;
            dogFriendly.textContent = data.dog_friendly;
            energyLevel.textContent = data.energy_level;
            grooming.textContent = data.grooming;
            healthIssues.textContent = data.health_issues;
            intelligence.textContent = data.intelligence;
            sheddingLevel.textContent = data.shedding_level;
            socialNeeds.textContent = data.social_needs;
            strangerFriendly.textContent = data.stranger_friendly;
            vocalisation.textContent = data.vocalisation;
            wikipediaLink.href = data.wikipedia_url;
        } catch (error) {
            console.error(error);
        }
    } else {
        breedInfo.style.display = 'none';
    }
}

getBreeds();
const selectDiv = document.getElementById('prova');
const content = document.getElementById('content');
const apiKey = 'QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/search?';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

fetch(apiContent)
  .then(response => response.json())
  .then(data => {
    const select = document.createElement('select');
    data.forEach(gat => {
      const option = document.createElement('option');
      option.value = gat.id;
      option.textContent = gat.name;
      option.setAttribute('data-img-id', gat.reference_image_id);
      select.appendChild(option);
    });
    selectDiv.appendChild(select);

    select.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const gatId = selectedOption.value;
      const nom = selectedOption.textContent;
      const imgId = selectedOption.getAttribute('data-img-id');
      buscar(imgId, gatId);
    });
  });

function buscar(imgId, gatId) {
  const link = `${apiImages}breed_id=${gatId}&api_key=${apiKey}`;
  fetch(link)
    .then(response => response.json())
    .then(data => {
      content.innerHTML = '';
      console.log('Number of Cats:', data.length);

      data.forEach(cat => {
        const item = document.createElement('div');
        const breedName = cat.breeds[0].name;
        const breedDescription = cat.breeds[0].description;
        const breedImageURL = cat.url;
        item.textContent = `Breed Name: ${breedName} Breed Description: ${breedDescription} Breed Image URL: ${breedImageURL}`;

        content.appendChild(item);
        content.appendChild(document.createElement('br'));
      });
    });
}



/*fetch(apiContent)
    .then(response => response.json())
    .then(data => {
        const select = document.createElement('select');
        let gatId, nom, imgId;
        const originPlaces = [];
        data.forEach(gat => {
            if (!originPlaces.includes(gat.origin)) {
                originPlaces.push(gat.origin);
                const option = document.createElement('option');
                option.value = gat.origin;
                option.textContent = gat.origin;
                option.setAttribute('data-img-id', gat.reference_image_id);
                select.appendChild(option);
            }
        });
        selectDiv.appendChild(select);

        select.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            gatId = selectedOption.value;
            nom = selectedOption.textContent;
            imgId = selectedOption.getAttribute('data-img-id');
            buscar(imgId, nom, gatId);
        });
    });

function buscar(imgId, gatId) {
    fetch(apiContent)
        .then(response => response.json())
        .then(data => {
            const link = `${apiImages}breed_id=aege${apiKey}`;
            return fetch(link);
        })
        .then(response => response.json())
        .then(data => {

            //aixo d'aqui mostra les dades per terminal fara falta passar-ho a lo de avaix
            const filtered = data.filter(cat => cat.origin == gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                console.log(cat.lenght)
                const item = document.createElement('div');
                const breedData = cat.breeds[0];
                const breedName = breedData.name;
                const breedDescription = breedData.description;
                const breedImageURL = cat.url;
                item.textContent = `Breed Name: ${breedName} Breed Description: ${breedDescription} Breed Image URL: ${breedImageURL}`
                console.log("Breed Name:", breedName);
                console.log("Breed Description:", breedDescription);
                console.log("Breed Image URL:", breedImageURL);
                /*item.textContent = `Cat ID: ${cat.id} \nCat Name: ${cat.name} \nCat Origin: ${cat.origin} \nDesc: ${cat.description}`;
                content.appendChild(item2)
                // Agregamos la imagen después del texto
                fetch(`${apiImages}${imgId}${apiKey}`)
                    .then(response => response.json())
                    .then(json => {
                        const image = document.createElement('img');
                        image.src = json[0].url;
                        item.appendChild(image);
                    });

                content.appendChild(item);

                content.appendChild(`br`);
            });
        });
}*/
/*const selectDiv = document.getElementById('prova');
const content = document.getElementById('content');
const apiKey = '&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/search?';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

/*fetch(apiContent)
    .then(response => response.json())
    .then(data => {
        const select = document.createElement('select');
        select.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            const gatId = selectedOption.value;
            const nom = selectedOption.textContent;
            const imgId = selectedOption.getAttribute('data-img-id');
            buscar(imgId, nom, gatId);
        });

        data.forEach(gat => {
            const option = document.createElement('option');
            option.value = gat.id;
            option.textContent = gat.name;
            option.setAttribute('data-img-id', gat.reference_image_id);
            select.appendChild(option);
        });

        selectDiv.appendChild(select);
    });

function buscar(imgId, nom, gatId) {
    fetch(`${apiImages}breed_id=${gatId}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(json => {
            const filtered = json.filter(cat => cat[0] === gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                var breedData = data[0].breeds[0];
                const item = document.createElement('div');
                item.textContent = `Cat ID: ${breedData.id} Cat Name: ${breedData.name} Cat Origin: ${breedData.origin} Desc: ${breedData.description}`;

                const image = document.createElement('img');
                image.src = cat.url;
                item.appendChild(image);

                content.appendChild(item);
            });
        });
}
var contingut = '[{"breeds":[{"weight":{"imperial":"7 - 10","metric":"3 - 5"},"id":"aege","name":"Aegean","vetstreet_url":"http://www.vetstreet.com/cats/aegean-cat","temperament":"Affectionate, Social, Intelligent, Playful, Active","origin":"Greece","country_codes":"GR","country_code":"GR","description":"Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.","life_span":"9 - 12","indoor":0,"alt_names":"","adaptability":5,"affection_level":4,"child_friendly":4,"dog_friendly":4,"energy_level":3,"grooming":3,"health_issues":1,"intelligence":3,"shedding_level":3,"social_needs":4,"stranger_friendly":4,"vocalisation":3,"experimental":0,"hairless":0,"natural":0,"rare":0,"rex":0,"suppressed_tail":0,"short_legs":0,"wikipedia_url":"https://en.wikipedia.org/wiki/Aegean_cat","hypoallergenic":0,"reference_image_id":"ozEvzdVM-"}],"id":"ks5wRxZmP","url":"https://cdn2.thecatapi.com/images/ks5wRxZmP.jpg","width":1939,"height":1400}]';

// Parse the JSON content
var data = JSON.parse(contingut);

// Extract the desired information
var breedData = data[0].breeds[0];
var breedName = breedData.name;
var breedDescription = breedData.description;
var breedImageURL = data[0].url;

// Log the extracted information
console.log("Breed Name:", breedName);
console.log("Breed Description:", breedDescription);
console.log("Breed Image URL:", breedImageURL);*/
