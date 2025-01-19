const POSITIONS = ["a", "b", "c", "d", "e", "f", "g", "h"];

class Cell extends GameObject {
  figure = null;
  position;
  isAvailable = false;
  coords = { y: null, x: null };

  /**
   * @returns {[x: string, y: string]} matrix indexes
   */
  static convertPosition(pos) {
    const [letter, num] = pos.split("");
    return [8 - num, POSITIONS.indexOf(letter)];
  }

  constructor(letterNumber, number) {
    super();
    switch (letterNumber) {
      case 0: {
        this.position = "a" + number;
        break;
      }
      case 1: {
        this.position = "b" + number;
        break;
      }
      case 2: {
        this.position = "c" + number;
        break;
      }
      case 3: {
        this.position = "d" + number;
        break;
      }
      case 4: {
        this.position = "e" + number;
        break;
      }
      case 5: {
        this.position = "f" + number;
        break;
      }
      case 6: {
        this.position = "g" + number;
        break;
      }
      case 7: {
        this.position = "h" + number;
        break;
      }
    }
    this.coords.x = letterNumber;
    this.coords.y = number - 1;
  }

  init(board) {
    this.rootEl = this.#createAndRender(board.rootEl);
    this.#startListeners(board);
  }

  /**
   * @param {Board} board
   */
  #startListeners(board) {
    this.rootEl.addEventListener("click", (e) => {
      board.selectCell(this);
      if (this.figure && board.selectedCell) {
        board.showAvailableCellsForMove(
          this.figure.getAvailableCellsForMoveWithCondition(board.cells, this)
        );
      } else {
        board.showAvailableCellsForMove([]);
      }
    });
  }

  #createAndRender(divBoard) {
    const divCell = document.createElement("div");
    divCell.classList.add(
      "cell",
      this.#getCellColor(this.position),
      this.position
    );
    divBoard.appendChild(divCell);

    return divCell;
  }

  #getCellColor(position) {
    const reg = /[aceg]/g;
    const [l, n] = position.split("");
    if (reg.test(l)) {
      if (Number(n) % 2 === 0) {
        return "white";
      } else {
        return "black";
      }
    } else {
      if (Number(n) % 2 === 0) {
        return "black";
      } else {
        return "white";
      }
    }
  }

  setIsAvailable(isAvailable) {
    this.isAvailable = isAvailable;
  }

  setFigure(figure) {
    this.figure = figure;
    // const child = document.createElement("img");
    // child.setAttribute("src", figure.icon);
    // this.rootEl.replaceChildren(child);
  }
}
