const form = document.querySelector('.form');
const input = document.querySelector('#input');
let someData;

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  someData = input.value;
  sessionStorage.setItem('key', input.value);
  window.location.href = 'other.html';
});