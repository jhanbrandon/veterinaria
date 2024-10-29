// public/js/main.js

// Obtener y mostrar todos los animales con sus vacunas
async function obtenerAnimales() {
    try {
        const response = await fetch('/api/animales');
        const animales = await response.json();
        const animalesList = document.getElementById('animalesList');
        animalesList.innerHTML = '';

        animales.forEach(animal => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${animal.nombre}</strong> (${animal.especie}, ${animal.edad} años) - ID: ${animal.id}`;
            animalesList.appendChild(li);

            // Obtener vacunas para cada animal
            fetch(`/api/vacunas?animal_id=${animal.id}`)
                .then(response => response.json())
                .then(vacunas => {
                    const ulVacunas = document.createElement('ul');
                    vacunas.forEach(vacuna => {
                        const liVacuna = document.createElement('li');
                        liVacuna.innerHTML = `${vacuna.nombre} - Fecha: ${vacuna.fecha}`;
                        ulVacunas.appendChild(liVacuna);
                    });
                    li.appendChild(ulVacunas);
                });
        });
    } catch (error) {
        console.error('Error al obtener los animales:', error);
    }
}

// Buscar animal por nombre o ID
async function buscarAnimal() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') return alert('Ingrese un nombre o ID para buscar');
    
    try {
        const response = await fetch(`/api/animales/${searchInput}`);
        const animal = await response.json();
        if (animal.error) return alert(animal.error);

        const animalesList = document.getElementById('animalesList');
        animalesList.innerHTML = `<li><strong>${animal.nombre}</strong> (${animal.especie}, ${animal.edad} años) - ID: ${animal.id}</li>`;
    } catch (error) {
        console.error('Error al buscar el animal:', error);
    }
}

// Agregar un nuevo animal
async function agregarAnimal() {
    const nombre = document.getElementById('nombreAnimal').value;
    const especie = document.getElementById('especieAnimal').value;
    const edad = document.getElementById('edadAnimal').value;

    try {
        await fetch('/api/animales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especie, edad })
        });
        alert('Animal agregado exitosamente');
        obtenerAnimales(); // Actualizar la lista de animales
    } catch (error) {
        console.error('Error al agregar animal:', error);
    }
}

// Agregar una nueva vacuna
async function agregarVacuna() {
    const nombre = document.getElementById('nombreVacuna').value;
    const fecha = document.getElementById('fechaVacuna').value;
    const animal_id = document.getElementById('animalIdVacuna').value;

    try {
        await fetch('/api/vacunas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, fecha, animal_id })
        });
        alert('Vacuna agregada exitosamente');
        obtenerAnimales(); // Actualizar la lista de animales con sus vacunas
    } catch (error) {
        console.error('Error al agregar vacuna:', error);
    }
}

// Inicializar
obtenerAnimales();
