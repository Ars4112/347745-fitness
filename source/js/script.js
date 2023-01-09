const subscriptionButton = document.querySelectorAll('.subscription__button');
const subscriptionList = document.querySelectorAll('.subscription__price-list');

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

window.addEventListener('DOMContentLoaded', ()=> {
  addTabs();
});
