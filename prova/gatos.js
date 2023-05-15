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
/*
function buscar(id, nom) {


    fetch(apiContent)
        .then(response => response.json())
        .then(albums => {

            albums.forEach(album => {
                const fotosUl = document.createElement("ul");
                const item = document.createElement('li');
                item.textContent = `Cat ID: ${cat.id} Cat Name: ${cat.name} Cat Origin: ${cat.origin} Desc: ${cat.description}`;
                content.appendChild(item);

                
                fetch(`${apiImages}${imgId}${apiKey}`)
                    .then(response => response.json())
                    .then(fotos => {
                        fotos.forEach(foto => {
                            const fotosLi = document.createElement("li");
                            fotosLi.innerHTML = `<strong> ${foto.title}</strong><br>
                    <img src="${foto.url}" alt="${foto.title}">`;
                            fotosUl.appendChild(fotosLi);
                        });
                    });

                li.appendChild(fotosUl);
                div.appendChild(li);
            });
        });
}
*/

function buscar(imgId, nom, gatId) {
    fetch(apiContent)
        .then(response => response.json())
        .then(json => {
            const filtered = json.filter(cat => cat.origin == gatId);
            content.innerHTML = '';
            filtered.forEach(cat => {
                const item = document.createElement('div'); // Cambiamos de <li> a <div>
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
            });
        });
}

function buscarImg(imgId) {
    fetch(`${apiImages}${imgId}${apiKey}`)
        .then(response => response.json())
        .then(json => {
            const item = document.createElement('div'); // Cambiamos de <li> a <div>
            const text = document.createElement('p');
            text.textContent = `Cat ID: ${json[0].id} Cat Name: ${json[0].name} Cat Origin: ${json[0].origin} Desc: ${json[0].description}`;
            const image = document.createElement('img');
            image.src = json[0].url;
            item.appendChild(text);
            item.appendChild(image);
            content.appendChild(item);
        });
}