class Board extends GameObject {
  /** @type {Cell[][]} */
  cells = [];
  /**@type {Cell} */
  selectedCell = null;

  constructor() {
    super();
    this.rootEl = document.querySelector(".board");
  }

  init() {
    this.#initCells();
    this.#initFigures();
  }

  #initCells() {
    for (let num = 7; num >= 0; num--) {
      const row = [];
      for (let letter = 0; letter <= 7; letter++) {
        const cell = new Cell(letter, num + 1);
        row.push(cell);
        cell.init(this);
      }
      this.cells.push(row);
    }
  }

  #initFigures() {
    this.#initPawns();
  }

  #initPawns() {
    for (let i = 0; i < 8; i++) {
      const pawnWhite = new Pawn("white");
      const pawnBalck = new Pawn("black");
      this.setFigurePosition(pawnWhite, POSITION_LETTERS[i] + 2);
      this.setFigurePosition(pawnBalck, POSITION_LETTERS[i] + 7);
    }
  }

  setFigurePosition(figure, position) {
    const cell = this.getCellWithPosition(position);
    cell.setFigure(figure);
  }

  /** @param {Cell} cell */
  onClickCell(cell) {
    if (cell.isAvailable) {
      this.#moveSelectedFigureTo(cell);
      this.#resetActiveCell();
    } else {
      this.#selectCell(cell);
    }
    this.#resetAvailableCellsForMove();
  }

  #selectCell(cell) {
    if (this.selectedCell) {
      this.selectedCell.removeClassName("active");
    }
    this.selectedCell = cell;
    cell.addClassName("active");
  }

  #moveSelectedFigureTo(toCell) {
    if (toCell.isAvailableTakeEnPass) {
      this.selectedCell.figure.takeEnPass(this.selectedCell, toCell, this);
    } else {
      this.#resetPawnsTakeEnPass();
      this.selectedCell.figure.move(this.selectedCell, toCell);
    }
  }

  #resetActiveCell() {
    this.selectedCell.removeClassName("active");
    this.selectedCell = null;
  }

  #resetPawnsTakeEnPass() {
    this.processCells((c) => {
      if (c.isAvailableTakeEnPass) {
        c.setIsAvailableTakeEnPass(false);
      }
      if (
        c.figure &&
        c.figure.type === "pawn" &&
        c.figure.hasRecentlyDoublemoved
      ) {
        c.figure.setHasRecentlyDoublemoved(false);
      }
    });
  }

  /**@param {(cell: Cell) => void} callback  */
  processCells(cb) {
    this.cells.forEach((row) => {
      row.forEach(cb);
    });
  }

  #resetAvailableCellsForMove() {
    this.processCells((c) => {
      c.setIsAvailable(false);
    });
  }

  getCellWithPosition(position) {
    const [y, x] = Cell.convertPosition(position);
    return this.cells[y][x];
  }

  setAvailableCellWithCoords(x, y) {
    this.cells[y][x].setIsAvailable(true);
  }

  getCellWithCoords(x, y) {
    try {
      return this.cells[y][x];
    } catch (e) {
      // coords out of board
    }
  }
}
