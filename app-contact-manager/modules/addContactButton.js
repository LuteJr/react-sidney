import { render } from './addContact';
import { clearMessages } from './notificationBar';
import tazz from './stage.js';

const addContactButton = document.querySelector('.add-contact-button');

addContactButton.addEventListener('click', () => {
  alert('add contact tbd');
});

addContactButton = document.querySelector('.add-contact.js');
addContactButton.addEventListener('click', (event) => {
  clearMessages();
  tazz.innerHTML = '';

  tazz.append(render());
});

export default addContactButton;
