
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
  initSearchToggle();
  initLangDropdown();
  initCustomSelect();
});

function initHeroSwiper() {
  const heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: "auto",
    centeredSlides: false, // Sola yapışıq qalması üçün
    spaceBetween: 20,
    loop: true,
    speed: 800,
    
    // 1. Sürüşdürməni (mouse drag) TAMAMİLƏ bağlayır
    allowTouchMove: false, 
    
    // 2. Swiper-in öz kliklə-atlan funksiyasını söndürürük (1-1 getməsi üçün bu mütləqdir)
    slideToClickedSlide: false, 

    on: {
      slideChange: function () {
        const index = this.realIndex;
        updateHeroText(index);
        animateHeroPlane();
        if (typeof updateHeroDots === 'function') {
          updateHeroDots(index);
        }
      },
      
      // 3. Əllə klik idarəetməsi (Həmişə 1 addım irəli)
      click: function (swiper, event) {
        // Kliklənən slaydı tapırıq
        const clickedSlide = event.target.closest('.swiper-slide');
        
        // Əgər kliklənən slayd aktiv (ən soldakı) deyilsə, ancaq 1 addım irəli get
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
    titleEl.style.opacity = "0";
    subtitleEl.style.opacity = "0";

    setTimeout(() => {
      titleEl.innerText = heroData[index].title;
      subtitleEl.innerText = heroData[index].subtitle;
      titleEl.style.opacity = "1";
      subtitleEl.style.opacity = "1";
    }, 300);
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

function initSearchToggle() {
  const searchToggles = document.querySelectorAll('.search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearchBtn = document.getElementById('close-search');
  const searchContent = document.getElementById('search-content');
  const searchInput = document.getElementById('overlay-search-input');

  if (!searchOverlay) return;

  function openSearch(e) {
    if (e) e.preventDefault();
    searchOverlay.classList.remove('invisible', 'opacity-0');
    searchOverlay.classList.add('visible', 'opacity-100');
    searchOverlay.style.zIndex = "2000";

    setTimeout(() => {
      searchContent.classList.remove('scale-95', 'opacity-0');
      searchContent.classList.add('scale-100', 'opacity-100');
      if (searchInput) searchInput.focus();
    }, 10);
  }

  function closeSearch() {
    searchContent.classList.remove('scale-100', 'opacity-100');
    searchContent.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
      searchOverlay.classList.remove('visible', 'opacity-100');
      searchOverlay.classList.add('invisible', 'opacity-0');
      searchOverlay.style.zIndex = "-1";
    }, 300);
  }

  searchToggles.forEach(toggle => {
    toggle.addEventListener('click', openSearch);
  });

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', closeSearch);
  }

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('visible')) {
      closeSearch();
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

        // Close all other dropdowns
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

  // Close when clicking outside
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

        // Update display text
        valueDisplay.innerText = text;
        wrapper.querySelector('.custom-select-dropdown-close span').innerText = text;

        // Update styling of options
        options.forEach(opt => {
          if (opt === option) {
            opt.classList.replace('text-[#484848]', 'text-[#c0c0c0]');
          } else {
            opt.classList.replace('text-[#c0c0c0]', 'text-[#484848]');
          }
        });

        // Update hidden select
        if (hiddenSelect) {
          hiddenSelect.value = value;
          hiddenSelect.dispatchEvent(new Event('change'));
        }

        closeDropdown();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        if (dropdown.classList.contains('visible')) {
          closeDropdown();
        }
      }
    });
  });
}
