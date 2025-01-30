class Pawn extends Figure {
  hasRecentlyDoublemoved = false;
  type = "pawn";

  constructor(team) {
    super(team);
    this.icon =
      team === "white"
        ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png"
        : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png";
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    this.#setAvailableBaseMoves(board);
    this.#setAvailableKills(board);
    this.#setAvailableTakeEnPass(board);
  }

  /** @param {Board} board */
  #setAvailableBaseMoves(board) {
    for (let i = 1; i <= 2; i++) {
      let cellForMove;

      if (this.team === "black") {
        cellForMove = board.getCellWithOffset(0, i);
      } else {
        cellForMove = board.getCellWithOffset(0, -i);
      }

      if (!cellForMove.figure) {
        cellForMove.setIsAvailable(true);
        if (this.hasMoved) {
          break;
        }
      } else {
        break;
      }
    }
  }

  /** @param {Board} board */
  #setAvailableKills(board) {
    let cellsForKill = [];
    if (this.team === "black") {
      cellsForKill.push(board.getCellWithOffset(1, 1));
      cellsForKill.push(board.getCellWithOffset(-1, 1));
    } else {
      cellsForKill.push(board.getCellWithOffset(1, -1));
      cellsForKill.push(board.getCellWithOffset(-1, -1));
    }

    cellsForKill.forEach((c) => {
      if (c && c.figure && c.figure.team !== this.team) {
        c.setIsAvailable(true);
      }
    });
  }

  /** @param {Board} board */
  #setAvailableTakeEnPass(board) {
    let cellsNextToSelectedCell = [
      board.getCellWithOffset(1, 0),
      board.getCellWithOffset(-1, 0),
    ];
    let availableCell;

    cellsNextToSelectedCell.forEach((c) => {
      if (c && c.hasFigureWithType("pawn") && c.figure.hasRecentlyDoublemoved) {
        if (this.team === "black") {
          availableCell = board.getCellWithOffset(0, 1, c);
        } else {
          availableCell = board.getCellWithOffset(0, -1, c);
        }
      }
    });

    if (availableCell) {
      availableCell.setIsAvailableTakeEnPass(true);
    }
  }

  move(fromCell, toCell) {
    super.move(fromCell, toCell);
    if (Math.abs(fromCell.getCoords().y - toCell.getCoords().y) === 2) {
      this.setHasRecentlyDoublemoved(true);
    }
  }

  takeEnPass(fromCell, toCell, board) {
    this.move(fromCell, toCell);
    let cellWithFigure;
    if (this.team === "black") {
      cellWithFigure = board.getCellWithCoords(
        toCell.getCoords().x,
        toCell.getCoords().y - 1
      );
    } else {
      cellWithFigure = board.getCellWithCoords(
        toCell.getCoords().x,
        toCell.getCoords().y + 1
      );
    }

    toCell.setIsAvailableTakeEnPass(false);
    cellWithFigure.setFigure(null);
  }

  setHasRecentlyDoublemoved(val) {
    this.hasRecentlyDoublemoved = val;
  }
}
