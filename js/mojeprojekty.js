
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
(function () {
    window.onload = function () {
        const projektyContainer = document.getElementById('projektA-container');

        if (!projektyContainer) {
            console.error('Element s id "projektA-container" nebyl nalezen.');
            return;
        }

        zobrazProjektyA();

        // Přidání události na tlačítko toggleTasksButtonA
        const toggleButton = document.querySelector('.toggleTasksButtonA');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleProjectsA);
        }
    };

    function zobrazProjektyA() {
        const projektyContainer = document.getElementById('projektA-container');
        const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];

        if (projekty.length === 0) {
            projektyContainer.innerHTML = '<p>Žádné projekty nebyly nalezeny.</p>';
            return;
        }

        projektyContainer.innerHTML = ''; // Vyčištění obsahu

        projekty.forEach((projekt, index) => {
            const projektElement = document.createElement('div');
            projektElement.classList.add('projektA');
            projektElement.innerHTML = `
                <h3>${projekt.nazev}</h3>
                <p><strong>Priorita:</strong> ${projekt.priorita}</p>
                <p id="popisA-${index}"><strong>Popis:</strong> ${projekt.popis.split(' ').slice(0, 10).join(' ')}${projekt.popis.split(' ').length > 10 ? '...' : ''}</p>
                ${projekt.popis.split(' ').length > 10 ? `<button class="btn-toggleA" onclick="togglePopisA(${index}, '${projekt.popis.replace(/'/g, "&#39;")}')">Zobrazit více</button>` : ''}
                <p><strong>Projektový manažer:</strong> ${projekt.projektovy_manazer}</p>
                <p><strong>Přiřazení:</strong> ${projekt.prirazeni}</p>
                <p><strong>Tým:</strong> ${projekt.tym}</p>
                <p><strong>Tým schvalovatelů:</strong> ${projekt.tym_schvalovatel}</p>
                <p><strong>Plánovaný datum dokončení:</strong> ${formatDatum(projekt.planovany_datum)}</p>
                <p><strong>Stav průběhu:</strong> ${projekt.stav}</p>
                <p><strong>Datum vytvoření:</strong> ${new Date(projekt.datum_vytvoreni).toLocaleDateString()}</p>
                <button class="btn-dele-formA" onclick="odstranitProjektA(${index})">Vymazat</button>
            `;
            projektElement.style.display = index === 0 ? 'block' : 'none';
            projektyContainer.appendChild(projektElement);
        });

        updateToggleButtonA(projekty.length - 1);
    }

    window.togglePopisA = function (index, celyPopis) {
        const popisElement = document.getElementById(`popisA-${index}`);
        const tlacitko = popisElement.nextElementSibling;

        if (tlacitko.textContent === 'Zobrazit více') {
            popisElement.innerHTML = `<strong>Popis:</strong> ${celyPopis}`;
            tlacitko.textContent = 'Zobrazit méně';
        } else {
            const kratkyPopis = celyPopis.split(' ').slice(0, 10).join(' ');
            popisElement.innerHTML = `<strong>Popis:</strong> ${kratkyPopis}...`;
            tlacitko.textContent = 'Zobrazit více';
        }
    };

    function toggleProjectsA() {
        const projektyContainer = document.getElementById('projektA-container');
        const projekty = projektyContainer.getElementsByClassName('projektA');
        let hiddenCount = 0;

        // Přepnutí viditelnosti projektů
        for (let i = 1; i < projekty.length; i++) {
            if (projekty[i].style.display === 'none') {
                projekty[i].style.display = 'block';
            } else {
                projekty[i].style.display = 'none';
                hiddenCount++;
            }
        }

        updateToggleButtonA(hiddenCount);
    }

    function updateToggleButtonA(hiddenCount) {
        const button = document.querySelector('.toggleTasksButtonA');
        if (button) {
            button.innerHTML = hiddenCount > 0 ? `Zobrazit vše ( ${hiddenCount} )` : 'Skrýt vše';
        }
    }

    window.odstranitProjektA = function (index) {
        const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];
        projekty.splice(index, 1); // Odstranění projektu podle indexu
        localStorage.setItem('projektA_projekty', JSON.stringify(projekty));
        zobrazProjektyA(); // Znovu vykreslit seznam
    };

    // 🖋 Funkce pro formátování datumu (YYYY-MM-DD -> DD.MM.RRRR)
    function formatDatum(datum) {
        const [year, month, day] = datum.split('-');
        return `${day}.${month}.${year}`;
    }
})();







