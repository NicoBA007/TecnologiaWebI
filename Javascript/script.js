document.addEventListener("DOMContentLoaded", function () {
    // 1. FORZAR EL INICIO DESDE ARRIBA (RESET SCROLL)
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. LIMPIAR EL HASH DE LA URL AL CARGAR LA PÁGINA
    // Esto elimina el #actividades si existe en la URL
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }

    // 3. SCROLL SUAVE Y ELIMINAR HASH DESPUÉS DEL SCROLL
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Hacer scroll suave
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Esperar a que termine el scroll y luego limpiar la URL
                setTimeout(() => {
                    history.replaceState(null, null, window.location.pathname);
                }, 800); // 800ms para dar tiempo al scroll suave
            }
        });
    });
});