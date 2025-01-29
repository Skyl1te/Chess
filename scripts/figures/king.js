class King extends Figure {
  type = "king";

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
    this.#setAvailableBaseMoves(board);
    this.#setAvailableCastles(board);
  }

  /** @param {Board} board */
  #setAvailableBaseMoves(board) {
    this.setAvailableCellWithOffset({ x: 1, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: -1 }, board);
    this.setAvailableCellWithOffset({ x: 1, y: -1 }, board);

    this.setAvailableCellWithOffset({ x: 0, y: 1 }, board);
    this.setAvailableCellWithOffset({ x: -1, y: 0 }, board);
    this.setAvailableCellWithOffset({ x: 0, y: -1 }, board);
    this.setAvailableCellWithOffset({ x: 1, y: 0 }, board);
  }

  /** @param {Board} board */
  #setAvailableCastles(board) {
    if (!this.hasMoved) {
      this.#setAvailableKingsideCastle(board);
      this.#setAvailableQueensideCastle(board)
    }
  }

  #setAvailableKingsideCastle(board) {
    const kingSideRookCell = board.getCellWithOffset(3, 0);
    let isAvailableCastle = true;

    for (let i = 2; i > 0; i--) {
      const checkCell = board.getCellWithOffset(i, 0);
      console.log(i)
      if (!checkCell.isEmpty()) {
        isAvailableCastle = false;
      }
    }

    if (
      isAvailableCastle &&
      kingSideRookCell.hasFigureWithType("rook") &&
      !kingSideRookCell.figure.hasMoved
    ) {
      this.setAvailableCellWithOffset({ x: 2, y: 0 }, board);
      const cellForCastle = board.getCellWithOffset(2, 0);
      cellForCastle.setIsAvailableCastle(true);
    }
  }

  #setAvailableQueensideCastle(board) {
    const queenSideRookCell = board.getCellWithOffset(-4, 0);
    let isAvailableCastle = true;

    for (let i = 3; i > 0; i--) {
      const checkCell = board.getCellWithOffset(-i, 0);
      if (!checkCell.isEmpty()) {
        isAvailableCastle = false;
      }
    }

    if (
      isAvailableCastle &&
      queenSideRookCell.hasFigureWithType("rook") &&
      !queenSideRookCell.figure.hasMoved
    ) {
      this.setAvailableCellWithOffset({ x: -2, y: 0 }, board);
      const cellForCastle = board.getCellWithOffset(-2, 0);
      cellForCastle.setIsAvailableCastle(true);
    }
  }

  castle(fromCell, toCell, board) {
    this.move(fromCell, toCell);
    let rookCell = board.getCellWithOffset(1, 0, toCell);
    if (rookCell.figure) {
      rookCell.figure.move(rookCell, board.getCellWithOffset(-1, 0, toCell));
    } else {
      rookCell = board.getCellWithOffset(-2, 0, toCell);
      rookCell.figure.move(rookCell, board.getCellWithOffset(1, 0, toCell));
    }
  }
}
