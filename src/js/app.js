let sideSwiper = null;
let mainSwiper = null;

const initSwiper = () => {
   const screenWidth = window.innerWidth;

   // Уничтожаем предыдущий sideSwiper, если он был
   if (sideSwiper) {
      sideSwiper.destroy(true, true);
      sideSwiper = null;
   }

   // Создаём новый sideSwiper
   if (screenWidth <= 600) {
      sideSwiper = new Swiper("._side-slider", {
         loop: true,
         direction: "horizontal",
         slidesPerView: 5,
         spaceBetween: 12,
         freeMode: false,
         centerMode: true,
         // slideToClickedSlide: true,
         watchSlidesProgress: true,
      });
   } else {
      sideSwiper = new Swiper("._side-slider", {
         loop: true,
         direction: "vertical",
         slidesPerView: 5,
         spaceBetween: 12,
         freeMode: false,
         // slideToClickedSlide: true,
         pagination: false,
         navigation: false,
         watchSlidesProgress: true,
      });
   }

   // Инициализируем mainSwiper ПОСЛЕ sideSwiper
   if (!mainSwiper) {
      mainSwiper = new Swiper("._main-slider", {
         loop: true,
         pagination: false,
         slidesPerView: 1,
         spaceBetween: 2,
         navigation: {
            nextEl: "._main-slider .main-swiper-button-next",
            prevEl: "._main-slider .main-swiper-button-prev",
         },
         thumbs: {
            swiper: sideSwiper,
         },
         on: {
            slideChange(s) {
               const realIndex = s.realIndex;
               if (sideSwiper && realIndex >= 0) {
                  sideSwiper.slideTo(realIndex);
               }
            },
         },
      });
   } else {
      // Обновляем thumbs, если mainSwiper уже существует
      mainSwiper.params.thumbs.swiper = sideSwiper;
      mainSwiper.thumbs.update();
   }
};

document.addEventListener("DOMContentLoaded", () => {
   initSwiper();
   window.addEventListener("resize", initSwiper);
});
// let sideSwiper = null;
// const initSwiper = () => {
//    const screenWidth = window.innerWidth;

//    if (screenWidth <= 600 && sideSwiper === null) {
//       sideSwiper = new Swiper("._side-slider", {
//          loop: false,
//          direction: "horizontal",
//          slidesPerView: 5,
//          spaceBetween: 12,
//          freeMode: false,
//          centerMode: true,
//          slideToClickedSlide: true,
//          watchSlidesProgress: true,
//          // on: {
//          //    slideChange(s) {
//          //       mainSwiper.slideTo(s.realIndex);
//          //    },
//          // },
//       });
//    } else if (screenWidth > 600) {
//       if (sideSwiper) {
//          sideSwiper.destroy(true, true);
//       }
//       sideSwiper = new Swiper("._side-slider", {
//          loop: true,
//          direction: "vertical",
//          slidesPerView: 5,
//          freeMode: false,
//          slideToClickedSlide: true,
//          pagination: false,
//          navigation: false,
//          watchSlidesProgress: true,

//          // on: {
//          //    slideChange(s) {
//          //       mainSwiper.slideTo(s.realIndex);
//          //    },
//          // },
//       });
//    }
// };

// document.addEventListener("DOMContentLoaded", () => {
//    initSwiper();
//    window.addEventListener("resize", initSwiper);
// });

// let mainSwiper;
// try {
//    mainSwiper = new Swiper("._main-slider", {
//       loop: true,
//       pagination: false,
//       slidesPerView: 1,
//       spaceBetween: 2,
//       navigation: {
//          nextEl: "._main-slider .main-swiper-button-next",
//          prevEl: "._main-slider .main-swiper-button-prev",
//       },
//       thumbs: {
//          swiper: sideSwiper,
//       },
//    });
// } catch (error) {
//    console.error("Error initializing Main Swiper:", error);
// }

let fashionSwiper;
try {
   fashionSwiper = new Swiper("._fashion-slider", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 11,
      centerMode: false,
      navigation: true,
      keyboard: true,
      mousewheel: true,
      // slideToClickedSlide: true,
      navigation: {
         nextEl: ".fashion__arrow_wrap .swiper-button-next",
         prevEl: ".fashion__arrow_wrap .swiper-button-prev",
      },
      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },
      mousewheel: {
         forceToAxis: true,
      },
      breakpoints: {
         768: {
            spaceBetween: 20,
         },
      },
   });
} catch (error) {
   console.error("Error initializing Fashion Swiper:", error);
}

let fullscreenImages;
try {
   fullscreenImages = new Swiper("._fullscreen-slider", {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 2,
      navigation: false,
      pagination: {
         el: ".swiper-pagination",
         clickable: true,
         bulletActiveClass: "swiper-pagination-bullet-active",
      },
      allowSlidePrev: true,
      allowSlideNext: true,
      grabCursor: true,
      simulateTouch: true,
      breakpoints: {
         600: {
            pagination: {
               enabled: false,
            },
         },
         0: {
            pagination: {
               enabled: true,
            },
         },
      },
   });
} catch (error) {
   console.error("Error initializing Main Swiper:", error);
}

let fullImageSwiper;
try {
   fullImageSwiper = new Swiper("._fullImage-slider", {
      loop: true,
      slidesPerView: 1,
      navigation: {
         nextEl: "._fullImage-slider .__next",
         prevEl: "._fullImage-slider .__prev",
      },
      pagination: {
         el: ".swiper-pagination._fullImage-pagination",
         type: "fraction",
      },
   });
} catch (error) {
   console.error("Error initializing Main Swiper:", error);
}

let sideModalSwiper;
try {
   sideModalSwiper = new Swiper("._sideModal-slider", {
      loop: true,
      direction: "vertical",
      slidesPerView: 5,
      pagination: false,
      navigation: false,
      // centeredSlides: true,
      slideToClickedSlide: true,
   });
} catch (error) {
   console.error("Error initializing Side Swiper:", error);
}

const showBonusDescription = () => {
   document
      .querySelectorAll(".card__bonus_description_btn")
      .forEach((button) => {
         button.addEventListener("click", () => {
            const modalId = button.dataset.popup;
            const modal = document.querySelector(
               `.hidden__bonus_description[popup-id="${modalId}"]`
            );

            if (modal) {
               modal.classList.toggle("_show");
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
   // const html = document.querySelector('html');
   const body = document.querySelector("body");

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
      modals.forEach((modal) => safelyRemoveClass(modal, showClass));
      removeBlur();
      // safelyRemoveClass(html, overflowHiddenClass);
      safelyRemoveClass(body, overflowHiddenClass);
   };

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         removeAllModals();

         const modalId = button.dataset.modal;

         const modal = document.querySelector(`[modal-id="${modalId}"]`);
         if (button.closest(".swiper-slide")) {
            let activeSlideIndex = button
               .closest(".swiper-slide")
               .getAttribute("data-swiper-slide-index");
            fullscreenImages.slideTo(activeSlideIndex);
         }

         safelyAddClass(modal, showClass);

         if (modal && modal.classList.contains(showClass)) {
            applyBlur();
            // safelyAddClass(html, overflowHiddenClass);
            safelyAddClass(body, overflowHiddenClass);
         }
      });
   });

   closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
         removeAllModals();
      });
   });

   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
         removeAllModals();
      }
   });

   overlays.forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
         if (e.target === overlay) {
            removeAllModals();
         }
      });
   });

   const handleSmallScreenModal = () => {
      const sliderWrap = document.querySelector(
         ".main__slider_wrap[data-modal='modal-fullscreenSliderImage']"
      );
      const modal = document.querySelector(
         "[modal-id='modal-fullscreenSliderImage']"
      );

      if (!sliderWrap || !modal) return;

      const addModalClasses = () => {
         safelyAddClass(modal, showClass);
         applyBlur();
         safelyAddClass(body, overflowHiddenClass);
      };

      const removeModalClasses = () => {
         safelyRemoveClass(modal, showClass);
         removeBlur();
         safelyRemoveClass(body, overflowHiddenClass);
      };

      if (window.innerWidth <= 600) {
         sliderWrap.addEventListener("click", () => {
            removeAllModals();
         });
      } else {
         sliderWrap.removeEventListener("click", () => {});

         removeModalClasses();
      }
   };

   handleSmallScreenModal();
   window.addEventListener("resize", handleSmallScreenModal);
};

toggleModal();

const accordion = () => {
   const accordionBlocks = document.querySelectorAll("._accordion_block");
   const accordionButtons = document.querySelectorAll("._accordion_btn");
   const accordionContents = document.querySelectorAll(
      "._accordion_hidden_content"
   );

   const INIT_ITEM = 0;

   let activeBlockIndex = INIT_ITEM;

   const setInitialStyles = (content) => {
      content.style.maxHeight = "0";
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.3s ease";
   };

   const calculateBlockHeight = (content) => {
      content.style.maxHeight = "auto";
      const height = content.scrollHeight + "px";
      return height;
   };

   const hideContent = (content) => {
      content.style.maxHeight = "0";
   };

   const showContent = (content, height) => {
      content.style.maxHeight = height;
   };

   const render = () => {
      accordionContents.forEach((content, index) => {
         const block = accordionBlocks[index];
         setInitialStyles(content);
         block.classList.remove("_active");

         if (index === activeBlockIndex) {
            const height = calculateBlockHeight(content);
            showContent(content, height);
            block.classList.add("_active");
         } else {
            hideContent(content);
         }
      });
   };

   const handleButtonClick = (index) => {
      return () => {
         activeBlockIndex = activeBlockIndex === index ? -1 : index;
         render();
      };
   };

   accordionButtons.forEach((button, index) => {
      button.addEventListener("click", handleButtonClick(index));
   });

   render();
};
accordion();

const handleFashionItemClick = () => {
   const selectors = {
      container: ".fashion__hidden_block",
      item: ".fashion__hidden_item",
      button: ".fashion__btn",
      info: ".fashion__hidden_info",
      activeClass: "_active",
      showClass: "_show",
   };

   const containers = document.querySelectorAll(selectors.container);

   if (!containers.length) {
      return;
   }

   const removeActiveStates = (container) => {
      container
         .querySelectorAll(`${selectors.button}.${selectors.activeClass}`)
         .forEach((btn) => btn.classList.remove(selectors.activeClass));

      container
         .querySelectorAll(`${selectors.info}.${selectors.showClass}`)
         .forEach((info) => info.classList.remove(selectors.showClass));
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

   containers.forEach((container) => {
      let containerWidth = container.clientWidth;

      let containerItems = container.querySelectorAll(selectors.item);
      containerItems.forEach((item) => {
         // Координаты элемента относительно viewport
         let itemRect = item.getBoundingClientRect();
         // Координаты контейнера относительно viewport
         let containerRect = container.getBoundingClientRect();

         // Вычисляем позицию элемента относительно контейнера
         let itemLeftRelativeToContainer = itemRect.left - containerRect.left;
         // let itemTopRelativeToContainer = itemRect.top - containerRect.top;
         let info = item.querySelector(".fashion__hidden_wrap");
         info.style.minWidth = "unset";
         info.style.width = "max-content";
         if (itemLeftRelativeToContainer < containerWidth / 2) {
            item.classList.add("left");
            info.style.maxWidth =
               containerWidth - itemLeftRelativeToContainer - 10 + "px";
         } else {
            item.classList.add("right");
            info.style.maxWidth = itemLeftRelativeToContainer - 10 + "px";
         }
      });
      container.addEventListener("click", (e) => {
         const button = e.target.closest(selectors.button);
         if (!button) return;

         const fashionItem = button.closest(selectors.item);
         if (!fashionItem) return;

         const hiddenInfo = fashionItem.querySelector(selectors.info);
         if (!hiddenInfo) return;

         toggleVisibility(button, hiddenInfo, container);
      });
   });

   document.addEventListener("click", (e) => {
      containers.forEach((container) => {
         const isClickInsideContainer = container.contains(e.target);
         const isClickInsideInfo = e.target.closest(selectors.info);

         if (!isClickInsideContainer && !isClickInsideInfo) {
            removeActiveStates(container);
         }
      });
   });
};
handleFashionItemClick();

function makeButtonFollowCursor() {
   const sliderWraps = document.querySelectorAll(".main__slider_wrap");

   sliderWraps.forEach((sliderWrap) => {
      const followButton = sliderWrap.querySelector(
         '.main__showModal_btn[attr="hoveredPlus"]'
      );

      if (!followButton) {
         return;
      }

      let isFollowing = false;

      function handleMove(event) {
         if (!isFollowing) return;

         let x, y;

         if (event.type === "touchmove") {
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

         followButton.style.left =
            clampedX - rect.left - buttonWidth / 2 + "px";
         followButton.style.top = clampedY - rect.top - buttonHeight / 2 + "px";
      }

      function handleMouseEnter() {
         isFollowing = true;
         followButton.style.opacity = 1;
      }

      function handleMouseLeave() {
         isFollowing = false;
         followButton.style.opacity = 0;
      }

      sliderWrap.addEventListener("mouseenter", handleMouseEnter);
      sliderWrap.addEventListener("mouseleave", handleMouseLeave);

      sliderWrap.addEventListener("mousemove", handleMove);
      sliderWrap.addEventListener("touchmove", handleMove);
      sliderWrap.addEventListener("touchstart", handleMouseEnter);
      sliderWrap.addEventListener("touchend", handleMouseLeave);
   });
}
makeButtonFollowCursor();

function handleCartButtonVisibility() {
   const cartButton = document.querySelector(
      '.card__addCart_btn[attr="addCart"]'
   );
   const sizeModal = document.querySelector('[modal-id="modal-plawkaSize"]');

   if (!cartButton || !sizeModal) {
      return;
   }

   sizeModal.classList.remove("_show");

   function isInInitialPosition() {
      const buttonRect = cartButton.getBoundingClientRect();
      return buttonRect.top > 0;
   }

   const observer = new IntersectionObserver(
      (entries) => {
         entries.forEach((entry) => {
            const isIntersecting = entry.isIntersecting;
            const inInitialPosition = isInInitialPosition();

            // console.log("isIntersecting:", isIntersecting);
            // console.log("isInInitialPosition:", inInitialPosition);

            if (!isIntersecting && !inInitialPosition) {
               sizeModal.classList.add("_show");
               // console.log("Adding _show class");
            } else {
               sizeModal.classList.remove("_show");
               // console.log("Removing _show class");
            }
         });
      },
      {
         threshold: 0,
      }
   );

   observer.observe(cartButton);
}

handleCartButtonVisibility();
