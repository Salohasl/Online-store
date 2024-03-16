import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

const product = document.querySelector('.product');

//Для фильтрации каталога
const applyBtn = document.querySelector('.applyBtn');
//Выбор Категории
const radio = document.querySelectorAll('.cloth');


//Сброс всех настроек в фильтре
const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', ()=>{
  location.reload();
})

//Функция выгрузки товара
function productUnloading(){
    for(let key of productAston){

      let productCatal = document.createElement('div');
      productCatal.classList.add('product-catal');
      productCatal.setAttribute('data-category', key.category);
      productCatal.setAttribute('data-pilot', key.pilot);
      productCatal.setAttribute('data-size', key.size);
      productCatal.setAttribute('data-command', key.command);
      product.append(productCatal);

    

      //Создание массива для категорий одежды, категорий пилотов
      let res = [];
      res.push(productCatal.dataset.category)
      res.push(productCatal.dataset.pilot);
      res.push(productCatal.dataset.command);
      res.push(productCatal.dataset.size);
      res = res.filter(item => item !== 'undefined');
      
      //Настройка фильтрации одежды по radio
        radio.forEach(elem => {
          elem.addEventListener('click', ()=>{     
            applyBtn.addEventListener('click', ()=>{
              //скрытие пагинации res.includes(elem.value)
              document.getElementById('pag-cont').style.display = 'none';
              if(res.includes(elem.value)){
                productCatal.style.display = 'block';
              }else{
                productCatal.style.display = 'none';
              }    
            })
          })
        })



      function creatingBlocks(){

        let img = document.createElement('img');
        img.src = key.src;
        productCatal.append(img);
      
        let category = document.createElement('h4');
        category.textContent = key.name
        productCatal.append(category);

        //создание div для центрирования описания и цены
        let productPrice = document.createElement('div');
        productPrice.classList.add('product-price');
        productCatal.append(productPrice);

        //описание
        let description = document.createElement('p');
        description.textContent = key.description;
        productPrice.append(description);
        //Цена
        let price = document.createElement('p');
        price.textContent = key.price;
        productPrice.append(price);

      }creatingBlocks();
        
      //Создание блока поверх продукта с возможностью добавления в корзину
      function creatingBlocksHover(){
        let productHover = document.createElement('div');
        productHover.classList.add('product-hover');
        productCatal.prepend(productHover);

        let imgHover = document.createElement('img');
        imgHover.classList.add('img-hover');
        imgHover.src = key.srcHover;
        productHover.append(imgHover);

        let category = document.createElement('h4');
        category.textContent = key.name
        productHover.append(category);

        let size = document.createElement('p');
        size.textContent = 'Размер';
        productHover.append(size);

        //Создание блока с кнопками размера
        let buttonBlock = document.createElement('div');
        buttonBlock.classList.add('button-block');
        productHover.append(buttonBlock);
        //кнопка размера
        let arr = productCatal.dataset.size.split(',');
        for(let arrSize of arr ){
          let buttonSize = document.createElement('button');
          if(arrSize !== 'undefined'){
            buttonSize.textContent = arrSize;
            buttonSize.className = arrSize;
          }else{
            buttonSize.textContent = '-';
            buttonSize.className = 'oneSize';
          }
          buttonBlock.append(buttonSize);
        }
        
        //Создание корзины
        let basketBtn = document.createElement('button');
        basketBtn.setAttribute('data-gender', key.gender);
        basketBtn.setAttribute('data-price', key.price);
        basketBtn.setAttribute('data-name', key.name);
        basketBtn.setAttribute('data-description', key.description);
        basketBtn.setAttribute('data-id', key.id);
        basketBtn.classList.add('basket-hover');
        productHover.append(basketBtn);
        let basketImg = document.createElement('img');
        basketImg.src = '/icon/korzina.png';
        basketBtn.append(basketImg);


        

      }creatingBlocksHover()


    }
}
productUnloading();



//Функция пагинация 
function pagination(){
  const paginationNumbers = document.getElementById("pagination-numbers");
  const paginatedList = document.getElementById("paginated-list");
  const listItems = paginatedList.querySelectorAll(".product-catal");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  const paginationLimit = 15;
  const pageCount = Math.ceil(listItems.length / paginationLimit);
  let currentPage = 1;
  
  const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };
  
  const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };
  
  const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
      disableButton(prevButton);
    } else {
      enableButton(prevButton);
    }
  
    if (pageCount === currentPage) {
      disableButton(nextButton);
    } else {
      enableButton(nextButton);
    }
  };
  
  const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("page-index"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };
  
  const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
  
    paginationNumbers.appendChild(pageNumber);
  };
  
  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };
  
  const setCurrentPage = (pageNum) => {
    currentPage = pageNum;
  
    handleActivePageNumber();
    handlePageButtonsStatus();
    
    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;
  
    listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
        item.classList.remove("hidden");
      }
    });
  };
  
  window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);
  
    prevButton.addEventListener("click", () => {
      setCurrentPage(currentPage - 1);
    });
  
    nextButton.addEventListener("click", () => {
      setCurrentPage(currentPage + 1);
    });
  
    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));
  
      if (pageIndex) {
        button.addEventListener("click", () => {
          setCurrentPage(pageIndex);
        });
      }
    });
  });
}
pagination();
