import Game from './game';
import { addEvent } from './utils';

addEvent(document, 'DOMContentLoaded', () => {  
  window.requestAnimationFrame(() => {    
		new Game();
  });
});
