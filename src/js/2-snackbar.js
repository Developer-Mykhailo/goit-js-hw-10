import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//---------------------------------------------------------------

//---------------------------------------------------------------

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const isActive = event.target.elements.state.value;

  getResult(delay, isActive)
    .then(() => {
      iziToast.show({
        message: `✅  Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'RGBA(51, 198, 130, 0.9)',
        messageColor: 'white',
        icon: null,
        progressBar: false,
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌  Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'RGBA(254, 85, 73, 0.9)',
        messageColor: 'white',
        icon: null,
        progressBar: false,
      });
    });
}

function getResult(delay, isActive) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isActive === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  return promise;
}
