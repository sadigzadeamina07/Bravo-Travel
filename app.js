
window.addEventListener('DOMContentLoaded', () => {
  const underlineeffect = document.querySelectorAll('#phone-number')
  setTimeout(() => {
    if (underlineeffect) {
      underlineeffect.classList.add('.active')
      console.log('clas elave olundu');

    }

  }, 300);
})
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
  initLangDropdown();
  initCustomSelect();
});

function initHeroSwiper() {
  const heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: "auto",
    centeredSlides: false,
    spaceBetween: 15,
    loop: true,
    speed: 800,
    allowTouchMove: false,
    slideToClickedSlide: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        allowTouchMove: true
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 15,
      }
    },
    on: {
      realIndexChange: function () {
        const index = this.realIndex;
        updateHeroText(index);
        animateHeroPlane();
        updateHeroDots(index);
      },
      click: function (swiper, event) {
        const clickedSlide = event.target.closest('.swiper-slide');
        if (clickedSlide && !clickedSlide.classList.contains('swiper-slide-active')) {
          swiper.slideNext();
        }
      }
    },
  });
}

function updateHeroText(index) {
  const titleEl = document.getElementById("hero-title");
  const subtitleEl = document.getElementById("hero-subtitle");

  if (titleEl && subtitleEl && heroData[index]) {
    titleEl.innerText = heroData[index].title;
    subtitleEl.innerText = heroData[index].subtitle;
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
    speed: 800,
    autoHeight: false,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      900: {
        slidesPerView: 2,
      },
      1050: {
        slidesPerView: 3,
      }
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

function initLangDropdown() {
  const langContainers = document.querySelectorAll('.lang-container');
  langContainers.forEach(container => {
    const toggle = container.querySelector('.lang-toggle');
    const dropdown = container.querySelector('.lang-dropdown');
    const icon = container.querySelector('.icon-caret');
    if (toggle && dropdown) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.lang-dropdown').forEach(d => {
          if (d !== dropdown) {
            d.classList.add('opacity-0', 'invisible', 'translate-y-2');
            d.classList.remove('opacity-100', 'visible', 'translate-y-0');
          }
        });
        document.querySelectorAll('.icon-caret').forEach(i => {
          if (i !== icon) {
            i.classList.remove('rotate-180');
          }
        });
        const isVisible = dropdown.classList.contains('opacity-100');
        if (!isVisible) {
          dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
          dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
          if (icon) icon.classList.add('rotate-180');
        } else {
          dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
          dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
          if (icon) icon.classList.remove('rotate-180');
        }
      });
    }
  });
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.lang-container').forEach(container => {
      if (!container.contains(e.target)) {
        const dropdown = container.querySelector('.lang-dropdown');
        const icon = container.querySelector('.icon-caret');
        if (dropdown) {
          dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
          dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
        if (icon) {
          icon.classList.remove('rotate-180');
        }
      }
    });
  });
}

function initCustomSelect() {
  const wrappers = document.querySelectorAll('.custom-select-wrapper');
  wrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.custom-select-trigger');
    const dropdown = wrapper.querySelector('.custom-select-dropdown');
    const closeBtn = wrapper.querySelector('.custom-select-dropdown-close');
    const options = wrapper.querySelectorAll('.custom-select-option');
    const valueDisplay = wrapper.querySelector('.custom-select-value');
    const hiddenSelect = wrapper.querySelector('select');
    if (!trigger || !dropdown) return;
    function openDropdown() {
      trigger.classList.add('opacity-0', 'invisible');
      dropdown.classList.remove('opacity-0', 'invisible', '-translate-y-2');
      dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
    }
    function closeDropdown() {
      dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
      dropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
      setTimeout(() => {
        trigger.classList.remove('opacity-0', 'invisible');
      }, 150);
    }
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDropdown();
    });
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDropdown();
    });
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.getAttribute('data-value');
        const text = option.innerText;
        valueDisplay.innerHTML = text;
        wrapper.querySelector('.custom-select-dropdown-close span').innerHTML = text;
        options.forEach(opt => {
          if (opt === option) {
            opt.classList.replace('text-[#484848]', 'text-[#c0c0c0]');
          } else {
            opt.classList.replace('text-[#c0c0c0]', 'text-[#484848]');
          }
        });
        if (hiddenSelect) {
          hiddenSelect.value = value;
          hiddenSelect.dispatchEvent(new Event('change'));
        }
        closeDropdown();
      });
    });
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        if (dropdown.classList.contains('visible')) {
          closeDropdown();
        }
      }
    });
  });
}
