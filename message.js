import { getElement, getElementByClass } from './utils';

export default class Message {
  constructor(message, btnLabel = 'New Game', type = 'game-over') {
    this.messageText = message;
    this.buttonText  = btnLabel;
    this.type        = type;
    this.message     = getElement('game-message');
    this.button      = getElement('message-button');
    this.content     = this.message.getElementsByTagName('p')[0];

    this.render();
  }

  render = () => {    
    this.message.classList.add(this.type);
    this.button.classList.add(this.type);

    this.content.textContent = this.messageText;
    this.button.textContent = this.buttonText;
  }

  remove = () => {
    this.message.classList.remove(this.type);
    this.button.classList.remove(this.type);
  }

  reset = () => {
    this.remove('game-won', 'game-over');
    this.render();
  }
} // class Message
