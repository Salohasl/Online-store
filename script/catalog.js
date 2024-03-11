import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

//console.log(productAston);
const product = document.querySelector('.product');

//Функция выгрузки товара
function productUnloading(){
    for(let key of productAston){

        let productCatal = document.createElement('div');
        productCatal.classList.add('product-catal');
        productCatal.classList.add('list');
        product.append(productCatal);
        
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
    }
}
productUnloading();

//Функция пагинация 
function pagination(){
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll(".list");
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
