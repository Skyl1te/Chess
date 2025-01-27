class Figure {
  type = "figure";
  team;
  icon;
  hasMoved = false;

  constructor(team) {
    this.team = team;
  }

  /** @param {Board} board */
  displayAvailableCellsForMove(board) {}

  move(fromCell, toCell) {
    if (toCell.figure) {
      toCell.rootEl.removeChild(toCell.rootEl.children[0]);
    }
    fromCell.setFigure(null);
    toCell.setFigure(this);
    if (!this.hasMoved) {
      this.hasMoved = true;
    }
  }

  recursiveSetAvailableCellsWithOffset(startCell, board, offset) {
    if (!startCell) {
      return;
    }

    startCell.setIsAvailable(true);

    if (startCell.figure) {
      if (startCell.figure === this) {
        startCell.setIsAvailable(false);
      } else if (startCell.figure.team === this.team) {
        startCell.setIsAvailable(false);
        return;
      } else {
        return;
      }
    }

    this.recursiveSetAvailableCellsWithOffset(
      board.getCellWithCoords(
        startCell.getCoords().x + (offset.x || 0),
        startCell.getCoords().y + (offset.y || 0)
      ),
      board,
      offset
    );
  }

  setAvailableCellWithOffset(offsets, board) {
    const cell = board.getCellWithOffset(offsets.x, offsets.y);
    if (cell) {
      if (!cell.figure || (cell.figure && cell.figure.team !== this.team)) {
        cell.setIsAvailable(true);
      }
    }
  }
}
