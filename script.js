document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Анимация появления элементов при скролле (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Опционально: прекратить наблюдение после появления для оптимизации
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Элемент должен быть виден на 15%
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Плавный скролл для якорных ссылок (дополнительная надежность для старых браузеров)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту sticky-навигации
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Легкий параллакс-эффект для фоновых сфер при движении мыши (только на десктопе)
    if (window.matchMedia("(min-width: 768px)").matches) {
        const sphere1 = document.querySelector('.sphere-1');
        const sphere2 = document.querySelector('.sphere-2');

        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Двигаем сферы в противоположную сторону от мыши для эффекта глубины
            sphere1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            sphere2.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
        });
    }

    // 4. Динамическое изменение прозрачности навигации при скролле
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 16, 20, 0.85)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            nav.style.background = 'rgba(15, 16, 20, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });
});