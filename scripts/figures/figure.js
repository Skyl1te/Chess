class Figure {
  type = "figure";
  cellPosition;
  team;
  icon;

  constructor(team) {
    this.team = team;
  }

  /**@param {(cell: Cell) => boolean} processCell*/
  getAvailableCellsForMoveWithCondition(cells, processCell) {
    const availableCells = [];
    cells.forEach((row) => {
      row.forEach((c) => {
        if (processCell) {
          if (processCell(c)) {
            availableCells.push(c.position);
            c.setIsAvailable(true)
            if (c.figure) {
              c.rootEl.classList.add("killable")
            } else {
              c.rootEl.classList.add("remove")
            }
          } else {
            c.setIsAvailable(false)
          }
        }
      });
    });

    return availableCells;
  }

  setCellPosition(position) {
    this.cellPosition = position;
  }
}
