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

    //! adding the directions for the bishop
    const directions = [
      { x: 1, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: -1 }
    ];

    for (let direction of directions) {
      this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, direction);
    }
  }
}
