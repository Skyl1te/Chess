class Board extends GameObject {
  /**
   * @type {Cell[][]}
   */
  cells = [];
  selectedCell = null;

  constructor() {
    super();
    this.rootEl = document.querySelector(".board");
  }

  init() {
    this.#initCells();
    this.initFigures();
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

  /**
   * @param {Cell} cell
   */
  selectCell(cell) {
    if (cell.isAvailable) {
      this.setFigurePosition(this.selectedCell.figure, cell.position);
      this.selectedCell.rootEl.classList.remove("active");
      this.selectedCell = null;
    } else {
      this.selectedCell = cell;
      cell.rootEl.classList.add("active");
      this.processCells((c) => {
        if (c.position !== cell.position) {
          c.rootEl.classList.remove("active");
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
      if (availableCells.includes(c.position)) {
        c.setIsAvailable(true);
        c.rootEl.classList.add("available");
      } else {
        c.setIsAvailable(false);
        c.rootEl.classList.remove("available");
      }
    });
  }

  initFigures() {
    this.#initPawns();
  }

  #initPawns() {
    for (let i = 0; i < 8; i++) {
      const pawnWhite = new Pawn("white");
      const pawnBalck = new Pawn("black");
      this.setFigurePosition(pawnWhite, POSITIONS[i] + 2);
      this.setFigurePosition(pawnBalck, POSITIONS[i] + 7);
    }
  }

  setFigurePosition(figure, position) {
    const toCell = this.getCell(position);
    if (toCell.figure) {
      toCell.setFigure(figure)
      toCell.rootEl.removeChild(toCell.rootEl.children[0])
    }
    if (figure.cellPosition) {
      const prevCell = this.getCell(figure.cellPosition);
      prevCell.setFigure(null);
      prevCell.rootEl.children[0].remove();
    }
    toCell.setFigure(figure);
    const iconImg = document.createElement("img");
    iconImg.setAttribute("src", figure.icon);
    toCell.rootEl.appendChild(iconImg);
    figure.setCellPosition(position);
  }

  getCell(position) {
    const [y, x] = Cell.convertPosition(position);
    return this.cells[y][x];
  }
}
