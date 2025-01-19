class Pawn extends Figure {
  constructor(team) {
    super(team);
    this.icon =
      team === "white" ? "../../assets/pawnW.png" : "../../assets/pawnB.png";
  }

  getAvailableCellsForMoveWithCondition(cells, currentCell) {
    return super.getAvailableCellsForMoveWithCondition(cells, (cell) => {
      if (cell.figure && cell.figure.team === this.team) {
        return false;
      } else if (
        !cell.figure &&
        cell.coords.y === currentCell.coords.y + 1 &&
        cell.coords.x === currentCell.coords.x &&
        this.team === "white"
      ) {
        return true;
      } else if (
        !cell.figure &&
        cell.coords.y === currentCell.coords.y - 1 &&
        cell.coords.x === currentCell.coords.x &&
        this.team === "black"
      ) {
        return true;
      } else if (
        this.team === "white" &&
        cell.figure &&
        (currentCell.coords.x - 1 === cell.coords.x ||
          currentCell.coords.x + 1 === cell.coords.x) &&
        cell.coords.y === currentCell.coords.y + 1
      ) {
        return true;
      } else if (
        this.team === "black" &&
        cell.figure &&
        (currentCell.coords.x - 1 === cell.coords.x ||
          currentCell.coords.x + 1 === cell.coords.x) &&
        cell.coords.y === currentCell.coords.y - 1
      ) {
        return true;
      }
    });
  }
}
