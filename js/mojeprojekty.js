// document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
//     arrow.addEventListener('click', function () {
//       const dropdownContent = this.closest('tr').nextElementSibling;
//       if (dropdownContent.style.display === "table-row") {
//         dropdownContent.style.display = "none";
//         this.name = "chevron-down-outline"; // Změnit ikonu zpět na šipku dolů
//       } else {
//         dropdownContent.style.display = "table-row";
//         this.name = "chevron-up-outline"; // Změnit ikonu na šipku nahoru
//       }
//     });
//   });
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