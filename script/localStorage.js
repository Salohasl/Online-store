function addToCartLocalStorage(){

    let basketBtn = document.querySelectorAll('.basket-hover');

    let datasetGender;

    const productArray = [];

    basketBtn.forEach(elem => {
        elem.addEventListener('click', function click(event) {

            if(elem.dataset.gender !== 'undefined'){
                datasetGender = elem.dataset.gender;
            }else{
                datasetGender = 'Унисекс';
            }
          

            const productObj = {
                id: elem.dataset.id,
                name: elem.dataset.name,
                gender: datasetGender, 
                description: elem.dataset.description,
                price: elem.dataset.price,
            }
            
            productArray.push(productObj);
            console.log(productArray)
            localStorage.setItem('product', JSON.stringify(productArray));
            
            elem.removeEventListener('click', click)
        })
    })
  }
  
  addToCartLocalStorage();



  //По клику на размер добавлять в атрибут кнопки корзины и сохранять в локалке