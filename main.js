// Codegineers Syria — menu, scroll reveal, progress bar, parallax, card tilt, back-to-top, footer year
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile menu
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

  // reveal on scroll
  var items=document.querySelectorAll('[data-reveal],[data-climb]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}});
    },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('is-in')})}

  // scroll progress + back to top
  var bar=document.querySelector('.scroll-progress span'),top=document.querySelector('.to-top'),ticking=false;
  function onScroll(){
    var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=h.scrollTop||document.body.scrollTop;
    if(bar)bar.style.setProperty('--p',max>0?(y/max).toFixed(4):0);
    if(top)top.classList.toggle('show',y>600);
    ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true}},{passive:true});
  onScroll();
  if(top)top.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});

  if(reduce)return;
  var fine=window.matchMedia('(pointer: fine)').matches;

  // hero mouse parallax
  var hero=document.querySelector('.hero');
  if(hero&&fine){
    var layers=hero.querySelectorAll('[data-depth]');
    hero.addEventListener('mousemove',function(e){
      var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      layers.forEach(function(l){var d=+l.dataset.depth;l.style.translate=(x*d)+'px '+(y*d)+'px'});
    });
    hero.addEventListener('mouseleave',function(){layers.forEach(function(l){l.style.translate='0 0'})});
  }

  // 3D tilt on program cards
  if(fine){
    document.querySelectorAll('.program').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.transform='perspective(800px) rotateX('+(-y*8)+'deg) rotateY('+(x*10)+'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave',function(){card.style.transform=''});
    });
  }

  // year
})();
document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear()});
