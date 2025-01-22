const POSITION_LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

class Cell extends GameObject {
  figure = null;
  #position;
  isAvailable = false;
  #coords = { y: null, x: null };
  isAvailableTakeEnPass = false;

  /**
   * @returns {[x: string, y: string]} matrix indexes
   */
  static convertPosition(pos) {
    const [letter, num] = pos.split("");
    return [8 - num, POSITION_LETTERS.indexOf(letter)];
  }

  constructor(x, y) {
    super();
    switch (x) {
      case 0: {
        this.#position = "a" + y;
        break;
      }
      case 1: {
        this.#position = "b" + y;
        break;
      }
      case 2: {
        this.#position = "c" + y;
        break;
      }
      case 3: {
        this.#position = "d" + y;
        break;
      }
      case 4: {
        this.#position = "e" + y;
        break;
      }
      case 5: {
        this.#position = "f" + y;
        break;
      }
      case 6: {
        this.#position = "g" + y;
        break;
      }
      case 7: {
        this.#position = "h" + y;
        break;
      }
    }
    this.#coords.x = x;
    this.#coords.y = 8 - y;
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
      board.onClickCell(this);
      if (this.figure && board.selectedCell) {
        this.figure.displayAvailableCellsForMove(board);
      }
    });
  }

  #createAndRender(divBoard) {
    const divCell = document.createElement("div");
    divCell.classList.add(
      "cell",
      this.#getCellColor(this.#position),
      this.#position
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
    if (isAvailable) {
      this.addClassName("available");
      if (this.figure) {
        this.addClassName("killable");
      } else {
        this.removeClassName("killable");
      }
    } else {
      this.removeClassName("available");
    }
  }

  setFigure(figure) {
    this.figure = figure;
    if (figure) {
      const iconImg = document.createElement("img");
      iconImg.setAttribute("src", figure.icon);
      this.rootEl.appendChild(iconImg);
    } else {
      this.rootEl.children[0].remove();
    }
  }

  setIsAvailableTakeEnPass(val) {
    this.isAvailableTakeEnPass = val;
    this.setIsAvailable(true);
    this.addClassName("killable");
  }

  removeClassName(className) {
    this.rootEl.classList.remove(className);
  }

  addClassName(className) {
    this.rootEl.classList.add(className);
  }

  getStringPosition() {
    return this.#position;
  }

  getCoords() {
    return this.#coords;
  }
}
