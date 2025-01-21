class Pawn extends Figure {
  hasRecentlyDoobleMoved = false;

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
      if (c.figure && c.figure.team !== this.team) {
        c.setIsAvailable(true);
      }
    });
  }

  move(fromCell, toCell) {
    super.move(fromCell, toCell);
    if (Math.abs(fromCell.getCoords().y - toCell.getCoords().y) === 2) {
      this.hasRecentlyDoobleMoved = true;
    } else {
      this.hasRecentlyDoobleMoved = false;
    }
  }
}
