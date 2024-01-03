let barra  = document.querySelector('#barra-menu');
let menu = document.querySelector('header');

barra.addEventListener('click', function(){
    menu.classList.toggle('active');
}   );

