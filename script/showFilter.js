function showFilter(){
    const filter = document.querySelector('.filter');
    document.getElementById('filter-btn').style.display = 'none';
    filter.classList.add('active');
}

function shadowButton(){
    const sizeBtn = document.querySelectorAll('.sizeBtn');
    sizeBtn.forEach(elem => {
        elem.addEventListener('click', ()=>{
            for(let btn of sizeBtn){
                if(btn != elem){
                    btn.classList.remove('click');
                }
                elem.classList.add('click');
            }
        })
    })

    const catalRadioBtn = document.querySelector('.catal-radio__btn');
    const display = document.querySelector('.display');
    const pilot = document.querySelector('#pilot');

    catalRadioBtn.addEventListener('click', ()=>{
        display.style.display = 'block';
        catalRadioBtn.style.display = 'none';
    })

    const pilotBtn = document.getElementById('pilots');

    pilotBtn.addEventListener('click', ()=>{
        pilot.style.display = 'block';
        pilotBtn.style.display = 'none';
    })


    const reset = document.getElementById('reset');
    reset.addEventListener('click', ()=>{
        filter.classList.remove('active');
        document.getElementById('filter-btn').style.display = 'flex';
    })
}
shadowButton();