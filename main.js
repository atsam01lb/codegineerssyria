// Codegineers Syria — menu, scroll reveal, curriculum bars, footer year
(function(){
  var btn=document.querySelector('.nav__toggle'),menu=document.getElementById('nav-links');
  function setMenu(open){
    menu.classList.toggle('is-open',open);
    btn.setAttribute('aria-expanded',open);
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    btn.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>';
  }
  if(btn&&menu){
    btn.addEventListener('click',function(){setMenu(!menu.classList.contains('is-open'))});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  }

  var items=document.querySelectorAll('[data-reveal],[data-climb]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}});
    },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('is-in')})}

  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear()});
})();
