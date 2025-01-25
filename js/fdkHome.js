/* Show menu */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/* Funkce pro načtení a aktualizaci počtů týmů */
function aktualizovatPocetProjektu(tým = null) {
    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];
    const teamCounts = {
        "Front-end": 0,
        "Back-end": 0,
        "SQL": 0,
        "Testers": 0
    };

    projekty.forEach(projekt => {
        if (teamCounts.hasOwnProperty(projekt.tym)) {
            teamCounts[projekt.tym]++;
        }
    });

    if (tým) {
        const card = Array.from(document.querySelectorAll('.card-single')).find(card =>
            card.querySelector('span').textContent.trim() === tým
        );

        if (card) {
            card.querySelector('h1').textContent = teamCounts[tým] || 0;
            console.log(`Aktualizován počet projektů pro tým ${tým}:`, teamCounts[tým]);
        } else {
            console.warn(`Karta pro tým ${tým} nebyla nalezena.`);
        }
    } else {
        Object.entries(teamCounts).forEach(([team, count]) => {
            const card = Array.from(document.querySelectorAll('.card-single')).find(card =>
                card.querySelector('span').textContent.trim() === team
            );

            if (card) {
                card.querySelector('h1').textContent = count;
            }
        });
        console.log("Aktualizovány všechny týmy:", teamCounts);
    }
}

/* Načtení projektů do tabulky */
function zobrazitProjektyVTabulce() {
    const taskTableBody = document.getElementById('taskTableBodyA');
    if (!taskTableBody) {
        console.warn("Tabulka s ID 'taskTableBodyA' nebyla nalezena.");
        return;
    }

    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];
    taskTableBody.innerHTML = '';

    if (projekty.length === 0) {
        taskTableBody.innerHTML = '<tr><td colspan="4">Žádné projekty nebyly nalezeny.</td></tr>';
        return;
    }

    projekty.forEach(projekt => {
        const tr = document.createElement('tr');
        let statusClass;
        switch (projekt.stav) {
            case 'Probíhá': statusClass = 'orange'; break;
            case 'Uzavřeno': statusClass = 'green'; break;
            case 'Odloženo': statusClass = 'purple'; break;
            case 'Nezahájeno': statusClass = 'pink'; break;
        }

        tr.innerHTML = `
            <td>${projekt.nazev}</td>
            <td>${projekt.tym}</td>
            <td>${projekt.prirazeni}</td>
            <td><span class="status ${statusClass}"></span> ${projekt.stav}</td>
        `;
        taskTableBody.appendChild(tr);
    });
}

/* Funkce pro uložení projektu */
function ulozitProjektDoFdkHome(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.stav === "Probíha") {
        data.stav = "Probíhá";
    }

    const novyProjekt = {
        ...data,
        id: Date.now(),
        datum_vytvoreni: new Date().toISOString(),
    };

    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];
    projekty.push(novyProjekt);
    localStorage.setItem('projektA_projekty', JSON.stringify(projekty));

    console.log("Nový projekt přidán:", novyProjekt);

    aktualizovatPocetProjektu(data.tym);
    alert('Projekt byl úspěšně uložen!');
    window.location.href = 'fdkHome.html';
}

/* Načtení při spuštění stránky */
document.addEventListener('DOMContentLoaded', () => {
    zobrazitProjektyVTabulce();
    aktualizovatPocetProjektu();

    // Přidání funkce pro zobrazení/skrytí všech projektů
    const toggleButtons = document.querySelectorAll('.toggleTasksButton');
    const taskTables = document.querySelectorAll('.taskTable');

    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const taskTableBody = taskTables[index].querySelector('tbody');
            const rows = taskTableBody.querySelectorAll('tr');
            const hiddenRows = taskTableBody.querySelectorAll('tr:nth-child(n+10)');

            if (hiddenRows.length > 0 && (hiddenRows[0].style.display === 'none' || hiddenRows[0].style.display === '')) {
                hiddenRows.forEach(row => {
                    row.style.display = 'table-row';
                });
                button.innerHTML = `Skrýt vše <span class="las la-arrow-up"></span>`;
            } else {
                hiddenRows.forEach(row => {
                    row.style.display = 'none';
                });
                button.innerHTML = `Zobrazit vše (${hiddenRows.length}) <span class="las la-arrow-right"></span>`;
            }
        });

        // Nastavíme výchozí text tlačítka s počtem skrytých řádků
        const taskTableBody = taskTables[index].querySelector('tbody');
        const hiddenRows = taskTableBody.querySelectorAll('tr:nth-child(n+10)');
        if (hiddenRows.length > 0) {
            button.innerHTML = `Zobrazit vše (${hiddenRows.length}) <span class="las la-arrow-right"></span>`;
        }
    });
});

