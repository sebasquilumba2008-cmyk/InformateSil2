// ====== VIDEO BACKGROUND LOGIC ====== 
const bgVideo = document.getElementById('bgVideo');

if (bgVideo) {
    bgVideo.play().catch(error => {
        console.log('Autoplay prevented:', error);
    });

    let fadeInDuration = 0.5;
    let fadeOutDuration = 0.5;
    let fadeOutStartTime = 0;

    const updateVideoOpacity = () => {
        const currentTime = bgVideo.currentTime;
        const duration = bgVideo.duration;

        if (currentTime < fadeInDuration) {
            bgVideo.style.opacity = (currentTime / fadeInDuration).toString();
        }

        fadeOutStartTime = duration - fadeOutDuration;
        if (currentTime > fadeOutStartTime) {
            const remainingTime = duration - currentTime;
            bgVideo.style.opacity = (remainingTime / fadeOutDuration).toString();
        }

        requestAnimationFrame(updateVideoOpacity);
    };

    updateVideoOpacity();

    bgVideo.addEventListener('ended', () => {
        bgVideo.style.opacity = '0';
        setTimeout(() => {
            bgVideo.currentTime = 0;
            bgVideo.play();
        }, 100);
    });
}

// ====== NAVEGACION Y SECCIONES ====== 
function mostrar(id) {
    const secciones = document.querySelectorAll('.seccion, .hero-section');
    
    secciones.forEach(seccion => {
        seccion.classList.remove('activa');
    });

    const seccionActual = document.getElementById(id);
    if (seccionActual) {
        seccionActual.classList.add('activa');
        window.scrollTo({
            top: seccionActual.offsetTop - 75,
            behavior: 'smooth'
        });
    }

    actualizarNavLinks(id);
}

function actualizarNavLinks(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('home');
    });
    
    const enlaces = document.querySelectorAll('.nav-link');
    enlaces.forEach(enlace => {
        if (enlace.getAttribute('href') === `#${id}`) {
            enlace.classList.add('home');
        }
    });
}

// ====== CARRUSEL DE IMÁGENES ====== 
let currentImage = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselBtns = document.querySelectorAll('.carousel-btn');

function cambiarImagen(num) {
    if (carouselItems.length === 0) return;
    
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselBtns.forEach(btn => btn.classList.remove('active'));
    
    carouselItems[num].classList.add('active');
    carouselBtns[num].classList.add('active');
    currentImage = num;
}

let carouselInterval;

function startCarouselAutoRotate() {
    carouselInterval = setInterval(() => {
        if (carouselItems.length > 0) {
            currentImage = (currentImage + 1) % carouselItems.length;
            cambiarImagen(currentImage);
        }
    }, 5000);
}

function stopCarouselAutoRotate() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

if (carouselItems.length > 0) {
    cambiarImagen(0);
    startCarouselAutoRotate();
}

document.querySelectorAll('.carousel-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        stopCarouselAutoRotate();
        cambiarImagen(index);
        startCarouselAutoRotate();
    });
});

// ====== SCROLL ANIMATIONS ====== 
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-card, .infra-card, .teacher-card, .course-card, .flip-card, .info-box, .info-card-course, .stat-box, .info-box-infra').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
});

// ====== EVENT LISTENERS ====== 
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

document.querySelectorAll('.cta-button, .hero-cta').forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// ====== DETECTAR CAMBIOS EN VIDEO ====== 
if (bgVideo) {
    bgVideo.addEventListener('play', () => {
        console.log('Video comenzó a reproducirse');
    });

    bgVideo.addEventListener('pause', () => {
        console.log('Video pausado');
    });

    bgVideo.addEventListener('error', () => {
        console.log('Error al cargar el video');
    });
}

// ====== INICIALIZACIÓN ====== 
window.addEventListener('load', () => {
    console.log('Página cargada completamente');
    actualizarNavLinks('inicio');
});

// ====== INFRAESTRUCTURA TABS ====== 
function mostrarInfraTab(tabName) {
    // Ocultar todos los tabs
    const tabs = document.querySelectorAll('.infra-tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    const tabActual = document.getElementById(tabName);
    if (tabActual) {
        tabActual.classList.add('active');
    }

    // Actualizar botones activos
    const buttons = document.querySelectorAll('.infra-tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Activar el botón clickeado
    event.target.closest('.infra-tab-btn').classList.add('active');

    // Scroll suave al contenido
    setTimeout(() => {
        tabActual.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}