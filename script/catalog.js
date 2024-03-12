import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

const product = document.querySelector('.product');

//Для фильтрации каталога
const applyBtn = document.querySelector('.applyBtn');
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
      product.append(productCatal);


      
      //Создание массива для категорий одежды
      let res = [];
      res.push(productCatal.dataset.category)
      
      //Настройка филтрации одежды по radio
      radio.forEach(elem => {
        elem.addEventListener('click', ()=>{
          console.log(elem.value);
          //При нажатии на применять сработает скрипт
          applyBtn.addEventListener('click', ()=>{
            if(!(res == elem.value)){
              productCatal.length == res;
              productCatal.style.display = 'none';
            }else{
              productCatal.style.display = 'block';
            }    
          })
        })
      })
      

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
