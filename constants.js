export const SpaceBar = 32;
export const Escape   = 27;

export const Direction = Object.freeze({
	Up:    0,
	Right: 1,
	Down:  2,
	Left:  3
});

export const Score = Object.freeze({
	Move:   1,
	Rotate: 2,
	Drop:   3,
	Fill:   10
});

export const KeyMap = Object.freeze({
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
  37: 3, // Left
  75: 0, // vim keybindings
  76: 1,
  74: 2,
  72: 3
});
