import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAstons  = catalogAston;
const paymentPrice = document.querySelector('.payment-price');

function removeToCartLocalStorage() {
    const table = document.querySelector('table');
    let savedProduct = JSON.parse(localStorage.getItem('product')) || []; // Инициализация пустым массивом, если в localStorage нет данных
    

    let num;
    for (let product of savedProduct) {
        let tr = document.createElement('tr');
        tr.classList.add('start');
        table.append(tr);

        let td1 = document.createElement('td');
        tr.append(td1);

        const div = document.createElement('div');
        div.classList.add('table-item')
        td1.appendChild(div);

        for(let productAston of productAstons){
            if(product.id == productAston.id){
                let img = document.createElement('img');
                img.src = productAston.srcHover;
                div.append(img)
            }
        }

        const divTwo = document.createElement('div');
        divTwo.classList.add('table-item__block')
        div.append(divTwo)

        const desc = document.createElement('div');
        desc.classList.add('table-item__text');
        desc.innerHTML = `
            <p>${product.name}</p>
            <p>${product.gender}</p>
            <p>${product.description}</p>
        `;
        divTwo.append(desc);

        const size = document.createElement('div');
        size.classList.add('table-item__size');
        size.innerHTML = `
            <p>размер</p>
            <p>...</p>
        `;
        divTwo.append(size);

        const minMax = document.createElement('div');
        minMax.classList.add('min-max');
        minMax.innerHTML = `
            <button class="min" data-price="${product.price}">-</button>
            <p class="value">1</p>
            <button class="max" data-price="${product.price}">+</button>
        `;
        size.append(minMax);

        let td2 = document.createElement('td');
        td2.classList.add('price-product');
        td2.setAttribute('data-price', product.price)
        td2.textContent = product.price;
        tr.append(td2);

        let close = document.createElement('div');
        close.classList.add('close');
        td1.prepend(close);
        for (let i = 1; i <= 2; i++) {
            let span = document.createElement('span');
            close.append(span);
        }


        close.addEventListener('click', () => {
            tr.remove();

            // Находим индекс продукта в массиве savedProduct
            const index = savedProduct.findIndex(p => p.name === product.name);
            if (index !== -1) {
                // Удаляем продукт из массива
                savedProduct.splice(index, 1);
                // Обновляем данные в localStorage
                localStorage.setItem('product', JSON.stringify(savedProduct));
            }

            // Обновляем общую сумму
            num = td2.textContent.slice(0, -1);
            paymentPrice.textContent = Number(paymentPrice.textContent) - Number(num);
        });

        num = td2.textContent.slice(0, -1);
        paymentPrice.textContent = Number(paymentPrice.textContent) + Number(num);

    }
}

removeToCartLocalStorage();


//Вывода рекомендации рандомно
function recommen(){
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
    
    // Выбираем 7 случайных блоков
    const randomBlocks = getRandomElementsFromArray(productAstons, 5);

    // Функция для отображения блоков на странице
    function displayBlocks(blocks) {
        const container = document.getElementById('container');
        container.innerHTML = ''; // Очищаем контейнер перед добавлением новых блоков

        blocks.forEach(block => {
            const div = document.createElement('div');
            div.classList.add('recommen-item')
            div.innerHTML = `
                <img src="${block.src}" alt="${block.name}">
            `;
            container.appendChild(div);

            const divMin = document.createElement('div');
            divMin.classList.add('recommen-item__text');
            divMin.innerHTML = `
                <p>${block.name}</p>
                <p>${block.command}</p>
                <p>${block.price}</p>
            `;
            div.append(divMin);

            
        });
    }

    // Отображаем выбранные блоки
    displayBlocks(randomBlocks);

}

recommen();



function quantityOfGoods (){
    let priceProduct = document.querySelectorAll('.price-product');
    
    let num;
    document.querySelectorAll('.max').forEach(function(button) {
        button.addEventListener("click", function() {
            var valueElement = this.previousElementSibling; 
            var x = parseInt(valueElement.textContent);
            x++;
            valueElement.textContent = x;
            for(let price of priceProduct){
                if(button.dataset.price == price.dataset.price){
                    num = price.textContent.slice(0, -1); // Удаляем последний символ
                    num = Number(num) + Number(price.dataset.price.slice(0, -1)); // Увеличиваем значение 
                    price.textContent = num + 'р'; // Добавляем обратно рубль и обновляем текст элемента

                    paymentPrice.textContent = Number(paymentPrice.textContent) + Number(price.dataset.price.slice(0, -1));  //Обновляем итоговую сумму
                }
            }
                
        });
    });
    
    document.querySelectorAll('.min').forEach(function(button) {
        button.addEventListener("click", function() {
            var valueElement = this.nextElementSibling; 
            var x = parseInt(valueElement.textContent);
            if (x > 1) {
                x--;
                valueElement.textContent = x;
                for(let price of priceProduct){
                    if(button.dataset.price == price.dataset.price){
                        num = price.textContent.slice(0, -1); // Удаляем последний символ 
                        num = Number(num) - Number(price.dataset.price.slice(0, -1)); // Уменьшаем значение
                        price.textContent = num + 'р'; // Добавляем обратно рубль и обновляем текст элемента

                        paymentPrice.textContent = Number(paymentPrice.textContent) - Number(price.dataset.price.slice(0, -1)); //Обновляем итоговую сумму
                    }
        
                 
                }
            }
        });
    });




}

quantityOfGoods();