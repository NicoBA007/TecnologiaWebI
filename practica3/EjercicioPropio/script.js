
const urlJSON = 'https://raw.githubusercontent.com/NicoBA007/api-madagascar/refs/heads/main/madagascar.json';

// Esperamos a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    fetch(urlJSON)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el JSON');
            }
            return response.json();
        })
        .then(data => {
            renderizarDatos(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('titulo-destino').textContent = "Error de carga";
            document.getElementById('descripcion-gral').textContent = "No se pudo leer el archivo JSON. Verifica la ruta o usa Live Server.";
        });
});

function renderizarDatos(data) {
    // 1. Cabecera e Info General
    document.getElementById('titulo-destino').textContent = data.destino;
    document.getElementById('ubicacion').textContent = `${data.ubicacion.region}, ${data.ubicacion.continente}`;
    document.getElementById('descripcion-gral').textContent = data.descripcion_general;
    document.getElementById('moneda').textContent = data.moneda;
    document.getElementById('idiomas').textContent = data.idiomas_oficiales.join(', ');
    document.getElementById('epoca').textContent = data.mejor_epoca;

    // 2. Renderizar Lugares
    const lugaresContainer = document.getElementById('lugares-container');

    // Limpiamos por si acaso
    lugaresContainer.innerHTML = '';

    data.lugares_imperdibles.forEach(lugar => {
        const card = document.createElement('div');
        card.classList.add('card');

        const actividadesHTML = lugar.actividades
            ? `<p><strong>Actividades:</strong> ${lugar.actividades.join(', ')}</p>`
            : '';

        const precioHTML = lugar.precio_entrada
            ? `<p><strong>Entrada:</strong> ${typeof lugar.precio_entrada === 'number' ? lugar.precio_entrada + ' MGA' : lugar.precio_entrada}</p>`
            : '';

        card.innerHTML = `
            <h3>${lugar.nombre}</h3>
            <span class="tag">${lugar.tipo}</span>
            <p>${lugar.descripcion}</p>
            ${actividadesHTML}
            ${precioHTML}
        `;
        lugaresContainer.appendChild(card);
    });

    // 3. Renderizar Gastronomía
    const comidaContainer = document.getElementById('comida-container');
    comidaContainer.innerHTML = '';

    data.gastronomia_tipica.forEach(plato => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>${plato.plato}</strong>: ${plato.descripcion}
            <span class="precio">${plato.precio_estimado_local}</span>
        `;
        comidaContainer.appendChild(item);
    });
}