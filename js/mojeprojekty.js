/*
document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
  arrow.addEventListener('click', function () {
      const dropdownContent = this.closest('tr').nextElementSibling;

      // Zkontrolujeme, zda následující prvek existuje a má třídu "dropdown-content"
      if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
          if (dropdownContent.style.display === "table-row") {
              dropdownContent.style.display = "none";
              
          } else {
              dropdownContent.style.display = "table-row";
          }
      }
  });
});
*/
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
