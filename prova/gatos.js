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