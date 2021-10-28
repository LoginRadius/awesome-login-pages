const nav = document.querySelector('.na');
 const btn = document.querySelector('#burger')
 const hide = document.querySelector('#hide')

 btn.addEventListener('click', function visible() {
    nav.classList.add('nav-hidden');
    btn.classList.add('btn-hide');
   
})
hide.addEventListener('click', function hidden() {
    nav.classList.remove('nav-hidden');
    btn.classList.remove('btn-hide');

})
visible();
hidden();

//-----------------------------------------CONATCT-FORM----------------------------------------//

  