class Pawn extends Figure {
  hasRecentlyDoublemoved = false;
  type = "pawn"

  constructor(team) {
    super(team);
    this.icon =
      team === "white" ? "../../assets/pawnW.png" : "../../assets/pawnB.png";
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {
    const coords = board.selectedCell.getCoords();
    this.#setAvailableBaseMoves(board, coords);
    this.#setAvailableKills(board, coords);
    this.#setAvailableTakeEnPass(board, coords);
  }

  /** @param {Board} board */
  #setAvailableBaseMoves(board, coords) {
    for (let i = 1; i <= 2; i++) {
      let cellForMove;

      if (this.team === "black") {
        cellForMove = board.getCellWithCoords(coords.x, coords.y + i);
      } else {
        cellForMove = board.getCellWithCoords(coords.x, coords.y - i);
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
  #setAvailableKills(board, coords) {
    let cellsForKill;
    if (this.team === "black") {
      cellsForKill = [
        board.getCellWithCoords(coords.x + 1, coords.y + 1),
        board.getCellWithCoords(coords.x - 1, coords.y + 1),
      ];
    } else {
      cellsForKill = [
        board.getCellWithCoords(coords.x + 1, coords.y - 1),
        board.getCellWithCoords(coords.x - 1, coords.y - 1),
      ];
    }

    cellsForKill.forEach((c) => {
      if (c && c.figure && c.figure.team !== this.team) {
        c.setIsAvailable(true);
      }
    });
  }

  /** @param {Board} board */
  #setAvailableTakeEnPass(board, coords) {
    let cellsNextToSelectedCell = [
      board.getCellWithCoords(coords.x + 1, coords.y),
      board.getCellWithCoords(coords.x - 1, coords.y),
    ];
    let availableCell;

    cellsNextToSelectedCell.forEach((c) => {
      if (
        c &&
        c.figure &&
        c.figure.type === "pawn" &&
        c.figure.hasRecentlyDoublemoved
      ) {
        if (this.team === "black") {
          availableCell = board.getCellWithCoords(
            c.getCoords().x,
            c.getCoords().y + 1
          );
        } else {
          availableCell = board.getCellWithCoords(
            c.getCoords().x,
            c.getCoords().y - 1
          );
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
