document.getElementById('generate').addEventListener('click', () => {
    const count = document.getElementById('count').value;
    const container = document.getElementById('accordionInputs');

    container.innerHTML = ''; 
    container.style.display = 'block';
    document.getElementById('status').textContent = '';

    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <h4>Item ${i}</h4>
            <label>Heading:</label><br>
            <input type="text" id="title${i}" placeholder="Heading ${i}"><br>
            <label>Content:</label><br>
            <textarea id="content${i}" rows="3" placeholder="Content ${i}"></textarea><br><br>
        `;
    }
});

document.getElementById('accordionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const count = document.getElementById('count').value;
    let accordion = [];

    for (let i = 1; i <= count; i++) {
        accordion.push({
            title: document.getElementById(`title${i}`).value,
            content: document.getElementById(`content${i}`).value
        });
    }

    const data = { accordion };

    try {
        const response = await fetch('saveAccordion.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.text();
        document.getElementById('status').textContent = result;

        document.getElementById('accordionInputs').style.display = 'none';
    } catch (error) {
        document.getElementById('status').textContent = 'Error occurred while saving!';
    }
});
