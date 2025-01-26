class Knight extends Figure {
  constructor(team) {
    super(team);
    if (this.team === "white") {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
    } else {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png";
    }
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    const { x, y } = board.selectedCell.getCoords();
    const offsets = [
      [1, 2],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [2, 1],
      [-2, -1],
      [-2, 1],
      [2, -1],
    ];

    offsets.forEach(([oX, oY]) => {
      const cell = board.getCellWithCoords(x + oX, y + oY);
      if (cell) {
        if (!(cell.figure && cell.figure.team === this.team)) {
          cell.setIsAvailable(true);
        }
      }
    });
  }
}
