import { getElement, getElementByClass } from './utils';

export default class Message {
  constructor(message, type = 'game-over') {
    this.message = message;
    this.type = type;
  }

  render = () => {
    var $message = getElementByClass('game-message');
    var $button =  getElement('message-button');

    $message.classList.add(this.type);
    $message.getElementsByTagName('p')[0].textContent = this.message;

    $button.classList.add(this.type);
  }
} // class Message
