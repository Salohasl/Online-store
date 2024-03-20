import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/
//В переменной хранится каталог
let productAston  = catalogAston;


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

let fullDescrip = document.querySelector('.fullDescrip');
let command = document.querySelector('.command');
let size = document.querySelector('.size');
let colorProduct = document.querySelector('.color-product');
let name = document.querySelector('.name')
let linkText = document.querySelector('.linkText');
function removePageLocalStorage(){

  let savedPage = JSON.parse(localStorage.getItem('page'));

  for(let page of savedPage){
    linkText.textContent = '/' + ' ' + page.gender;

    fullDescrip.textContent = page.description;
    command.textContent = page.command;
    name.textContent = page.gender;
    colorProduct.style.backgroundColor = page.color;

    
    let arr = page.size;
    for(let arrSize of arr){
      let buttonSize = document.createElement('button');  
      buttonSize.classList.add('button-size')
        if(arr == 'undefined'){
          buttonSize.textContent = '-';
        }else{
          buttonSize.textContent = arrSize;
        }
      size.append(buttonSize);

    } 

    for(let product of productAston){
      if(page.id == product.id){
        let img1 = document.createElement('img');
        img1.src = product.src;
        document.getElementById('swiper1').append(img1);
    
        let img2 = document.createElement('img');
        img2.src = product.srcHover;
        document.getElementById('swiper2').append(img2);
    
        let img3 = document.createElement('img');
        img3.src =product.img;
        document.getElementById('swiper3').append(img3);
    
        let img4 = document.createElement('img');
        img4.src = product.img2;
        document.getElementById('swiper4').append(img4);
      }
    }
  }

  

}

removePageLocalStorage();

let buttonSize = document.querySelectorAll('.button-size');
buttonSize.forEach(btn => {
  btn.addEventListener('click', ()=>{
      for(let btnElem of buttonSize){
          if(btnElem != btn){
              btnElem.classList.remove('active');
          }
          btn.classList.add('active');
      }

  })
})