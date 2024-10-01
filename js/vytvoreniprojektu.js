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