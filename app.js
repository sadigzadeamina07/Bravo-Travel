
const heroData = [
  { title: "Moskva", subtitle: "Gəz, gəz və yenə gəz" },
  { title: "İSTANBUL", subtitle: "Tarix yazan şəhər" },
  { title: "Dubay", subtitle: "Dünyanın günəşli bucağı" },
  { title: "Avropa", subtitle: "İlk qərar verilən destinasiya" },
  { title: "Maldiv", subtitle: "Bir yerüzü cənnəti" },
];

const DOT_CLASSES = {
  active: "hero-dot w-5 h-5 rounded-full border-2 border-[#f58220] flex items-center justify-center bg-transparent",
  inactive: "hero-dot w-2 h-2 rounded-full bg-[#1e419b]"
};

const DOT_INNER_HTML = {
  active: '<div class="w-2 h-2 rounded-full bg-[#1e419b]"></div>',
  inactive: ''
};

document.addEventListener("DOMContentLoaded", () => {
  initHeroSwiper();
  initToursSwiper();
  initStickyHeader();
});

function initHeroSwiper() {
  const heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: "auto",      
    centeredSlides: false,      
    spaceBetween: 20,           
    loop: true,
    speed: 1000,          
    on: {
      slideChange: function () {
        const index = this.realIndex;
        updateHeroText(index);
        animateHeroPlane(); 
      },
    },
  });
}

function updateHeroText(index) {
  const titleEl = document.getElementById("hero-title");
  const subtitleEl = document.getElementById("hero-subtitle");

  if (titleEl && subtitleEl && heroData[index]) {
    titleEl.style.opacity = "0";
    subtitleEl.style.opacity = "0";
    
    setTimeout(() => {
      titleEl.innerText = heroData[index].title;
      subtitleEl.innerText = heroData[index].subtitle;
      titleEl.style.opacity = "1";
      subtitleEl.style.opacity = "1";
    }, 150);
  }
}

function animateHeroPlane() {
  const plane = document.getElementById("hero-plane");
  if (plane) {
    plane.classList.remove("fly-once");
    void plane.offsetWidth;
    plane.classList.add("fly-once");
  }
}

function updateHeroDots(activeIndex) {
  document.querySelectorAll(".hero-dot").forEach((dot, i) => {
    if (i === activeIndex) {
      dot.className = DOT_CLASSES.active;
      dot.innerHTML = DOT_INNER_HTML.active;
    } else {
      dot.className = DOT_CLASSES.inactive;
      dot.innerHTML = DOT_INNER_HTML.inactive;
    }
  });
}

function initToursSwiper() {
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    autoHeight: false,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".my-custom-next",
      prevEl: ".my-custom-prev",
    },
    on: {
      init: function () {
        this.el.querySelectorAll('.swiper-slide').forEach(slide => {
          slide.style.height = 'auto';
        });
      }
    }
  });
}

function initStickyHeader() {
  const stickyHeader = document.getElementById("sticky-header");
  
  if (!stickyHeader) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      stickyHeader.classList.remove("-translate-y-full");
    } else {
      stickyHeader.classList.add("-translate-y-full");
    }
  });
}
