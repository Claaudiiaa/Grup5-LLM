const selectDiv = document.getElementById('selector');
const content = document.getElementById('contenidorOrigen');
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
        .then(json => {
            const filtered = json.filter(cat => cat.origin == gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                const item = document.createElement('div'); 
                item.textContent = `Cat Name: ${cat.name} \nCat Origin: ${cat.origin} Desc: ${cat.description}`;
                item.innerHTML += `<br>`
                
                fetch(`${apiImages}${imgId}${apiKey}`)
                    .then(response => response.json())
                    .then(json => {
                        const image = document.createElement('img');
                        image.src = json[0].url;
                        item.appendChild(image);
                    });

                content.appendChild(item);
                
            });
        });
}
