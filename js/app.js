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

// === FUNCIONES PARA CARRUSELES DE NOVEDADES === //

// Variables globales para los carruseles
let slideIndexes = {};

// Función para cambiar slide
function changeSlide(carouselId, direction) {
    if (!slideIndexes[carouselId]) {
        slideIndexes[carouselId] = 0;
    }
    
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.closest('.carousel-container').querySelectorAll('.indicator');
    
    // Remover clase active del slide actual
    slides[slideIndexes[carouselId]].classList.remove('active');
    indicators[slideIndexes[carouselId]].classList.remove('active');
    
    // Calcular nuevo índice
    slideIndexes[carouselId] += direction;
    
    // Verificar límites
    if (slideIndexes[carouselId] >= slides.length) {
        slideIndexes[carouselId] = 0;
    } else if (slideIndexes[carouselId] < 0) {
        slideIndexes[carouselId] = slides.length - 1;
    }
    
    // Agregar clase active al nuevo slide
    slides[slideIndexes[carouselId]].classList.add('active');
    indicators[slideIndexes[carouselId]].classList.add('active');
    
    // Animar el carrusel
    const offset = -slideIndexes[carouselId] * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Función para ir a un slide específico
function currentSlide(carouselId, slideNumber) {
    if (!slideIndexes[carouselId]) {
        slideIndexes[carouselId] = 0;
    }
    
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.closest('.carousel-container').querySelectorAll('.indicator');
    
    // Remover clase active del slide actual
    slides[slideIndexes[carouselId]].classList.remove('active');
    indicators[slideIndexes[carouselId]].classList.remove('active');
    
    // Establecer nuevo índice
    slideIndexes[carouselId] = slideNumber - 1;
    
    // Agregar clase active al nuevo slide
    slides[slideIndexes[carouselId]].classList.add('active');
    indicators[slideIndexes[carouselId]].classList.add('active');
    
    // Animar el carrusel
    const offset = -slideIndexes[carouselId] * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Inicializar carruseles cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar índices de carruseles
    const carousels = document.querySelectorAll('.carousel-slides');
    carousels.forEach(carousel => {
        slideIndexes[carousel.id] = 0;
    });
    
    // Autoplay para los carruseles (opcional)
    function startAutoplay(carouselId, interval = 5000) {
        return setInterval(() => {
            changeSlide(carouselId, 1);
        }, interval);
    }
    
    // Activar autoplay solo en la página de novedades
    if (window.location.pathname.includes('novedades.html')) {
        let egresadosAutoplay = startAutoplay('egresados-carousel', 6000);
        let becariosAutoplay = startAutoplay('becarios-carousel', 6500);
        
        // Pausar autoplay cuando el usuario interactúa con el carrusel
        const carouselContainers = document.querySelectorAll('.carousel-container');
        carouselContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                clearInterval(egresadosAutoplay);
                clearInterval(becariosAutoplay);
            });
            
            container.addEventListener('mouseleave', () => {
                egresadosAutoplay = startAutoplay('egresados-carousel', 6000);
                becariosAutoplay = startAutoplay('becarios-carousel', 6500);
            });
        });
    }
});

// Soporte para navegación con teclado
document.addEventListener('keydown', function(e) {
    // Solo funciona en la página de novedades
    if (!window.location.pathname.includes('novedades.html')) return;
    
    if (e.key === 'ArrowLeft') {
        changeSlide('egresados-carousel', -1);
        changeSlide('becarios-carousel', -1);
    } else if (e.key === 'ArrowRight') {
        changeSlide('egresados-carousel', 1);
        changeSlide('becarios-carousel', 1);
    }
});