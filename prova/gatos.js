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

function buscar(imgId, nom, gatId) {
    fetch(`${apiImages}breed_id=${gatId}${apiKey}`)
        .then(response => response.json())
        .then(json => {
            const filtered = json.filter(cat => cat.catId == gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                const item = document.createElement('li');
                item.textContent = `Cat ID: ${cat.breeds[0].id} Cat Name: ${cat.name} Cat Origin: ${cat.origin} Desc: ${cat.description}`;
                content.appendChild(item);
                buscarImg(cat.reference_image_id)
            });
        });
}

function buscarImg(imgId) {
    fetch(`${apiImages}${imgId}${apiKey}`)
        .then(response => response.json())
        .then(json => {
            const item = document.createElement('img');
            item.src = json[0].url;
            content.appendChild(item);
        });
}