class Queen extends Figure {
  type = "queen"
  
  constructor(team) {
    super(team);
    if (team === "white") {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
    } else {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
    }
  }

  displayAvailableCellsForMove(board) {
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: 1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      y: 1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: -1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      y: -1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: 1,
      y: 1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: -1,
      y: -1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: -1,
      y: 1,
    });
    this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
      x: 1,
      y: -1,
    });
  }
}
