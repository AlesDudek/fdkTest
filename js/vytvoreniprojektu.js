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
// Funkce pro aktualizaci počtu projektů podle týmu
// Funkce pro aktualizaci počtu projektů podle týmu
function aktualizovatPocetProjektuPodleTymu(tym) {
    console.log("Aktualizace pro tým:", tym); // Sledujeme tým, který aktualizujeme

    const card = Array.from(document.querySelectorAll('.card-single')).find(card =>
        card.querySelector('span').textContent.trim() === tym
    );

    if (card) {
        const countElement = card.querySelector('h1');
        const currentCount = parseInt(countElement.textContent, 10) || 0;
        countElement.textContent = currentCount + 1;

        console.log(`Nový počet projektů pro tým ${tym}:`, currentCount + 1); // Kontrola aktualizovaného počtu
    } else {
        console.warn(`Karta pro tým ${tym} nebyla nalezena.`);
    }
}


// Funkce pro načtení a aktualizaci všech týmů při načtení stránky
function aktualizovatVsechnyPocetProjektu() {
    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];

    const frontEndCount = projekty.filter(projekt => projekt.tym === 'Front-end').length;
    const backEndCount = projekty.filter(projekt => projekt.tym === 'Back-end').length;
    const sqlCount = projekty.filter(projekt => projekt.tym === 'SQL').length;
    const testersCount = projekty.filter(projekt => projekt.tym === 'Testers').length;

    // Aktualizace hodnot na stránce
    document.querySelector('.card-single:nth-child(1) h1').innerText = frontEndCount;
    document.querySelector('.card-single:nth-child(2) h1').innerText = backEndCount;
    document.querySelector('.card-single:nth-child(3) h1').innerText = sqlCount;
    document.querySelector('.card-single:nth-child(4) h1').innerText = testersCount;
}

// Funkce pro uložení projektu do localStorage
function ulozitProjektDoFdkHome(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Odeslaný tým:", data.tym); // Zde logujeme odeslaný tým

    // Oprava chybného stavu "Probíha" na "Probíhá"
    if (data.stav === "Probíha") {
        data.stav = "Probíhá";
    }

    const novyProjekt = {
        ...data,
        id: Date.now(),
        datum_vytvoreni: new Date().toISOString()
    };

    const projekty = JSON.parse(localStorage.getItem('projektA_projekty')) || [];
    projekty.push(novyProjekt);
    localStorage.setItem('projektA_projekty', JSON.stringify(projekty));
    console.log("LocalStorage data:", JSON.parse(localStorage.getItem('projektA_projekty'))); // Kontrola uložených dat

    // Aktualizace konkrétního týmu
    aktualizovatPocetProjektuPodleTymu(data.tym);

    alert('Projekt byl úspěšně uložen!');
    window.location.href = 'fdkHome.html';
}

// Při načtení stránky aktualizovat všechny počty projektů
window.onload = function () {
    aktualizovatVsechnyPocetProjektu();
};








