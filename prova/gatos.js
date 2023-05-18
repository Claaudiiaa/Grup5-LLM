const breedSelect = document.getElementById('selectDiv');
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
const apiKey = '&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx';
const apiImages = 'https://api.thecatapi.com/v1/images/';
const apiContent = 'https://api.thecatapi.com/v1/breeds';

async function getBreeds() {
    fetch(apiContent)
        .then(response => response.json())
        .then(data => {
            const select = document.createElement('select');
            data.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed.id;
                option.textContent = breed.name;
                option.setAttribute('data-img-id', breed.reference_image_id);
                select.appendChild(option);
            });
            breedSelect.appendChild(select);

            select.addEventListener('change', function () {
                const selectedOption = this.options[this.selectedIndex];
                const gatId = selectedOption.value;
                const imgId = selectedOption.getAttribute('data-img-id');
                getBreedInfo(imgId, gatId);
            });
        });
}

async function getBreedInfo(imgId, gatId) {
    fetch(`${apiContent}/${gatId}`)
        .then(response => response.json())
        .then(json => {
            breedInfo.style.display = 'block';
            breedInfo.querySelector('h2').textContent = json.name;
            origin.textContent = json.origin;
            description.textContent = json.description;
            affectionLevel.textContent = json.affection_level;
            adaptability.textContent = json.adaptability;
            childFriendly.textContent = json.child_friendly;
            dogFriendly.textContent = json.dog_friendly;
            energyLevel.textContent = json.energy_level;
            grooming.textContent = json.grooming;
            healthIssues.textContent = json.health_issues;
            intelligence.textContent = json.intelligence;
            sheddingLevel.textContent = json.shedding_level;
            socialNeeds.textContent = json.social_needs;
            strangerFriendly.textContent = json.stranger_friendly;
            vocalisation.textContent = json.vocalisation;
            wikipediaLink.href = json.wikipedia_url;

            // Fetch breed image URL separately using imgId
            fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${gatId}&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx`)
                .then(response => response.json())
                .then(data => {
                    breedImage.src = data[0].url;
                });
        });
}

getBreeds();
