import Grid from './grid';
import InputHandler from "./input_handler";
import Message from './message';
import Row from './row';
import Shape from './shape';
import { getElementByClass, appendElement, addEvent } from './utils';

const Direction = Object.freeze({
	Up:    0,
	Right: 1,
	Down:  2,
	Left:  3
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
		this.paused       = false;
		this.score        =  0;
		this.level  		  =  1;
		this.topCheck		  =  0;
		this.grid         = new Grid();
		this.currentShape = new Shape();
		this.inputHandler = new InputHandler();
    
		this.inputHandler.on('move',    this.moveShape.bind(this));
    this.inputHandler.on('restart', this.resetGame.bind(this));
		this.inputHandler.on('pause',   this.pauseGame.bind(this));

		this.startGame();
   }

	startGame = () => {
		this.gravity = setInterval(this.refreshState, 500);
	}

	pauseGame = () => {
		if (this.paused) {
			this.startGame();
			this.paused = false;
			(new Message('Paused')).remove();
		} else {
			clearInterval(this.gravity);
			this.paused = true;
			new Message('Paused', 'Resume');
		}
	}

	refreshState = () => {
		var stopped = this.currentShape.drop();
		if (stopped) {
			this.clearRows();
			this.spawn();
		}
		this.checkGameOver();
	}

	resetGame = () => {
		// e.preventDefault();
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
			new Message('Game over!');		
			clearInterval(this.gravity);			
		}
	}

	moveShape = (direction) => {
		switch(direction) {
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
