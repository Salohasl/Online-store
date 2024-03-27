import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

const product = document.querySelector('.product');

//Функция выгрузки товара
function productUnloading(){
    for(let key of productAston){

      let productCatal = document.createElement('div');
      productCatal.classList.add('product-catal');
      productCatal.setAttribute('id', 'product-catal');
      productCatal.setAttribute('data-category', key.category);
      productCatal.setAttribute('data-pilot', key.pilot);
      productCatal.setAttribute('data-size', key.size);
      productCatal.setAttribute('data-command', key.command);
      productCatal.setAttribute('data-name', key.name);
      product.append(productCatal);
      



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
        productHover.setAttribute('data-category', key.category);
        productHover.setAttribute('data-pilot', key.pilot);
        productHover.setAttribute('data-size', key.size);
        productHover.setAttribute('data-command', key.command);
        productHover.setAttribute('data-name', key.name);
        productHover.setAttribute('data-gender', key.gender);
        productHover.setAttribute('data-img', key.src);
        productHover.setAttribute('data-img1', key.srcHover);
        productHover.setAttribute('data-img2', key.img2);
        productHover.setAttribute('data-img3', key.img);
        productHover.setAttribute('data-color', key.color);
        productHover.setAttribute('data-full', key.full);
        productHover.setAttribute('data-id', key.id);
        productHover.setAttribute('data-price', key.price);
        productHover.setAttribute('data-desc', key.description);
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
            buttonSize.classList.add('active');
          }
          buttonSize.setAttribute('data-id', key.id);
          buttonSize.classList.add('size-button');
          buttonBlock.append(buttonSize);
        }
        
        //Создание корзины
        let basketBtn = document.createElement('button');
        basketBtn.setAttribute('data-gender', key.gender);
        basketBtn.setAttribute('data-price', key.price);
        basketBtn.setAttribute('data-name', key.name);
        basketBtn.setAttribute('data-description', key.description);
        basketBtn.setAttribute('data-id', key.id);
        basketBtn.setAttribute('data-color', key.color);
        
        for(let arrSize of arr){
          if(arrSize !== 'undefined'){
            basketBtn.setAttribute('data-size', '')
          }else{
            basketBtn.setAttribute('data-size', '-')
          }
        }
    
        basketBtn.classList.add('basket-hover');
        productHover.append(basketBtn);
        let basketImg = document.createElement('img');
        basketImg.src = '/icon/korzina.png';
        basketBtn.append(basketImg);

        const bt = document.querySelector('.bt img');

        basketBtn.addEventListener('click', ()=>{
          bt.classList.add('active');
        })
        

      }creatingBlocksHover()


    }

    
}
productUnloading();



//Функция пагинация 
export function pagination(listItems){
  const paginationNumbers = document.getElementById("pagination-numbers");
 // const paginatedList = document.getElementById("paginated-list");
 // const listItems = paginatedList.querySelectorAll(".product-catal");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  const paginationLimit = 20;
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
// Обновление DOM с отсортированным массивом

pagination(document.querySelectorAll(".product-catal"));



