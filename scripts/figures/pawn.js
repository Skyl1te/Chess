class Pawn extends Figure {
  constructor(team) {
    super(team);
    this.icon =
      team === "white" ? "../../assets/pawnW.png" : "../../assets/pawnB.png";
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    const { x, y } = board.selectedCell.getCoords();
    this.#setAvailableBaseMoves(board)
  }

  /** @param {Board} board */
  #setAvailableBaseMoves(board) {
    const { x, y } = board.selectedCell.getCoords();
    for (let i = 1; i <= 2; i++) {
      let cellForMove

      if (this.team === "black") {
        cellForMove = board.getCellWithCoords(x, y + i)
      } else {
        cellForMove = board.getCellWithCoords(x, y - i)
      }

      if (!cellForMove.figure) {
        cellForMove.setIsAvailable(true);
        if (this.hasMoved) {
          break;
        }
      } else {
        break
      }
    }
  }
}
