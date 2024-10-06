/*show menu */
const showMenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId),
          nav= document.getElementById(navId)

    toggle.addEventListener('click', ()=>{
        //add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')
    })
}
showMenu('nav-toggle', 'nav-menu');
//zobrazeni veskereho skryteho textu

// Vybereme všechny odkazy s třídou .dropdown-link
const dropdownLinks = document.querySelectorAll('.dropdown-link');

// Vybereme konkrétní <h2> element, kde chceme měnit text
const h2Element = document.querySelector('.headerName');

// Přidáme událost click pro každý odkaz
dropdownLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Pokusíme se najít <span> uvnitř odkazu
        const spanElement = this.querySelector('span');
        
        // Zkontrolujeme, zda existuje <span>, pokud ne, vezmeme text z odkazu
        const newText = spanElement ? spanElement.textContent : this.textContent.trim();
        
        // Změníme text v h2 s třídou .headerName (ignorujeme <label> a ikonu)
        h2Element.childNodes[2].nodeValue = " " + newText;
        
        // Necháme prohlížeč normálně přesměrovat na URL uvedenou v href odkazu
    });
});

//Klikaci buton pro zobrazení vse co je skryto a zpet
// Vybereme všechny tabulky a tlačítka
const toggleButtons = document.querySelectorAll('.toggleTasksButton');
const taskTables = document.querySelectorAll('.taskTable');

// Přidáme událost click na každé tlačítko
toggleButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        // Najdeme odpovídající tabulku (index tlačítka odpovídá indexu tabulky)
        const taskTableBody = taskTables[index].querySelector('tbody');
        const hiddenRows = taskTableBody.querySelectorAll('tr:nth-child(n+10)');

        // Zkontrolujeme, zda jsou aktuálně skryté nebo zobrazené
        if (hiddenRows[0].style.display === 'none' || hiddenRows[0].style.display === '') {
            // Zobrazíme všechny řádky
            hiddenRows.forEach(row => {
                row.style.display = 'table-row';
            });
            
            // Změníme text tlačítka na "Skrýt vše"
            button.innerHTML = 'Skrýt vše <span class="las la-arrow-up"></span>';
        } else {
            // Skryjeme řádky od šestého řádku
            hiddenRows.forEach(row => {
                row.style.display = 'none';
            });
            
            // Změníme text tlačítka zpět na "Zobrazit vše"
            button.innerHTML = 'Zobrazit vše <span class="las la-arrow-right"></span>';
        }
    });
});
/*zobrazeni kolegove a kontakty*/
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function () {
            // Najdeme rodičovský prvek tlačítka, který obsahuje seznam kolegů
            const customerList = this.closest('.card').querySelector('.customer-list');

            if (customerList) {
                customerList.classList.toggle('show-all');

                // Změna textu tlačítka po kliknutí
                if (this.textContent.includes('Zobrazit vše')) {
                    this.innerHTML = 'Skrýt vše <span class="las la-arrow-right"></span>';
                } else {
                    this.innerHTML = 'Zobrazit vše <span class="las la-arrow-right"></span>';
                }
            }
        });
    });
});