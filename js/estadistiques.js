const statisticElement = document.getElementById('contenidorEstadistiques');

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => response.json())
  .then(data => {
    const totalBreeds = data.length;
    statisticElement.textContent = `Cantidad total de razas de gatos: ${totalBreeds}`;
  })
  .catch(error => {
    console.log('Error:', error);
  });