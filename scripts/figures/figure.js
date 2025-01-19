class Figure {
  type = "figure";
  team;
  icon;

  constructor(team) {
    this.team = team;
  }

  getAvailableCellsForMove(cells, processCell) {
    const availableCells = [];
    cells.forEach((row) => {
      row.forEach((c) => {
        if (processCell(c)) {
          availableCells.push(c.getStringPosition());
        }
      });
    });

    return availableCells;
  }

  move(fromCell, toCell) {
    if (toCell.figure) {
      toCell.rootEl.removeChild(toCell.rootEl.children[0]);
    }
    fromCell.setFigure(null);
    fromCell.rootEl.children[0].remove();
    toCell.setFigure(this);
  }
}
