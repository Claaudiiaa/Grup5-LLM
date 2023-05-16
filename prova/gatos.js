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

const selectDiv = document.getElementById('prova');
const content = document.getElementById('content');
const apiKey = '&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/search?';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

fetch(apiContent)
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
            const breedData = data[0].breeds[0];
            const breedName = breedData.name;
            const breedDescription = breedData.description;
            const breedImageURL = data[0].url;

            console.log("Breed Name:", breedName);
            console.log("Breed Description:", breedDescription);
            console.log("Breed Image URL:", breedImageURL);

            const filtered = json.filter(cat => cat.origin == gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                const item = document.createElement('div');

                item.textContent = `Cat ID: ${cat.id} Cat Name: ${cat.name} Cat Origin: ${cat.origin} Desc: ${cat.description}`;

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
}
