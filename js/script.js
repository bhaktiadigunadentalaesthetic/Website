(() => {
      const track = document.getElementById('carouselTrack');
      const slides = document.querySelectorAll('.hero-slide');
      const dots = document.querySelectorAll('.carousel-dot');
      const prev = document.getElementById('carouselPrev');
      const next = document.getElementById('carouselNext');
      let current = 0;
      let timer;

      function showSlide(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
          dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });

        slides.forEach((slide, i) => {
          const content = slide.querySelector('.hero-content');
          if (i === current) {
            content.style.animation = 'none';
            void content.offsetWidth;
            content.style.animation = 'heroFade 0.7s ease';
          }
        });
      }

      function startAutoPlay() {
        clearInterval(timer);
        timer = setInterval(() => showSlide(current + 1), 5000);
      }

      prev.addEventListener('click', () => {
        showSlide(current - 1);
        startAutoPlay();
      });

      next.addEventListener('click', () => {
        showSlide(current + 1);
        startAutoPlay();
      });

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          showSlide(Number(dot.dataset.slide));
          startAutoPlay();
        });
      });

      // Swipe support for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;
        if (Math.abs(distance) > 50) {
          showSlide(distance < 0 ? current + 1 : current - 1);
          startAutoPlay();
        }
      }, { passive: true });

      showSlide(0);
      startAutoPlay();
    })();

// Interaksi galeri dan tampilan foto besar
(() => {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('galleryLightbox');
  const image = document.getElementById('galleryLightboxImage');
  const close = document.getElementById('galleryClose');
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  if (!items.length || !lightbox || !image) return;
  let current = 0;
  const show = (index) => {
    current = (index + items.length) % items.length;
    image.src = items[current].dataset.full;
    image.alt = items[current].querySelector('img').alt;
  };
  const open = (index) => {
    show(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    close.focus();
  };
  const dismiss = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  items.forEach((item, index) => item.addEventListener('click', () => open(index)));
  close.addEventListener('click', dismiss);
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) dismiss(); });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') dismiss();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();


// Layanan Kami carousel
(()=>{const track=document.getElementById('servicesTrack');const cards=track?[...track.querySelectorAll('.card')]:[];const dots=document.querySelectorAll('.services-dot');const prev=document.getElementById('servicesPrev');const next=document.getElementById('servicesNext');if(!track||!cards.length)return;let current=0,timer;const perView=()=>innerWidth<=600?1:innerWidth<=900?2:3;const max=()=>Math.max(0,cards.length-perView());function show(i){current=Math.max(0,Math.min(i,max()));const gap=parseFloat(getComputedStyle(track).gap)||0;const w=cards[0].getBoundingClientRect().width;track.style.transform=`translateX(-${current*(w+gap)}px)`;dots.forEach((d,n)=>d.classList.toggle('active',n===current))}function start(){clearInterval(timer);timer=setInterval(()=>show(current>=max()?0:current+1),4500)}prev.addEventListener('click',()=>{show(current<=0?max():current-1);start()});next.addEventListener('click',()=>{show(current>=max()?0:current+1);start()});dots.forEach((d,n)=>d.addEventListener('click',()=>{show(Math.min(n,max()));start()}));addEventListener('resize',()=>show(current));let x=0;track.addEventListener('touchstart',e=>x=e.changedTouches[0].screenX,{passive:true});track.addEventListener('touchend',e=>{let d=e.changedTouches[0].screenX-x;if(Math.abs(d)>50){show(d<0?Math.min(current+1,max()):Math.max(current-1,0));start()}},{passive:true});show(0);start()})();

