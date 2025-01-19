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
  selectCell(cell) {
    if (cell.isAvailable) {
      this.selectedCell.figure.move(this.selectedCell, cell);
      this.selectedCell.removeClassName("active");
      this.selectedCell = null;
    } else {
      this.selectedCell = cell;
      cell.addClassName("active");
      this.processCells((c) => {
        if (c.getStringPosition() !== cell.getStringPosition()) {
          c.removeClassName("active");
        }
      });
    }
  }

  /**@param {(cell: Cell) => void} callback  */
  processCells(cb) {
    this.cells.forEach((row) => {
      row.forEach(cb);
    });
  }

  showAvailableCellsForMove(availableCells) {
    this.processCells((c) => {
      if (availableCells.includes(c.getStringPosition())) {
        c.setIsAvailable(true);
      } else {
        c.setIsAvailable(false);
      }
    });
  }

  getCellWithPosition(position) {
    const [y, x] = Cell.convertPosition(position);
    return this.cells[y][x];
  }

  getCellWithCoords(x, y) {
    return this.cells[y][x]
  }
}
