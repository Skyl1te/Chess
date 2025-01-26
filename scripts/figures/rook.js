class Rook extends Figure {
  type = "rook";

  constructor(team) {
    super(team);
    if (this.team === "white") {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
    } else {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png";
    }
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    this.#showRookAvailableCells(board);
  }

  #showRookAvailableCells(board) {
    this.setAvailableCellsWithOffset(board.selectedCell, board, { x: -1 });
    this.setAvailableCellsWithOffset(board.selectedCell, board, { x: 1 });
    this.setAvailableCellsWithOffset(board.selectedCell, board, { y: -1 });
    this.setAvailableCellsWithOffset(board.selectedCell, board, { y: 1 });
  }
}
