class Knight extends Figure {
  type = "knight"
  
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
  
  displayAvailableCellsForMove(board) {

    //! adding the directions for the knight
    const directions = [
      { x: 1, y: 2 },
      { x: -1, y: -2 },
      { x: -1, y: 2 },
      { x: 1, y: -2 },
      { x: 2, y: 1 },
      { x: -2, y: -1 },
      { x: -2, y: 1 },
      { x: 2, y: -1 },
    ];

    for (const direction of directions) {
      this.setAvailableCellWithOffset(board.selectedCell, board, direction);
    }
  }

  setAvailableCellWithOffset(selectedCell, board, offset) {
    const { x, y } = selectedCell.getCoords();
    const cell = board.getCellWithCoords(x + offset.x, y + offset.y);
    if (cell && !(cell.figure && cell.figure.team === this.team)) {
      cell.setIsAvailable(true);
    }
  }
}
