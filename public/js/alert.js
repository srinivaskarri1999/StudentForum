/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector('.alertbg');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (msg) => {
  hideAlert();
  const markup = `<div class="alertbg"><p class="alertpara">${msg}</p></div>`;
  document.querySelector('.alert').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 7000);
};
