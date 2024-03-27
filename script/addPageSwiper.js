import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/
//В переменной хранится каталог
let productAston  = catalogAston;

var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
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

let basketBtn = document.querySelector('.basket-hover');

function removePageLocalStorage(){

  let savedPage = JSON.parse(localStorage.getItem('page'));

  for(let page of savedPage){
    linkText.textContent = '/' + ' ' + page.gender;

    fullDescrip.textContent = page.description;
    command.textContent = page.command;
    name.textContent = page.gender;
    colorProduct.style.backgroundColor = page.color;

    basketBtn.setAttribute('data-id', page.id); 
    if(page.genderH == 'undefined'){
      page.genderH = 'Унисекс';
      basketBtn.setAttribute('data-gender', page.genderH);
    }else{
      basketBtn.setAttribute('data-gender', page.genderH);
    }
    basketBtn.setAttribute('data-price', page.price);
    basketBtn.setAttribute('data-name', page.name);
    basketBtn.setAttribute('data-description', page.desc);
    basketBtn.setAttribute('data-color', page.color);
    


    let arr = page.size;
    for(let arrSize of arr){
      let buttonSize = document.createElement('button');  
      buttonSize.classList.add('size-button')
      buttonSize.setAttribute('data-id', page.id)
        if(arr == 'undefined'){
          buttonSize.textContent = '-';
          buttonSize.style.backgroundColor = '#FFCF00';
          basketBtn.setAttribute('data-size', '-')
        }else{
          buttonSize.textContent = arrSize;
          basketBtn.setAttribute('data-size', '')
        }
      size.append(buttonSize);

    } 

    for(let product of productAston){
      if(page.id == product.id){

        let divRotate1 = document.createElement('div');
        divRotate1.classList.add('div-img');
        //imgRotate1.src = product.src;
        divRotate1.innerHTML = `
          <img class="delete-img" src="${product.srcHover}" data-atr="1">
          <img class="delete-img remove" src="${product.src}" data-atr="0">
          <img class="delete-img" src="${product.img}" data-atr="2">
          <img class="delete-img" src="${product.img2}" data-atr="3">
        `;
        document.getElementById('rotate1').append(divRotate1);


        let img1 = document.createElement('img');
        img1.src = product.src;
        img1.classList.add('slide-img');
        img1.setAttribute('data-atr', '1');
        document.getElementById('swiper1').append(img1);

        let img2 = document.createElement('img');
        img2.src = product.srcHover;
        img2.classList.add('slide-img');
        img2.setAttribute('data-atr', '2');
        document.getElementById('swiper2').append(img2);
    
        let img3 = document.createElement('img');
        img3.src =product.img;
        img3.classList.add('slide-img');
        img3.setAttribute('data-atr', '3');
        document.getElementById('swiper3').append(img3);
    
        let img4 = document.createElement('img');
        img4.src = product.img2;
        img4.classList.add('slide-img');
        img4.setAttribute('data-atr', '4');
        document.getElementById('swiper4').append(img4); 
      }
    }
  }

  

}

removePageLocalStorage();




function recommen() {
  function getRandomElementsFromArray(array, numberOfRandomElementsToExtract = 1) {
       const elements = [];
   
       function getRandomElement(arr) {
           if (elements.length < numberOfRandomElementsToExtract) {
               const index = Math.floor(Math.random() * arr.length);
               const element = arr.splice(index, 1)[0];
   
               elements.push(element);
   
               return getRandomElement(arr);
           } else {
               return elements;
           }
       }
   
       return getRandomElement([...array]);
  }
   
  // Выбираем 7 случайных блоков для каждого контейнера
  const randomBlocksContainer = getRandomElementsFromArray(productAston, 6);
  const randomBlocksContainer1 = getRandomElementsFromArray(productAston, 6);
 
  // Функция для отображения блоков на странице
  function displayBlocks(blocksContainer, blocksContainer1) {
       const container = document.getElementById('container');
       container.innerHTML = ''; // Очищаем контейнер перед добавлением новых блоков
 
       blocksContainer.forEach(block => {
           const link = document.createElement('a');
           link.setAttribute('href', "/product/product.html");
           link.setAttribute('data-full', block.full);
           link.setAttribute('data-id', block.id);
           link.setAttribute('data-color', block.color);
            link.setAttribute('data-size', block.size);
            link.setAttribute('data-command', block.command);
            link.setAttribute('data-name', block.name);
            link.setAttribute('data-gender', block.gender);
            link.setAttribute('data-price', block.price);
            link.setAttribute('data-desc', block.description);
           link.classList.add('recommen-item')
           link.innerHTML = `
               <img src="${block.src}" alt="${block.name}">
           `;
           container.appendChild(link);

           let gender;
           if(block.gender == undefined){
             gender = 'Унисекс';
           }else{
             gender = block.gender;
           }
    
           const divMin = document.createElement('div');
           divMin.classList.add('recommen-item__text');
           divMin.innerHTML = `
              <p>${block.name} ${gender}</p>
               <p>${block.command}</p>
               <p>${block.price}</p>
           `;
           link.append(divMin);

           link.addEventListener('click', ()=>{
            let  productArray = [];
            let datasetGender;
            if(block.gender == undefined){
              datasetGender = link.dataset.name + ' ' + 'Унисекс';
            }else{
                datasetGender = link.dataset.name + ' ' + link.dataset.gender;
            }

            const productObj = {
                command: link.dataset.command, 
                description: link.dataset.full,
                size:  link.dataset.size.split(','),
                color: link.dataset.color,
                id: link.dataset.id,
                name: link.dataset.name,
                gender: datasetGender, 
                desc: link.dataset.desc,
                price: link.dataset.price,
            }


            productArray.push(productObj);
            console.log(productArray)
            localStorage.setItem('page', JSON.stringify(productArray));

           })


       });
 
       const container1 = document.getElementById('container1');
       container1.innerHTML = ''; // Очищаем контейнер перед добавлением новых блоков
 
       blocksContainer1.forEach(block => {
          const link = document.createElement('a');
          link.setAttribute('href', "/product/product.html");
          link.setAttribute('data-full', block.full);
          link.setAttribute('data-id', block.id);
          link.setAttribute('data-color', block.color);
           link.setAttribute('data-size', block.size);
           link.setAttribute('data-command', block.command);
           link.setAttribute('data-name', block.name);
           link.setAttribute('data-gender', block.gender);
           link.setAttribute('data-price', block.price);
           link.setAttribute('data-desc', block.description);
          link.classList.add('recommen-item')
          link.innerHTML = `
               <img src="${block.src}" alt="${block.name}">
           `;
           container1.appendChild(link);

          let gender;
          if(block.gender == undefined){
            gender = 'Унисекс';
          }else{
            gender = block.gender;
          }

           const divMin = document.createElement('div');
           divMin.classList.add('recommen-item__text');
           divMin.innerHTML = `
               <p>${block.name} ${gender}</p>
               <p>${block.command}</p>
               <p>${block.price}</p>
           `;
           link.append(divMin);

           link.addEventListener('click', ()=>{
            let  productArray = [];
            let datasetGender;
            if(block.gender == undefined){
              datasetGender = link.dataset.name + ' ' + 'Унисекс';
            }else{
                datasetGender = link.dataset.name + ' ' + link.dataset.gender;
            }

            const productObj = {
              command: link.dataset.command, 
              description: link.dataset.full,
              size:  link.dataset.size.split(','),
              color: link.dataset.color,
              id: link.dataset.id,
              name: link.dataset.name,
              gender: datasetGender, 
              desc: link.dataset.desc,
              price: link.dataset.price,
          }

            productArray.push(productObj);
            console.log(productArray)
            localStorage.setItem('page', JSON.stringify(productArray));

           })

       });
  }
 
  // Отображаем выбранные блоки
  displayBlocks(randomBlocksContainer, randomBlocksContainer1);
 }
 
 recommen();
 
function insertingImg(){
  let deleteImg = document.querySelectorAll('.delete-img');
  //let active = document.querySelector('.swiper-slide-active');

  let btnNext = document.querySelector('.swiper-button-next');
  btnNext.addEventListener('click', ()=>{
    let active = document.querySelector('.swiper-slide-active');
 
    for(let elem of deleteImg){
      if(elem.dataset.atr == active.dataset.swiperSlideIndex){
        elem.classList.add('remove');
      }else{
        elem.classList.remove('remove');
      }
    }

  })

  let btnPrev = document.querySelector('.swiper-button-prev');
  btnPrev.addEventListener('click', ()=>{
    let active = document.querySelector('.swiper-slide-active');

    for(let elem of deleteImg){
      if(elem.dataset.atr == active.dataset.swiperSlideIndex){
        elem.classList.add('remove');
      }else{
        elem.classList.remove('remove');
      }
    }

  })
  
}
insertingImg();


