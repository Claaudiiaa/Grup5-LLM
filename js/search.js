const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');

searchButton.addEventListener('click', performSearch);

function performSearch() {
  const searchTerm = searchInput.value;

  if (searchTerm === '') {
    resultsContainer.textContent = 'Ingrese un término de búsqueda válido.';
    return;
  }

  fetch(`https://api.thecatapi.com/v1/breeds/search?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function displayResults(data) {
  resultsContainer.innerHTML = '';

  if (data.length === 0) {
    resultsContainer.textContent = 'No se encontraron resultados.';
    return;
  }

  data.forEach(breed => {
    const breedElement = document.createElement('div');
    breedElement.textContent = breed.name;
    resultsContainer.appendChild(breedElement);
  });
}