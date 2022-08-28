import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea[name="message"]'),
  email: document.querySelector('input[name="email"]'),
};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
let feedbackformData = {};
populateTextarea();

function onFormInput(evt) {
  feedbackformData[evt.target.name] = evt.target.value;
  const storageData = JSON.stringify(feedbackformData);
  localStorage.setItem(STORAGE_KEY, storageData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackformData);
  return (feedbackformData = {});
}

function populateTextarea() {
  const savedStoragedata = localStorage.getItem(STORAGE_KEY);
  if (savedStoragedata) {
    feedbackformData = JSON.parse(savedStoragedata);
    if (feedbackformData.email) {
      refs.email.value = feedbackformData.email;
    }
    if (feedbackformData.message) {
      refs.textarea.value = feedbackformData.message;
    }
  }
}
