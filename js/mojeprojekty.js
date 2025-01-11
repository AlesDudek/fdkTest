
// Vyhledání všech řádků s šipkami
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Přidání event listeneru pro každý řádek
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        // Najdi sousední řádek (dropdown-content)
        const contentRow = item.nextElementSibling;

        // Zkontroluj, zda je již viditelný, a změň styl display
        if (contentRow.style.display === 'table-row') {
            contentRow.style.display = 'none';
        } else {
            contentRow.style.display = 'table-row';
        }

        // Přidat/odebrat třídu pro otočení šipky
        item.classList.toggle('open');
    });
});

// formular ulozeni dat
window.onload = function () {
    const projektyContainer = document.getElementById('projekty-container');

    if (!projektyContainer) {
        console.error('Element s id "projekty-container" nebyl nalezen.');
        return;
    }

    zobrazProjekty();
};

function zobrazProjekty() {
    const projektyContainer = document.getElementById('projekty-container');
    const projekty = JSON.parse(localStorage.getItem('projekty')) || [];

    if (projekty.length === 0) {
        projektyContainer.innerHTML = '<p>Žádné projekty nebyly nalezeny.</p>';
        return;
    }

    projektyContainer.innerHTML = ''; // Vyčištění obsahu

    projekty.forEach((projekt, index) => {
        const projektElement = document.createElement('div');
        projektElement.classList.add('projekt');
        projektElement.innerHTML = `
            <h3>${projekt.nazev}</h3>
            <p><strong>Priorita:</strong> ${projekt.priorita}</p>
            <p id="popis-${index}"><strong>Popis:</strong> ${projekt.popis.split(' ').slice(0, 10).join(' ')}${projekt.popis.split(' ').length > 10 ? '...' : ''}</p>
            ${projekt.popis.split(' ').length > 10 ? `<button class="btn-toggle" onclick="togglePopis(${index}, '${projekt.popis.replace(/'/g, "&#39;")}')">Zobrazit více</button>` : ''}
            <p><strong>Projektový manažer:</strong> ${projekt.projektovy_manazer}</p>
            <p><strong>Přiřazení:</strong> ${projekt.prirazeni}</p>
            <p><strong>Tým:</strong> ${projekt.tym}</p>
            <p><strong>Tým schvalovatelů:</strong> ${projekt.tym_schvalovatel}</p>
            <p><strong>Plánovaný datum dokončení:</strong> ${projekt.planovany_datum}</p>
            <p><strong>Stav průběhu:</strong> ${projekt.stav}</p>
            <button class="btn-dele-form" onclick="odstranitProjekt(${index})">Vymazat</button>
        `;
        projektElement.style.display = index === 0 ? 'block' : 'none';
        projektyContainer.appendChild(projektElement);
    });

    updateToggleButton(projekty.length - 1);
}

function togglePopis(index, celyPopis) {
    const popisElement = document.getElementById(`popis-${index}`);
    const tlacitko = popisElement.nextElementSibling;

    if (tlacitko.textContent === 'Zobrazit více') {
        popisElement.innerHTML = `<strong>Popis:</strong> ${celyPopis}`;
        tlacitko.textContent = 'Zobrazit méně';
    } else {
        const kratkyPopis = celyPopis.split(' ').slice(0, 10).join(' ');
        popisElement.innerHTML = `<strong>Popis:</strong> ${kratkyPopis}...`;
        tlacitko.textContent = 'Zobrazit více';
    }
}

function toggleProjects() {
    const projektyContainer = document.getElementById('projekty-container');
    const projekty = projektyContainer.getElementsByClassName('projekt');
    let hiddenCount = 0;

    for (let i = 1; i < projekty.length; i++) {
        if (projekty[i].style.display === 'none') {
            projekty[i].style.display = 'block';
        } else {
            projekty[i].style.display = 'none';
            hiddenCount++;
        }
    }

    updateToggleButton(hiddenCount);
}

function updateToggleButton(hiddenCount) {
    const button = document.querySelector('.toggleTasksButton');
    button.innerHTML = hiddenCount > 0 ? `Zobrazit vše (${hiddenCount} skryto)` : 'Skrýt vše';
}

function odstranitProjekt(index) {
    const projekty = JSON.parse(localStorage.getItem('projekty')) || [];
    projekty.splice(index, 1); // Odstranění projektu podle indexu
    localStorage.setItem('projekty', JSON.stringify(projekty)); // Aktualizace localStorage
    zobrazProjekty(); // Znovu vykreslit seznam
}

const toggleButton = document.querySelector('.toggleTasksButton');
if (toggleButton) {
    toggleButton.addEventListener('click', toggleProjects);
}




