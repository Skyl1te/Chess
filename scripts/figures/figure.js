class Figure {
  type = "figure";
  team;
  icon;
  hasMoved = false;

  constructor(team) {
    this.team = team;
  }

  move(fromCell, toCell) {
    if (toCell.figure) {
      toCell.rootEl.removeChild(toCell.rootEl.children[0]);
    }
    fromCell.setFigure(null);
    fromCell.rootEl.children[0].remove();
    toCell.setFigure(this);
    if (!this.hasMoved) {
      this.hasMoved = true
    }
  }
}
