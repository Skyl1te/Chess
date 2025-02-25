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

  
  displayAvailableCellsForMove(board) {
    //! adding the directions for the rook
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ];

    for (let direction of directions) {
      this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, direction);
    }
  }

  // #showRookAvailableCells(board) {
  //   this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
  //     x: -1,
  //   });
  //   this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
  //     x: 1,
  //   });
  //   this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
  //     y: -1,
  //   });
  //   this.recursiveSetAvailableCellsWithOffset(board.selectedCell, board, {
  //     y: 1,
  //   });
  // }
}
