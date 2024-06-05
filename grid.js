import config from './config.json' with { type: 'json' };
import Cell from './cell';
import { getElement, appendElement } from './utils';

export default class Grid {
  constructor(id = 'grid', rows = null, cols = null, borderOn = null) {
    this.fieldId = id;
    this.rows = rows || config.gridSize.rows;
    this.cols = cols || config.gridSize.cols;
    this.field = getElement(this.fieldId);
		this.setBorder(borderOn !== null ? borderOn : config.gridBorder);
    this.render();
  }

	render = () => {
		for (let row = 0; row < this.rows; row++) {			
			let $row = appendElement(this.field, 'tr', {cls: row});
			for (let col = 0; col < this.cols; col++) {
				appendElement($row, 'td', {id: col});
			}
		}
	}

  clearFullRows = () => {
		let drops = 0;

		for (let row = 21; row >= 0; row--) {
			let rowIsFull = true;

			for (let col = 0; col < 10; col++) {
				let cell = new Cell(row, col);

				if (cell.isBlank()) rowIsFull = false;

				if (drops > 0) {
          let newRow = row + drops;
					this.setCellColor(cell.color, {row: newRow, col: col})
				}
			}

			if(rowIsFull) drops++;
		}

		return drops;
	}

  setCellColor = (color, {row, col}) => {
		var cell = new Cell(row, col);
		cell.setColor(color);
	}

	toggleBorder() {
		this.setBorder(!this.borderOn);
	}

	setBorder(on) {
		this.borderOn = !!on;

		if (this.borderOn) {
			this.field.classList.add('border-on');
			this.field.classList.remove('border-off');
		} else{
			this.field.classList.add('border-off');
			this.field.classList.remove('border-on');
		}
	}
} // class Grid