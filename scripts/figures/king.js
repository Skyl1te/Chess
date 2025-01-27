class King extends Figure {
  constructor(team) {
    super(team);
    if (team === "black") {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png";
    } else {
      this.icon =
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
    }
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    this.setAvailableCellWithOffset({ x: 1, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: -1 }, board);
    this.setAvailableCellWithOffset({ x: 1, y: -1 }, board);

    this.setAvailableCellWithOffset({ x: 0, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: 0 }, board);
    this.setAvailableCellWithOffset({ x: 0, y: -1 }, board);
    this.setAvailableCellWithOffset({ x: 1, y: 0 }, board);
  }
}
