let sideSwiper = null;
const initSwiper = () => {
   const screenWidth = window.innerWidth;

   if (screenWidth <= 600 && sideSwiper === null) {
      sideSwiper = new Swiper('._side-slider', {
         loop: false,
         direction: 'horizontal',
         slidesPerView: 5,
         spaceBetween: 12,
         freeMode: false,
         centerMode: true,
      });
   } else if (screenWidth > 600) {
      if(sideSwiper) {
         sideSwiper.destroy(true, true);
      }
      sideSwiper = new Swiper('._side-slider', {
         loop: true,
         direction: 'vertical',
         slidesPerView: 5,
         freeMode: false,
         slideToClickedSlide: true,
         pagination: false,
         navigation: false,
      });
   }
};

document.addEventListener('DOMContentLoaded', () => {
   initSwiper();
   window.addEventListener('resize', initSwiper);
});

let mainSwiper;
try {
   mainSwiper = new Swiper('._main-slider', {
      loop: true,
      pagination: false,
      slidesPerView: 1,
      spaceBetween: 2,
      navigation: {
         nextEl: '._main-slider .main-swiper-button-next',
         prevEl: '._main-slider .main-swiper-button-prev',
      },
   });

} catch (error) {
   console.error('Error initializing Main Swiper:', error);
}

let fashionSwiper;
try {
   fashionSwiper = new Swiper('._fashion-slider', {
      loop: true,
      slidesPerView: "auto",
      // freeMode: true,
      spaceBetween: 20,
      pagination: false,
      centerMode: false,
      slideToClickedSlide: true,
      // slidesPerView: 1,
      navigation: {
         nextEl: '.fashion__arrow_wrap .swiper-button-next',
         prevEl: '.fashion__arrow_wrap .swiper-button-prev',
      },
      breakpoints: {
         600: {
            navigation: false,
         },
         1024: {
            navigation: true,
         },
      }
   });

} catch (error) {
   console.error('Error initializing Main Swiper:', error);
}

let fullImageSwiper;
try {
   fullImageSwiper = new Swiper('._fullImage-slider', {
      loop: true,
      pagination: true,
      slidesPerView: 1,
      navigation: {
         nextEl: '._fullImage-slider .__next',
         prevEl: '._fullImage-slider .__prev',
      },
   });

} catch (error) {
   console.error('Error initializing Main Swiper:', error);
}

let sideModalSwiper;
try {
   sideModalSwiper = new Swiper('._sideModal-slider', {
      loop: true,
      direction: 'vertical',
      slidesPerView: 5,
      pagination: false,
      navigation: false,
      // centeredSlides: true,
      slideToClickedSlide: true,
   });

} catch (error) {
   console.error('Error initializing Side Swiper:', error);
}

const showBonusDescription = () => {
   document.querySelectorAll('.card__bonus_description_btn').forEach(button => {
      button.addEventListener('click', () => {
         const modalId = button.dataset.popup;
         const modal = document.querySelector(`.hidden__bonus_description[popup-id="${modalId}"]`);
         
         if (modal) {
            modal.classList.toggle('_show');
         }
      });
   });
};
showBonusDescription();

const toggleModal = () => {
   const buttons = document.querySelectorAll("[data-modal]");
   const closeButtons = document.querySelectorAll(".modal__close");
   const main = document.querySelector(".main");
   const footer = document.querySelector(".footer");
   const modals = document.querySelectorAll("._modal");
   const overlays = document.querySelectorAll("._overlay");
   const html = document.querySelector('html');
   const body = document.querySelector('body');

   const showClass = "_show";
   const blurClass = "_blur";
   const overflowHiddenClass = "_overflowHidden";

   const safelyRemoveClass = (el, cn) => {
      if (el) {
         el.classList.remove(cn);
      }
   };

   const safelyAddClass = (el, cn) => {
      if (el) {
         el.classList.add(cn);
      }
   };

   const applyBlur = () => {
      safelyAddClass(main, blurClass);
      safelyAddClass(footer, blurClass);
   };

   const removeBlur = () => {
      safelyRemoveClass(main, blurClass);
      safelyRemoveClass(footer, blurClass);
   };

   const removeAllModals = () => {
      modals.forEach(modal => safelyRemoveClass(modal, showClass));
      removeBlur();
      // safelyRemoveClass(html, overflowHiddenClass);
      safelyRemoveClass(body, overflowHiddenClass);
   };

   buttons.forEach(button => {
      button.addEventListener("click", () => {

         removeAllModals();

         const modalId = button.dataset.modal;

         const modal = document.querySelector(`[modal-id="${modalId}"]`);

         safelyAddClass(modal, showClass);

         if (modal && modal.classList.contains(showClass)) {
            applyBlur();
            // safelyAddClass(html, overflowHiddenClass);
            safelyAddClass(body, overflowHiddenClass);
         }
      });
   });

   closeButtons.forEach(button => {
      button.addEventListener("click", () => {
         removeAllModals();
      });
   });

   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
         removeAllModals();
      }
   });

   overlays.forEach(overlay => {
      overlay.addEventListener("click", (e) => {
         if (e.target === overlay) {
            removeAllModals();
         }
      });
   });
};
toggleModal();

const accordion = () => {
   const accordionBlocks = document.querySelectorAll('._accordion_block');
   const accordionButtons = document.querySelectorAll('._accordion_btn');
   const accordionContents = document.querySelectorAll('._accordion_hidden_content');

   const INIT_ITEM = 0;

   let activeBlockIndex = INIT_ITEM;

   const setInitialStyles = (content) => {
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.3s ease';
   };

   const calculateBlockHeight = (content) => {
      content.style.maxHeight = 'auto';
      const height = content.scrollHeight + 'px';
      return height;
   };

   const hideContent = (content) => {
      content.style.maxHeight = '0';
   };

   const showContent = (content, height) => {
      content.style.maxHeight = height;

   };

   const render = () => {
      accordionContents.forEach((content, index) => {
         const block = accordionBlocks[index];
         setInitialStyles(content);
         block.classList.remove('_active');

         if (index === activeBlockIndex) {
         const height = calculateBlockHeight(content);
         showContent(content, height);
         block.classList.add('_active');
         } else {
         hideContent(content);
         }
      });
   };

   const handleButtonClick = (index) => {
      return () => {
         activeBlockIndex = (activeBlockIndex === index) ? -1 : index;
         render();
      };
   };

   accordionButtons.forEach((button, index) => {
      button.addEventListener('click', handleButtonClick(index));
   });

   render();
};
accordion();

const handleFashionItemClick = () => {
   const selectors = {
      container: '.fashion__hidden_block',
      item: '.fashion__hidden_item',
      button: '.fashion__btn',
      info: '.fashion__hidden_info',
      activeClass: '_active',
      showClass: '_show',
   };

   const containers = document.querySelectorAll(selectors.container);

   if (!containers.length) {
      return;
   }

   const removeActiveStates = (container) => {
      container.querySelectorAll(`${selectors.button}.${selectors.activeClass}`)
         .forEach(btn => btn.classList.remove(selectors.activeClass));

      container.querySelectorAll(`${selectors.info}.${selectors.showClass}`)
         .forEach(info => info.classList.remove(selectors.showClass));
   };

   const toggleVisibility = (button, hiddenInfo, container) => {
      if (button.classList.contains(selectors.activeClass)) {
         button.classList.remove(selectors.activeClass);
         hiddenInfo.classList.remove(selectors.showClass);
      } else {
         removeActiveStates(container);
         button.classList.add(selectors.activeClass);
         hiddenInfo.classList.add(selectors.showClass);
      }
   };

   containers.forEach(container => {
      container.addEventListener('click', (e) => {
         const button = e.target.closest(selectors.button);
         if (!button) return;

         const fashionItem = button.closest(selectors.item);
         if (!fashionItem) return;

         const hiddenInfo = fashionItem.querySelector(selectors.info);
         if (!hiddenInfo) return;

         toggleVisibility(button, hiddenInfo, container);
      });
   });
};
handleFashionItemClick();

function makeButtonFollowCursor() {
   const sliderWraps = document.querySelectorAll('.main__slider_wrap');

   sliderWraps.forEach(sliderWrap => {
      const followButton = sliderWrap.querySelector('.main__showModal_btn[attr="hoveredPlus"]');

      if (!followButton) {
         return;
      }

      let isFollowing = false;

      function handleMove(event) {
         if (!isFollowing) return;

         let x, y;

         if (event.type === 'touchmove') {
         x = event.touches[0].clientX;
         y = event.touches[0].clientY;
         } else {
         x = event.clientX;
         y = event.clientY;
         }

         const rect = sliderWrap.getBoundingClientRect();
         const buttonWidth = followButton.offsetWidth;
         const buttonHeight = followButton.offsetHeight;

         const maxX = rect.right - buttonWidth / 2;
         const minX = rect.left + buttonWidth / 2;
         const maxY = rect.bottom - buttonHeight / 2;
         const minY = rect.top + buttonHeight / 2;

         const clampedX = Math.max(minX, Math.min(x, maxX));
         const clampedY = Math.max(minY, Math.min(y, maxY));

         followButton.style.left = (clampedX - rect.left - buttonWidth / 2) + 'px';
         followButton.style.top = (clampedY - rect.top - buttonHeight / 2) + 'px';
      }

      function handleMouseEnter() {
         isFollowing = true;
         followButton.style.opacity = 1;
      }

      function handleMouseLeave() {
         isFollowing = false;
         followButton.style.opacity = 0;
      }

      sliderWrap.addEventListener('mouseenter', handleMouseEnter);
      sliderWrap.addEventListener('mouseleave', handleMouseLeave);

      sliderWrap.addEventListener('mousemove', handleMove);
      sliderWrap.addEventListener('touchmove', handleMove);
      sliderWrap.addEventListener('touchstart', handleMouseEnter);
      sliderWrap.addEventListener('touchend', handleMouseLeave);
   });
}
makeButtonFollowCursor();

function handleCartButtonVisibility() {
   const cartButton = document.querySelector('.card__addCart_btn[attr="addCart"]');
   const sizeModal = document.querySelector('[modal-id="modal-plawkaSize"]');

   if (!cartButton || !sizeModal) return;

   let isInitialLoad = true;
   let lastScrollY = window.scrollY;

   const observer = new IntersectionObserver(
      (entries) => {
         entries.forEach((entry) => {
         if (isInitialLoad) {
            sizeModal.classList.remove('_show');
            isInitialLoad = false;
            return;
         }

         const isButtonNotVisible = !entry.isIntersecting;
         const currentScrollY = window.scrollY;
         const isScrollingDown = currentScrollY > lastScrollY;

         if (isButtonNotVisible && isScrollingDown) {
            sizeModal.classList.add('_show');
         } else {
            sizeModal.classList.remove('_show');
         }

         lastScrollY = window.scrollY;
         });
      },
      { threshold: 0 }
   );

   observer.observe(cartButton);
}

handleCartButtonVisibility();