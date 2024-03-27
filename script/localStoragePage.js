
function addToCartLocalStorage(){

    let basketBtn = document.querySelectorAll('.basket-hover');

    let sizeButton = document.querySelectorAll('.size-button');

    const bt = document.querySelector('.bt img');

    sizeButton.forEach(btn => {
        btn.addEventListener('click', ()=>{
           

            for(let elem of basketBtn){
                if(btn.dataset.id == elem.dataset.id){
                    elem.dataset.size = btn.textContent;
                    btn.classList.add('active');
                    for(let btnElem of sizeButton){
                        if(btnElem != btn && btnElem.textContent != '-'){
                            btnElem.classList.remove('active');
                        }
                    
                    }
                }           
            }

        })
    })
  


    let datasetGender;

    basketBtn.forEach(elem => {
        elem.addEventListener('click', function click() {


            if(elem.dataset.size === ''){
                alert('Пожалуйста выберите размер')
            }else{

                bt.classList.add('active');

                if(elem.dataset.gender !== 'undefined'){
                    datasetGender = elem.dataset.gender;
                }else{
                    datasetGender = 'Унисекс';
                }


                elem.classList.add('active');

                const productObj = {
                    id: elem.dataset.id,
                    name: elem.dataset.name,
                    gender: datasetGender, 
                    description: elem.dataset.description,
                    price: elem.dataset.price,
                    size: elem.dataset.size,
                    color: elem.dataset.color
                }
                
                let products = JSON.parse(localStorage.getItem('product')) || [];
                products.push(productObj);
                localStorage.setItem('product', JSON.stringify(products));

                elem.removeEventListener('click', click)

                alert('Товар добавлен');
            }
            
            
            
        })
    })
  }
  
  addToCartLocalStorage();
