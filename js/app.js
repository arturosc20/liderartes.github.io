// App.js - JavaScript para Liderartes

// Función para el menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    // Función para alternar el menú
    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Función para abrir el menú
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.classList.add('menu-open');
    }
    
    // Función para cerrar el menú
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Cerrar menú al hacer click en el overlay (fuera del contenido del menú)
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu) {
            closeMenu();
        }
    });
    
    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al redimensionar la ventana (para evitar problemas al cambiar orientación)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Prevenir scroll del body cuando el menú está abierto
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
});