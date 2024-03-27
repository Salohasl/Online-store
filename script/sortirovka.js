import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/
import { addPage } from './addPage.js';
import { addToCartLocalStorage } from './localStorage.js';

//В переменной хранится каталог
let productAston  = catalogAston;

const product = document.querySelector('.product');
//Выбор Категории
const radio = document.querySelectorAll('.cloth');


function filterProducts(products, criteria) {
    return products.filter(product => {
        return criteria.every(([key, value]) => {
            // Check if the key is 'size' and if the product has a 'size' property
            if (key === 'size' && product[key]) {
                // Use includes to check if the selected size is included in the product's size property
                return product[key].includes(value);
            }
            // For other keys, check for an exact match
            return product[key] === value;
        });
    });
}

let selectedCriteria = {};
radio.forEach(radio => {
    radio.addEventListener('click', () => {
      // Здесь вы можете собирать выбранные параметры сортировки
      // Например, сохранять их в массиве или объекте
        const groupName = radio.name;
        selectedCriteria[groupName] = radio.value;
  
    });
});


function filterCatalog(){
    document.querySelector('.applyBtn').addEventListener('click', (event) => {
    
      
        //Отключение пагинации
        document.getElementById('pag-cont').style.display = 'none';
    
        // Преобразование объекта selectedCriteria в массив пар ключ-значение
        const criteriaArray = Object.entries(selectedCriteria).map(([key, value]) => [key, value]);
        
        // Фильтрация продуктов по выбранным критериям
        const filteredProducts = filterProducts(productAston, criteriaArray);
   
        if(filteredProducts.length == 0){
            alert('Товара нет');
            event.stopPropagation();
        }else{
            // Очистка контейнера перед добавлением новых элементов
            while (product.firstChild) {
                product.removeChild(product.firstChild);
            }
             // Обновление интерфейса для отображения отфильтрованного списка продуктов
            filteredProducts.forEach(key => {
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
            });

            addPage();
            addToCartLocalStorage();
        }
        
    });
}

filterCatalog();

//Сброс всех настроек в фильтре
const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', ()=>{
  location.reload();
});


