
import './vendor/swiper';
import Swiper, {Navigation, Pagination} from 'swiper';
// import 'swiper/css/bundle';


const subscriptionButton = document.querySelectorAll('.subscription__button');
const subscriptionList = document.querySelectorAll('.subscription__price-list');
const form = document.querySelector('.free-lesson__form');
const headerButton = document.querySelector('.header__button');
const subscription = document.querySelector('.subscription');

const addTabs = ()=> {
  subscriptionButton.forEach((element)=> {
    element.addEventListener('click', (evt)=> {
      evt.preventDefault();
      const id = element.getAttribute('href').replace('#', '');
      const subscriptionListId = document.getElementById(id);
      subscriptionButton.forEach((item)=> {
        item.classList.remove('subscription__button--active');
      });
      subscriptionList.forEach((item)=> {
        item.classList.remove('subscription__price-list--active');
      });
      element.classList.add('subscription__button--active');
      subscriptionListId.classList.add('subscription__price-list--active');
    });
  });

  if (subscriptionButton[0]) {
    subscriptionButton[0].click();
  }

};

const addMask = () => {

  let eventCalllback = function (e) {
    let el = e.target;
    let clearVal = el.dataset.phoneClear;
    let pattern = el.dataset.phonePattern;
    let matrixDef = '+7(___) ___-__-__';
    let matrix = pattern ? pattern : matrixDef;
    let i = 0;
    let def = matrix.replace(/\D/g, '');
    let val = e.target.value.replace(/\D/g, '');
    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        return;
      }
    }
    if (def.length >= val.length) {
      val = def;
    }
    e.target.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }
    });
  };
  if (form) {
    let phoneInputs = form.querySelectorAll('input[name="tel"]');
    for (let elem of phoneInputs) {
      for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
      }
    }
  }

};

const addValid = ()=> {
  if (form) {
    const input = form.querySelectorAll('form input');
    let isValidateName;
    let isValidateTel;
    let valid;

    const validateElement = (element) => {
      if (element.name === 'name') {
        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          isValidateName = false;
        } else if (/^([А-Я][а-яё-]|[A-Z][a-z-])$/gm.test(element.value)) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else if (element.value.length > 20) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else if (/[_\d]/.test(element.value)) {
          element.nextElementSibling.textContent = 'Не валидное имя';
          isValidateName = false;
        } else {
          element.nextElementSibling.textContent = '';
          isValidateName = true;
        }
      }
      if (element.name === 'tel') {
        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          isValidateTel = false;
        } else if (element.value.replaceAll(/\D/g, '').length < 11) {
          element.nextElementSibling.textContent = 'Введите полный номер';
          isValidateTel = false;
        } else {
          element.nextElementSibling.textContent = '';
          isValidateTel = true;
        }
      }
    };

    input.forEach((element) => {
      ['blur', 'input', 'focus'].forEach((elem)=> {
        element.addEventListener(elem, () => {
          validateElement(element);
        });
      });
    });

    form.addEventListener('submit', (evt) => {

      input.forEach((element)=> {

        if (element.value === '') {
          element.nextElementSibling.textContent = 'Заполните поле';
          valid = false;
        } else {
          element.nextElementSibling.textContent = '';
          valid = true;
        }

      });

      if (valid && isValidateName && isValidateTel) {
        form.submit();
        form.querySelector('.free-lesson__message').textContent =
              'Форма отправлена успешно';
      } else {
        evt.preventDefault();
        input.forEach((element) => {
          validateElement(element);
        });
      }
    });
  }
};

const addScroll = ()=> {

  if (headerButton) {
    headerButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      subscription.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    });
  }

};

const addSlider = ()=> {
  const trainersWrapper = document.querySelector('.trainers__wrapper');
  if (trainersWrapper) {

    const list = trainersWrapper.querySelector('.trainers__list');
    const items = list.querySelectorAll('.trainers__item');
    const sliderButton = document.querySelectorAll('.trainers__button');
    const buttonLeft = document.querySelector('.trainers__button--left');
    const buttonRight = document.querySelector('.trainers__button--right');

    trainersWrapper.classList.add('swiper-container');
    list.classList.add('swiper-wrapper');
    list.classList.remove('trainers__list--display');
    items.forEach((element)=> {
      element.classList.add('swiper-slide');
    });
    sliderButton.forEach((element)=> {
      element.classList.remove('trainers__button--hidden');
    });
    buttonLeft.classList.add('swiper-button-prev');
    buttonRight.classList.add('swiper-button-next');

    // eslint-disable-next-line
    const swiper = new Swiper('.trainers__wrapper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.trainers__button--right',
        prevEl: '.trainers__button--left',
      },

      slidesPerView: 4,

      loop: true,

      spaceBetween: 40,

      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1199: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }
};


const addCarousel = ()=> {

  const reviewsWrapper = document.querySelector('.reviews__wrapper');

  if (reviewsWrapper) {
    const reviewsList = reviewsWrapper.querySelector('.reviews__list');
    const reviewsItems = reviewsList.querySelectorAll('.reviews__item');
    const sliderButton = document.querySelectorAll('.reviews__button');
    const buttonLeft = reviewsWrapper.querySelector('.reviews__button--left');
    const buttonRight = reviewsWrapper.querySelector('.reviews__button--right');

    sliderButton.forEach((element)=> {
      element.classList.remove('reviews__button--hidden');
    });

    reviewsWrapper.classList.add('swiper-container');
    reviewsList.classList.add('swiper-wrapper');
    reviewsList.classList.remove('reviews__list--display');
    reviewsItems.forEach((element)=> {
      element.classList.add('swiper-slide');
    });
    buttonLeft.classList.add('swiper-button-prev');

    buttonRight.classList.add('swiper-button-next');

    // eslint-disable-next-line
    const swiper = new Swiper('.reviews__wrapper', {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: '.reviews__button--right',
        prevEl: '.reviews__button--left',
      },

      slidesPerView: 1,

      autoHeight: true,

      spaceBetween: 30,

    });
  }

};

const addVideo = ()=> {
  const videoButton = document.querySelector('.gym__play-button');
  const videoImageOverlay = document.querySelector('.gym__image-overlay');
  const videoOverlay = document.querySelector('.gym__vidio-overlay');

  const playVidio = (evt)=> {
    evt.preventDefault();
    videoButton.remove();
    videoImageOverlay.remove();
    videoOverlay.remove();

    document.querySelector('.gym__frame').src = document.querySelector('.gym__frame').src + '?autoplay=1';

  };

  if (videoButton) {
    videoButton.addEventListener('click', playVidio);

    videoButton.addEventListener('keydown', playVidio);
  }
};

window.addEventListener('DOMContentLoaded', ()=> {
  addTabs();
  addValid();
  addMask();
  addScroll();
  addSlider();
  addCarousel();
  addVideo();
});
