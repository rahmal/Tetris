import Hammer from './hammer';
import { getElementByClass, addEvent } from './utils';
import { KeyMap, SpaceBar, Escape } from './constants';
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
      callbacks.forEach((callback) => {
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

    // Listen for button events
    addEvent('retry-button', 'click', (event) => {
      event.preventDefault();
      this.emit('restart');
    });

    // Listen for swipe events
    self.swipeHandler().on('swipe', (event) => {
      event.gesture.preventDefault();
      direction = self.swipeGestures().indexOf(event.gesture.direction);
      if (direction !== -1) self.emit('move', direction);
    });
  };

  swipeHandler = () => {    
    return Hammer(getElementByClass('game-container'), {drag_block_horizontal: true, drag_block_vertical: true});
  };

  swipeGestures = () => {
    return [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT];
  };

  metaKeys = (event) => {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
  };

} // class InputHandler
