/* Для всплывающего окна */ 
let menuBtn = document.querySelector('.menuBtn');
let menu = document.querySelector('nav');
let link = document.querySelector('.link');
menuBtn.addEventListener('click', () =>{
menuBtn.classList.toggle('active');
menu.classList.toggle('popUp');
link.classList.remove('active');
});


function popupText(){
    link.classList.add('active');
}
