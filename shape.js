import config from './config.json' with { type: 'json' };
import Cell from './cell';

export default class Shape {
  constructor(type = null, color = null) {
    this.type   = type || this.randomShape();
    this.color  = color || this.randomColor();
    this.origin = {row: config.shapeOrigin.row, col: config.shapeOrigin.col};
    this.coords = this.getCoords();
    this.riseIfBadSpawn();
    this.render();
  }

  render = () => {
    this.clear();
    this.forEachCell(cell => cell.setColor(this.color));
	}

  clear = () => {
    this.forEachCell(cell => cell.clear());
  }

  update = (shape = null) => {    
    if (shape) this.type = shape;    
    this.coords = this.getCoords();
  }

  move = (direction, drops = 1) => {
    switch (direction) {
      case 'up':
        this.rotate();
        break;
      case 'down':
        return this.drop(drops);               
      case 'left':
      case 'right':
        this.clear();

        if(direction === 'right'){
          this.origin.col++;
        } else if (direction === 'left'){
          this.origin.col--;
        }

        this.update();        
        var reverse = this.ifReverse();

        if (reverse) {      
          if(direction === 'right'){
            this.origin.col--;
          } else if (direction === 'left'){
            this.origin.col++;
          }
          this.update();
        }

        this.render();
    }
	}

	rotate = () => {
		var prev = this.type;
    var next = config.shapeRotations[prev];

    this.clear();
    this.update(next);

    if(this.ifReverse()){
      this.update(prev);
    }
		
		this.render();
	}

	drop = (drops = 1) => {
		for (var d=drops; d>0;d--) {
			this.clear();

      this.shiftDown();
			// this.origin.row++;
      // this.forEachCoord(coord => coord.row++);
      // this.update();

      var reverse = this.ifReverse();

			if (reverse) {
        this.shiftUp();
        // this.origin.row--;
        // this.forEachCoord(coord => coord.row--);
			  // this.update();
			}

      this.render();

      return reverse;
		}
	}

	getCoords = () => {
		var coords = [];
    var origin = this.origin;
		var offsets = this.getRotationOffsets(this.type);

		offsets.row.forEach((rowOffset, i) => {
			var colOffset = offsets.col[i];
			var coord = {row: (origin.row + rowOffset), col: (origin.col + colOffset)};
			coords.push(coord);
		});

		return coords;
	}

	getRotationOffsets = (shape) => {
		var rotate = shape.substring(1);
		shape = shape.charAt(0);
		if (rotate === '') rotate = '0';
		return config.shapeRotationOffsets[shape][rotate];
	}
  
  riseIfBadSpawn = () => {
    if (this.ifReverse()) { this.shiftUp(); }
    if (this.ifReverse()) { this.shiftUp(); }
  }

  shiftUp = () => {
    this.origin.row--;
    this.forEachCoord(coord => coord.row--);
    this.update();
  }

  shiftDown = () => {
    this.origin.row++;
    this.forEachCoord(coord => coord.row++);
    this.update();
  }

  ifReverse = () => {
    var reverse = false;
    this.forEachCell(cell => {
      var color = cell.getColor();
      if (cell.invalid || color !== '') {
        reverse = true;
      }
    });    
		return reverse;
	}

  forEachCoord = (callback) => {
    this.coords.forEach(coord => {      
      callback(coord);
    });
  }

  forEachCell = (callback) => {
    this.coords.forEach(coord => {
      var cell = new Cell(coord.row, coord.col);
      callback(cell);
    });
  }

  hasInvalidCells = (coords = this.coords) => {
    return coords.some(coord => {      
      var cell = new Cell(coord.row, coord.col);
      var color = cell.getColor();
      console.log('COLOR', color);
      if (cell.invalid || (color !== null && color !== '')) { return true; }
      return false;     
    });
  }

	randomColor = () => {
		return config.colorsList[this.randomize()];
	}
	randomShape = () => {
		return config.shapesList[this.randomize()];
	}
	
	randomize = (max = 7) => {
		return Math.floor(Math.random()*max);
	}
} // class Shape