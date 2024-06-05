import { getElementByClass } from './utils';

import Cell from './cell';

export default class Row {
  constructor(index) {
    this.index   = index;
    this.elem    = this.getElem();
    this.cells   = this.getCells();
  }

  isFull = () => {
    return !this.anyCell(cell => cell.isBlank());
  }

	isBlank = () => {		
  	return !this.isFull();
	}

  containsShape = () => {
    return this.anyCell(cell => cell.isFilled());
  }

  anyCell = (callback) => {
    return this.cells.some(cell => {
      if (callback(cell)) return true;
      return false;
    });
  }

  forEachCell = (callback) => {
    this.cells.forEach(cell => callback(cell));
  }

  getElem = () => {
    return getElementByClass(this.index);
  }

  getCells = () => {
    var cells = [];
    for(var col=0;col<10;col++){			
      var cell = new Cell(this.index, col);
      cells.push(cell);
    }
    return cells;
  }

} // class Row
