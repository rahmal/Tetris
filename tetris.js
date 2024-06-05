import Grid from './grid';
import Message from './message';
import Row from './row';
import Shape from './shape';
import { getElementByClass, appendElement, addEvent } from './utils';

const Direction = Object.freeze({
	Left:  37,
	Up:    38,
	Right: 39,
	Down:  40
});

const Score = Object.freeze({
	Move:   1,
	Rotate: 2,
	Drop:   3,
	Fill:   10
});

export default class Tetris {
  constructor() {
		this.gravity      = null;
		this.gameOver     = false;
		this.score        =  0;
		this.level  		  =  1;
		this.topCheck		  =  0;
		this.grid         = new Grid();
		this.currentShape = new Shape();
		this.startGame();
   }

	startGame = () => {
		addEvent(document, 'keydown', this.execKeyCommand);
		getElementByClass('retry-button').click(this.resetGame);
		this.gravity = setInterval(this.refreshState, 500);
	}

	refreshState = () => {
		var stopped = this.currentShape.drop();
		if (stopped) {
			this.clearRows();
			this.spawn();
		}
		this.checkGameOver();
	}

	resetGame = (e) => {
		e.preventDefault();
		location.reload();
	}

	updateScore = (score) => {
		this.score += score;

		let scoreCard = getElementByClass('score-container');
		scoreCard.textContent = this.score;
		
		let changeCard = appendElement(scoreCard, 'div', {cls: 'score-addition'});
		changeCard.textContent = '+' + score;		
	}

	clearRows = () => {
		let rowsCleared = this.grid.clearFullRows();		
		this.updateScore(Score.Fill * rowsCleared);		
	}
	
	spawn = () => {
		this.currentShape = new Shape();
	}

	checkGameOver = () => {		
		let topRow = new Row(0);

		if (topRow.containsShape()) {			
			this.topCheck++;
		} else {
			this.topCheck = 0;
		}

		if (this.topCheck > 1) {
			this.gameOver = true;
			this.topCheck = 0;
		}

		if (this.gameOver) {			
			(new Message('Game over!')).render();		
			clearInterval(this.gravity);			
		}
	}

	execKeyCommand = (e) => {
		e.preventDefault();
		switch(e.keyCode) {
			case Direction.Left:
				this.currentShape.move('left');
				this.updateScore(Score.Move);
				break;
			case Direction.Up:
				this.currentShape.rotate();
				this.updateScore(Score.Rotate);
				break;
			case Direction.Right:
				this.currentShape.move('right');
				this.updateScore(Score.Move);
				break;
			case Direction.Down:
				this.currentShape.drop(3);
				this.updateScore(Score.Drop);
				break;
		}
	}

} // class Tetris

addEvent(document, 'DOMContentLoaded', () => {
  // Wait till the browser is ready to render the game (avoids glitches)
  window.requestAnimationFrame(() => {
		let tetris = new Tetris();
  });
});
