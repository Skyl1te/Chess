class Bishop extends Figure {
  constructor(team) {
    super(team);
    if (team === "white") {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
    } else {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png";
    }
  }

  displayAvailableCellsForMove(board) {
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
