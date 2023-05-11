const content = document.getElementById('input');


fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
            const select = document.createElement('select');
            let nom;
            data.forEach(user => {
                  const option = document.createElement('option');
                  option.value = user.id;
                  option.textContent = user.name;
                  select.appendChild(option);
                  nom = user.name;
            });
            div.appendChild(select);

            select.addEventListener('change', function () {
                  const userId = this.value;
                  buscar(userId, nom);
                  const photos = document.getElementById('photos');
                  generarAlbum(userId, nom);
            });
      });