let viewport = document.documentElement.clientWidth;
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
  subscriptionButton[0].click();
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
  headerButton.addEventListener('click', (evt)=> {
    evt.preventDefault();
    subscription.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  });
};

const addSlider = ()=> {
  let position = 0;

  const slidesToScroll = 1;
  let slidesToShow = 4;

  if (viewport < 1199) {
    slidesToShow = 2;
  }

  if (viewport < 768) {
    slidesToShow = 1;
  }

  const trainersWrapper = document.querySelector('.trainers__wrapper');
  const list = trainersWrapper.querySelector('.trainers__list');
  let gap = Number(window.getComputedStyle(list).gap.replace('px', ''));
  const items = list.querySelectorAll('.trainers__item');
  const sliderButton = document.querySelectorAll('.trainers__button');
  const buttonLeft = document.querySelector('.trainers__button--left');
  const buttonRight = document.querySelector('.trainers__button--right');
  const itemsCount = items.length;
  const itemWidth = (trainersWrapper.offsetWidth - ((slidesToShow - 1) * gap)) / slidesToShow;
  const movePosition = slidesToScroll * (itemWidth + gap);


  trainersWrapper.classList.add('trainers__wrapper--js');
  list.classList.add('trainers__list--js');
  sliderButton.forEach((element)=> {
    element.classList.remove('trainers__button--hidden');
  });

  items.forEach((element)=> {
    element.style.minWidth = `${itemWidth}px`;
  });

  buttonLeft.addEventListener('click', ()=> {
    position += movePosition;
    setPosition();
    checkButton();
  });

  buttonRight.addEventListener('click', ()=> {
    position -= movePosition;
    setPosition();
    checkButton();
  });

  const setPosition = ()=> {
    list.style.transform = `translateX(${position}px)`;
  };

  const checkButton = ()=> {
    buttonLeft.disabled = position === 0;
    buttonRight.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  };

  checkButton();
};

const addCarousel = ()=> {
  const reviewsWrapper = document.querySelector('.reviews__wrapper');
  const reviewsList = reviewsWrapper.querySelector('.reviews__list');
  const reviewsItems = reviewsList.querySelectorAll('.reviews__item');
};

window.addEventListener('DOMContentLoaded', ()=> {
  addTabs();
  addValid();
  addMask();
  addScroll();
  addSlider();
  window.addEventListener('resize', addSlider);
  addCarousel();
});
