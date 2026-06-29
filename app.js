
window.addEventListener('DOMContentLoaded', () => {
  // querySelectorAll bir NodeList qaytarır, NodeList-də .classList olmur — buna görə
  // bu kod həqiqətən heç vaxt işləmirdi (konsolda "Cannot read properties of
  // undefined (reading 'add')" xətası verirdi). Tək element üçün querySelector istifadə edirik.
  const underlineeffect = document.querySelector('#phone-number');
  setTimeout(() => {
    if (underlineeffect) {
      // '.active' yox — classList.add-a class adı NÖQTƏSİZ verilir.
      underlineeffect.classList.add('phone-pulse');
      console.log('class əlavə olundu');
    }
  }, 300);
});
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
  initNavMagic();
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
    autoplay: {
      delay: 3000, // 3 saniyə gözləmə vaxtı
      disableOnInteraction: false, // İstifadəçi toxunduqdan sonra da davam etsin
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
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
      if (stickyHeader.classList.contains("-translate-y-full")) {
        stickyHeader.classList.remove("-translate-y-full");
        window.dispatchEvent(new Event('resize'));
      }
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
      trigger.classList.add('hidden');
      dropdown.classList.remove('hidden');

      // Allow the DOM to update 'hidden' before transitioning
      requestAnimationFrame(() => {
        dropdown.classList.remove('opacity-0', 'max-h-0');
        dropdown.classList.add('opacity-100', 'max-h-[500px]');
      });
    }
    function closeDropdown() {
      dropdown.classList.remove('opacity-100', 'max-h-[500px]');
      dropdown.classList.add('opacity-0', 'max-h-0');

      setTimeout(() => {
        dropdown.classList.add('hidden');
        trigger.classList.remove('hidden');
      }, 300); // Wait for transition to finish
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
        if (option.classList.contains('disabled')) return;
        const value = option.getAttribute('data-value');
        const text = option.innerText;

        // Update display values
        valueDisplay.innerHTML = text;
        const dropdownCloseText = wrapper.querySelector('.custom-select-dropdown-close span');
        if (dropdownCloseText) dropdownCloseText.innerHTML = text;

        // Update trigger color based on selection
        if (value === "") {
          trigger.classList.remove('text-[#212529]');
          trigger.classList.add('text-[#c0c0c0]');
        } else {
          trigger.classList.remove('text-[#c0c0c0]');
          trigger.classList.add('text-[#212529]');
        }

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
function initNavMagic() {
  const navContainers = document.querySelectorAll('.nav-magic');
  let rawPath = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  if (!rawPath.endsWith('.html') && !rawPath.includes('.')) {
    rawPath += '.html';
  }
  const currentPath = rawPath;

  navContainers.forEach(container => {
    const line = container.querySelector('.nav-magic-line');
    if (!line) return;

    const items = container.querySelectorAll('a, button');
    let activeLink = null;

    items.forEach(item => {
      const href = item.getAttribute('href');
      const isHtmlActive = item.classList.contains('active-link') || item.classList.contains('text-[#f58220]');
      const isPathActive = href && (href === currentPath || href.endsWith('/' + currentPath));

      if (isHtmlActive || isPathActive) {
        activeLink = item;
        item.classList.add('active-link', 'text-[#f58220]');
      }
    });

    function positionLine(el) {
      if (el && container.offsetWidth > 0 && container.offsetHeight > 0) {
        const containerRect = container.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const padLeft = parseFloat(style.paddingLeft) || 0;
        const padRight = parseFloat(style.paddingRight) || 0;

        line.style.left = `${rect.left - containerRect.left + padLeft}px`;
        line.style.width = `${rect.width - padLeft - padRight}px`;
        line.style.top = `${rect.bottom - containerRect.top + 2}px`;
        line.style.opacity = '1';
      } else {
        line.style.width = '0px';
        line.style.opacity = '0';
      }
    }

    items.forEach(item => {
      const href = item.getAttribute('href');

      // Hover
      item.addEventListener('mouseenter', () => positionLine(item));

      item.addEventListener('click', () => {
        if (!href || href.startsWith('#') || item.tagName.toLowerCase() === 'button') {
          items.forEach(i => i.classList.remove('active-link', 'text-[#f58220]'));
          activeLink = item;
          item.classList.add('active-link', 'text-[#f58220]');
          positionLine(activeLink);
        }
      });
    });

    // Reset underline to active element
    container.addEventListener('mouseleave', () => positionLine(activeLink));

    // Initialize line position on load, scroll, and resize
    const reset = () => positionLine(activeLink);
    setTimeout(reset, 150);
    window.addEventListener('load', reset);
    window.addEventListener('resize', reset);
    window.addEventListener('scroll', reset, { passive: true });
  });
}
