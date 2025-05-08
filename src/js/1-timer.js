import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateFromInput = document.querySelector('[type="text"]');
const btnStart = document.querySelector('[data-start]');
const showDays = document.querySelector('[data-days]');
const showHours = document.querySelector('[data-hours]');
const showMinutes = document.querySelector('[data-minutes]');
const showSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'center',
        closeOnClick: true,
        progressBar: false,
      });

      return;
    }
    btnStart.disabled = false;
  },
};

const fp = flatpickr(dateFromInput, options);

btnStart.addEventListener('click', launch);

//---------------------------------------------------------------

function launch() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;

    if (diff < 1) {
      clearInterval(intervalId); //stop timer
      dateFromInput.disabled = false;
      return;
    }

    const convertedTime = convertMs(diff);
    tick(convertedTime);

    dateFromInput.disabled = true;
  }, 1000);

  const tick = ({ days, hours, minutes, seconds }) => {
    btnStart.disabled = true;

    showDays.textContent = addPad(days);
    showHours.textContent = addPad(hours);
    showMinutes.textContent = addPad(minutes);
    showSeconds.textContent = addPad(seconds);
  };
}

//---------------------------------------------------------------

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPad(value) {
  return String(value).padStart(2, '0');
}
