
function agree(){
    const agree = document.getElementById('agree');
    const buttonForm = document.getElementById('buttonForm');
    agree.addEventListener('click', () =>{
        if(!(agree.checked)){
            buttonForm.style.backgroundColor = 'grey';
            buttonForm.setAttribute('disabled', '.');
        }else{
            buttonForm.style.backgroundColor = '#EF7D3F';
            buttonForm.removeAttribute('disabled', '.');
        }
    })
}agree();

function openForm(){
    document.getElementById('containerFormUp').style.display = 'flex';
}

function closeFunc(){
    containerFormUp.style.display = 'none';
    location. reload();
}