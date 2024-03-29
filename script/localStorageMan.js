export function addToCartLocalStorage(){

    let basketBtn = document.querySelectorAll('.basket-hover');

    let sizeButton = document.querySelectorAll('.size-button');

    sizeButton.forEach(btn => {
        btn.addEventListener('click', ()=>{
            for(let btnElem of sizeButton){
                if(btnElem != btn){
                    btnElem.classList.remove('active');
                }
                btn.classList.add('active');
            }

            for(let elem of basketBtn){
                if(btn.dataset.id == elem.dataset.id){
                    elem.setAttribute('data-size', btn.textContent)  
                }           
            }

        })
    })
  


    let datasetGender;

    const productArray = [];

    basketBtn.forEach(elem => {
        elem.addEventListener('click', function click(event) {

            if(elem.dataset.size === undefined){
                alert('Пожалуйста выберите размер')
            }else{

                if(elem.dataset.gender !== 'undefined'){
                    datasetGender = elem.dataset.gender;
                }else{
                    datasetGender = 'Унисекс';
                }


                elem.classList.add('active');

                const productObjMan = {
                    id: elem.dataset.id,
                    name: elem.dataset.name,
                    gender: datasetGender, 
                    description: elem.dataset.description,
                    price: elem.dataset.price,
                    size: elem.dataset.size,
                    color: elem.dataset.color
                }
                
                let products = JSON.parse(localStorage.getItem('product')) || [];
                products.push(productObjMan);
                localStorage.setItem('product', JSON.stringify(products));

                elem.removeEventListener('click', click)

                alert('Товар добавлен');
            }
            
            
            
        })
    })
  }
  
  addToCartLocalStorage();



  //По клику на размер добавлять в атрибут кнопки корзины и сохранять в локалке