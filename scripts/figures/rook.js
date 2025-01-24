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
    this.#processCellsRecursive(board.selectedCell, board, { x: -1 });
    this.#processCellsRecursive(board.selectedCell, board, { x: 1 });
    this.#processCellsRecursive(board.selectedCell, board, { y: -1 });
    this.#processCellsRecursive(board.selectedCell, board, { y: 1 });
  }

  #processCellsRecursive(startCell, board, changes) {
    if (!startCell) {
      return;
    }

    startCell.setIsAvailable(true);

    if (startCell.figure) {
      if (startCell.figure === this) {
        startCell.setIsAvailable(false);
      } else if (startCell.figure.team === this.team) {
        startCell.setIsAvailable(false);
        return;
      } else {
        return;
      }
    }

    this.#processCellsRecursive(
      board.getCellWithCoords(
        startCell.getCoords().x + (changes.x || 0),
        startCell.getCoords().y + (changes.y || 0)
      ),
      board,
      changes
    );
  }
}
