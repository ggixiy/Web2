let isInitialLoad = true;

async function loadAccordion() {
    try {
    const response = await fetch('loadAccordion.php');
    const data = await response.json();
    const container = document.getElementById('accordionContainer');

        let activeIndex = -1; 
        
        if (!isInitialLoad) {
            container.querySelectorAll('.accordion-content').forEach((content, index) => {
                if (content.classList.contains('active')) {
                    activeIndex = index;
                }
            });
        }

    container.innerHTML = '';

    data.accordion.forEach((item, index) => {
    const accItem = document.createElement('div');
    accItem.className = 'accordion-item';

    const header = document.createElement('button');
    header.className = 'accordion-header';
    header.textContent = item.title;

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.textContent = item.content;

            if (isInitialLoad && index === 0) {
                // Випадок 1: Перше завантаження сторінки - відкриваємо перший елемент
                content.classList.add('active');
            } else if (!isInitialLoad && index === activeIndex) {
                // Випадок 2: Фонове оновлення - відновлюємо той елемент, що був відкритий
                content.classList.add('active');
            }

            header.addEventListener('click', () => {
                const allContents = container.querySelectorAll('.accordion-content');
                allContents.forEach(c => {
                    if (c !== content) c.classList.remove('active'); 
                });
                content.classList.toggle('active');
            });

            accItem.appendChild(header);
            accItem.appendChild(content);
            container.appendChild(accItem);
        });

        isInitialLoad = false;

    } catch (error) {
        console.error('Error:', error);
    }
}

loadAccordion();

setInterval(loadAccordion, 10000);