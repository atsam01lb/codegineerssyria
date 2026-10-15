// Codegineers Syria — mobile menu + footer year
(function(){
  var btn=document.querySelector('.nav__toggle');
  var menu=document.getElementById('nav-links');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var open=menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open);
      btn.setAttribute('aria-label',open?'Close menu':'Open menu');
      btn.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){menu.classList.remove('is-open');btn.setAttribute('aria-expanded','false');btn.innerHTML='<i class="fa-solid fa-bars"></i>';});
    });
  }
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});
})();
