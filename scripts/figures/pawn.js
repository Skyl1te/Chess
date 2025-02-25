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
    const directions = this.team === "black" ? [{ x: 1, y: 1 }, { x: -1, y: 1 }] : [{ x: 1, y: -1 }, { x: -1, y: -1 }];

    directions.forEach((direction) => {
      const cell = board.getCellWithOffset(direction.x, direction.y);
      if (cell && cell.figure && cell.figure.team !== this.team) {
        cell.setIsAvailable(true);
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

    // check if pawn can be promoted
    if ((this.team === "white" && toCell.getCoords().y === 0) || (this.team === "black" && toCell.getCoords().y === 7)) {
      toCell.rootEl.removeChild(toCell.rootEl.children[0]);
      this.promote(toCell);
    }
  }

  promote(cell) {
    const choice = prompt("Select the piece you want to replace the pawn with: 1 - Knight, 2 - Rook, 3 - Bishop, 4 - Queen");

    switch (choice) {
      case '1':
        cell.setFigure(new Knight(this.team));
        break;
      case '2':
        cell.setFigure(new Rook(this.team));
        break;
      case '3':
        cell.setFigure(new Bishop(this.team));
        break;
      case '4':
        cell.setFigure(new Queen(this.team));
        break;

      default:
        while (true) {
          const choice = prompt("Select the piece you want to replace the pawn with: 1 - Knight, 2 - Rook, 3 - Bishop, 4 - Queen");
          if (choice === '1' || choice === '2' || choice === '3' || choice === '4') {
            break;
          }
        }
        break;
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
