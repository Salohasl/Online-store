import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

let productCatal = document.querySelectorAll('.product-hover');

let page = document.querySelector('.page');

let command = document.querySelector('.command');
let size = document.querySelector('.size');

let name = document.querySelector('.name')
let swiperTwo = document.querySelectorAll('.swiper-two');
function addPage(){

        productCatal.forEach(item => {
            item.addEventListener('click', (event)=>{

                if(event.target.className == 'img-hover'){

                    page.classList.add('active');
                    document.getElementById('container').style.display = 'none';
                    
                    for(swiper of swiperTwo){
                        let img = document.createElement('img');
                        img.src = item.dataset.img;
                        swiper.append(img);
                    // console.log(swiper);
                    }
                

                    command.textContent = item.dataset.command;
        
                    let arr = item.dataset.size.split(',');
                    for(let arrSize of arr){
                        let buttonSize = document.createElement('button');     
                        if(arr == 'undefined'){
                            buttonSize.textContent = '-';
                        }else{
                            buttonSize.textContent = arrSize;
                        }
                        size.append(buttonSize);
                    }
                    
        
                    if(item.dataset.gender == 'undefined'){
                        name.textContent = item.dataset.name + ' ' + 'Унисекс';
                    }else{
                        name.textContent = item.dataset.name + ' ' + item.dataset.gender;
                    }
                }
                
    
            })
        })
    

}
addPage();