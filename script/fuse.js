import catalogAston from './arrCatalog.js';
/*Выбор данных из массива объектов*/

//В переменной хранится каталог
let productAston  = catalogAston;

let siteSearch = document.getElementById('site-search');
const fuse = new Fuse(productAston, {
    keys: ['name', 'category', 'command', 'gender', 'pilot']
});

siteSearch.addEventListener('input', ()=>{
    
    const results = fuse.search(siteSearch.value);
    console.log(results);
    //Далее выводить товар на экран
})



