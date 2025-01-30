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
      this.#setAvailableQueensideCastle(board);
    }
  }

  #setAvailableKingsideCastle(board) {
    const rookCellOffsetX = 3;
    const kingSideRookCell = board.getCellWithOffset(rookCellOffsetX, 0);

    this.#setAvailableCastleOnCellWithRookAndCellOffsetX(
      rookCellOffsetX,
      kingSideRookCell,
      board
    );
  }

  #setAvailableQueensideCastle(board) {
    const rookCellOffsetX = -4;
    const queenSideRookCell = board.getCellWithOffset(rookCellOffsetX, 0);

    this.#setAvailableCastleOnCellWithRookAndCellOffsetX(
      rookCellOffsetX,
      queenSideRookCell,
      board
    );
  }

  #setAvailableCastleOnCellWithRookAndCellOffsetX(offsetX, rookCell, board) {
    let isAvailableCastle = true;

    for (let i = Math.abs(offsetX) - 1; i > 0; i--) {
      const checkCell = board.getCellWithOffset(offsetX < 0 ? -i : i, 0);
      if (!checkCell.isEmpty()) {
        isAvailableCastle = false;
      }
    }

    if (
      isAvailableCastle &&
      rookCell.hasFigureWithType("rook") &&
      !rookCell.figure.hasMoved
    ) {
      this.setAvailableCellWithOffset({ x: offsetX < 0 ? -2 : 2, y: 0 }, board);
      const cellForCastle = board.getCellWithOffset(offsetX < 0 ? -2 : 2, 0);
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
