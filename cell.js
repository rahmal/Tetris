import { getElementByClass } from './utils';

export default class Cell {
  constructor(row, col, color = '') {
    this.row     = row;
    this.col     = col;
    this.color   = color || '';
    this.elem    = this.getElem();
    this.invalid = this.isUndef();
  }

	isBlank = () => {		
		this.fetchColor();
		return this.color === '';
	}

	isFilled = () => {
		return !this.isBlank();
	}

  getRow = () => {
		return getElementByClass(this.row);
	}

  getElem = () => {
		return this.getRow()?.children[this.col];
	}

	getColor = () => {
		return this.elem?.getAttribute('bgcolor') || '';
	}

	setColor = (color) => {
    this.color = color;
		this.elem?.setAttribute('bgcolor', color);
	}

	fetchColor = () => {
		this.setColor(this.getColor());	
	}

  clear = () => {
    this.setColor('');
  }

	isUndef = () => {    
		if(this.row < 0 || this.col < 0) return true;
		if(this.row > 21 || this.col > 9) return true;		
		if(this.elem === undefined || this.elem === null) return true;		
		return false;
	}
} // class Cell