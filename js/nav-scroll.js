document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const header = document.querySelector('.glass-header');

    // Функция для определения активного раздела
    function setActiveSection() {
        const scrollPosition = window.scrollY + header.offsetHeight;

        // Сначала уберем активный класс со всех ссылок
        navLinks.forEach(link => link.classList.remove('active'));

        // Если мы в самом верху страницы, не активируем никакую ссылку
        if (window.scrollY < 100) {
            return;
        }

        // Проверяем каждую секцию
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 20; // Небольшой отступ для более раннего срабатывания
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Добавляем эффект прокрутки для хедера
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Плавный скролл при клике
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const targetPosition = targetSection.offsetTop - header.offsetHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Обработчики событий
    window.addEventListener('scroll', setActiveSection);
    window.addEventListener('resize', setActiveSection);
    setActiveSection(); // Инициализация при загрузке
}); 