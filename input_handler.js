import Hammer from './hammer';
import { getElementByClass, addEvent } from './utils';

const KeyMap = Object.freeze({
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
  37: 3, // Left
  75: 0, // vim keybindings
  76: 1,
  74: 2,
  72: 3
});

const SpaceBar = 32;
const Escape   = 27;

export default class InputHandler {
  constructor() {
    this.events = {};
    this.listen();
  }

  on = (event, callback) => {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  };

  emit = (event, data) => {
    let callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  };

  listen = () => {
    let self = this;

    // Listen for key events
    addEvent(document, 'keydown', (event) => {
      let keyPressed = event.which;
      let modifiers  = self.metaKeys(event);
      let direction  = KeyMap[keyPressed];

      if (!modifiers) {
        event.preventDefault();
        
        if (direction !== undefined) {
          self.emit('move', direction);
        } else {
          if (keyPressed === SpaceBar) self.emit('pause');
          if (keyPressed === Escape) self.emit('restart');
        }
      }
    });

    // Listen for swipe events
    self.swipeHandler().on('swipe', (event) => {
      event.gesture.preventDefault();
      direction = self.swipeGestures().indexOf(event.gesture.direction);
      if (direction !== -1) self.emit('move', direction);
    });

    // Listen for button events
    addEvent('retry-button', 'click', (event) => {
      event.preventDefault();
      this.emit('restart');
    });
  };

  swipeHandler = () => {    
    return Hammer(getElementByClass('game-container'), {drag_block_horizontal: true, drag_block_vertical: true});
  };

  swipeGestures = () => {
    return [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT];
  };

  metaKeys = (event) => {
    return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  };

} // class InputHandler
