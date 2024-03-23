function addToCartLocalStorage(){
    const bt = document.querySelector('.bt img');

    let basketBtn = document.querySelector('.basket-hover');
    
    let sizeButton = document.querySelectorAll('.size-button');

    sizeButton.forEach(btn => {
        btn.addEventListener('click', ()=>{
            for(let btnElem of sizeButton){
                if(btnElem != btn){
                    btnElem.classList.remove('active');
                }
                btn.classList.add('active');
            }

            if(btn.dataset.id == basketBtn.dataset.id){
                basketBtn.setAttribute('data-size', btn.textContent)  
            }           


        })
    })
  


    let datasetGender;



        basketBtn.addEventListener('click', function click(event) {

            if(basketBtn.dataset.size === undefined){
                alert('Пожалуйста выберите размер')
            }else{

               
                bt.classList.add('active');

                if(basketBtn.dataset.gender !== 'undefined'){
                    datasetGender = basketBtn.dataset.gender;
                }else{
                    datasetGender = 'Унисекс';
                }


                basketBtn.classList.add('active');

                const productObjPage = {
                    id: basketBtn.dataset.id,
                    name: basketBtn.dataset.name,
                    gender: datasetGender, 
                    description: basketBtn.dataset.description,
                    price: basketBtn.dataset.price,
                    size: basketBtn.dataset.size,
                    color: basketBtn.dataset.color
                }
                
                let products = JSON.parse(localStorage.getItem('product')) || [];
                products.push(productObjPage);
                localStorage.setItem('product', JSON.stringify(products));

                basketBtn.removeEventListener('click', click)

                alert('Товар добавлен');
            }
            
            
            
        })
  }
  
  addToCartLocalStorage();



  //По клику на размер добавлять в атрибут кнопки корзины и сохранять в локалке