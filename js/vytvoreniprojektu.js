const dropMenu = document.querySelectorAll('.drop_menu');
//projít ve smyčce všechny prvky drop_menu
dropMenu.forEach(drop_menu =>{
    //získat vnitřní prvky z každého drop_menu
    const select = drop_menu.querySelector('.select');
    const caret = drop_menu.querySelector('.caret');
    const dropdownName = drop_menu.querySelector('.dropdown-name');
    const options = drop_menu.querySelectorAll('.dropdown-name li');
    const selected = drop_menu.querySelector('.selected');

    select.addEventListener('click', () =>{
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        dropdownName.classList.toggle('menu-open');
    });
    options.forEach(option =>{
        option.addEventListener('click', () =>{
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            dropdownName.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('akce');
            });
            option.classList.add('akce');
        });
    });
});

// odesilani formulare
function ulozitProjekt(event) {
    event.preventDefault(); // Zabrání odeslání formuláře a reloadu stránky

    // Načtení dat z formuláře
    const form = event.target;
    const formData = new FormData(form);

    // Převedení dat na objekt
    const data = Object.fromEntries(formData.entries());

    // Načtení existujících projektů z localStorage
    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];

    // Přidání unikátního ID a časové značky
    const novyProjekt = {
        ...data,
        id: Date.now(), // Vygeneruje unikátní ID na základě času
        datum_vytvoreni: new Date().toISOString() // Přidá časovou značku
    };

    // Přidání nového projektu do pole
    projekty.push(novyProjekt);

    // Uložení aktualizovaného seznamu projektů do localStorage
    localStorage.setItem('projektA_projekty', JSON.stringify(projekty));

    // Zobrazení potvrzení o úspěšném uložení
    alert('Projekt byl úspěšně uložen!');

    // Přesměrování na stránku s projekty
    window.location.href = 'mojeProjekty.html';
}
// Funkce pro uložení projektu do localStorage
function ulozitProjekt(event) {
    event.preventDefault(); // Zabránění reloadu stránky po odeslání formuláře

    // Načtení dat z formuláře
    const form = event.target;
    const formData = new FormData(form);

    // Převedení dat na objekt
    const data = Object.fromEntries(formData.entries());
    //  Oprava stavu projektu, pokud je nesprávný
    if (data.stav === "Probíha") {
        data.stav = "Probíhá";
    }

    // Přiřazení správné CSS třídy podle stavu projektu
    let statusClass;
    switch (data.stav) {
        case "Probíhá":
            statusClass = "purple";
            break;
        case "Uzavřeno":
            statusClass = "green";
            break;
        case "Odloženo":
            statusClass = "orange";
            break;
        case "Nezahájeno":
            statusClass = "pink";
            break;
    }

    // Přidání unikátního ID, časové značky a CSS třídy pro stav
    const novyProjekt = {
        ...data,
        id: Date.now(),
        datum_vytvoreni: new Date().toISOString(),
        statusClass: statusClass
    };

    // Načtení existujících projektů z localStorage
    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];

    // Přidání nového projektu do pole
    projekty.push(novyProjekt);

    // Uložení aktualizovaného seznamu projektů do localStorage
    localStorage.setItem('projektA_projekty', JSON.stringify(projekty));

    // Zobrazení potvrzení o úspěšném uložení
    alert('Projekt byl úspěšně uložen!');

    // Přesměrování na hlavní stránku
    window.location.href = 'fdkHome.html';
}



