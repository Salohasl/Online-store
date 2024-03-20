
let productCatal = document.querySelectorAll('.product-hover');

let datasetGender;
const productArray = [];
function addPage(){

        productCatal.forEach(item => {
            item.addEventListener('click', (event)=>{
                
                if(event.target.className == 'img-hover'){

                    if(item.dataset.gender == 'undefined'){
                        datasetGender = item.dataset.name + ' ' + 'Унисекс';
                    }else{
                        datasetGender = item.dataset.name + ' ' + item.dataset.gender;
                    }

                    const productObj = {
                        command: item.dataset.command, 
                        gender: datasetGender,
                        description: item.dataset.full,
                        size:  item.dataset.size.split(','),
                        color: item.dataset.color,
                        id: item.dataset.id
                    }
                    
                    productArray.push(productObj);
                    console.log(productArray)
                    localStorage.setItem('page', JSON.stringify(productArray));

                    window.location.href = '/product/product.html';
                }
                
    
            })
        })
    

}
addPage();