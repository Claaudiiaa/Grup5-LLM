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
      const p = document.createElement('p');
      const select = document.createElement('select');
      p.textContent = "Selecciona una raça:  "
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        option.setAttribute('data-img-id', breed.reference_image_id);
        select.appendChild(option);
      });
      breedSelect.appendChild(p);
      breedSelect.appendChild(select);

      select.addEventListener('change', function() {
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
      breedInfo.style.display = 'inline';
      breedInfo.querySelector('h2').textContent = json.name;
      origin.textContent = json.origin;
      description.textContent = json.description;
      affectionLevel.innerHTML = getStarRating(json.affection_level);
      adaptability.innerHTML = getStarRating(json.adaptability);
      childFriendly.innerHTML = getStarRating(json.child_friendly);
      dogFriendly.innerHTML = getStarRating(json.dog_friendly);
      energyLevel.innerHTML = getStarRating(json.energy_level);
      grooming.innerHTML = getStarRating(json.grooming);
      healthIssues.innerHTML = getStarRating(json.health_issues);
      intelligence.innerHTML = getStarRating(json.intelligence);
      sheddingLevel.innerHTML = getStarRating(json.shedding_level);
      socialNeeds.innerHTML = getStarRating(json.social_needs);
      strangerFriendly.innerHTML = getStarRating(json.stranger_friendly);
      vocalisation.innerHTML = getStarRating(json.vocalisation);
      wikipediaLink.href = json.wikipedia_url;

      // Fetch breed image URL separately using imgId
      fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${gatId}&api_key=live_QQWpmJhqpdymyzFNsookBeZbfMbKtFUW5qZOsoPtoAsWAKmzFComC6WXHxLkg2kx`)
        .then(response => response.json())
        .then(data => {
          breedImage.src = data[0].url;
        });
    });
}

// Función para obtener la calificación en forma de estrellas
// Función para obtener la calificación en forma de estrellas
function getStarRating(rating) {
    const starIcon = "<img class='estrella' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/1200px-Estrella_amarilla.png' alt='Estrella sólida'>";
    const halfStarIcon = "<img class='estrella' src='half-star-image-url' alt='Estrella media'>";
    const emptyStarIcon = "<img class='estrella' src='https://cdn-icons-png.flaticon.com/512/13/13595.png' alt='Estrella vacía'>";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars > 0;
    const emptyStars = 5 - Math.ceil(rating);
    let starsHtml = "";
  
    // Add full stars
    starsHtml += starIcon.repeat(fullStars);
  
    // Add half star
    if (hasHalfStar) {
        starsHtml += halfStarIcon;
    }
  
    // Add empty stars
    starsHtml += emptyStarIcon.repeat(emptyStars);
  
    return starsHtml;
}
getBreeds();
