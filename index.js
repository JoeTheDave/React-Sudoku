
var sudoku = {
  cells: [],
  init: function () {
    for (x = 0; x <= 8; x++) {
      this.cells.push([]);
      for (y = 0; y <= 8; y++) {
        this.cells[x].push(0);
      }
    }
  },


}

sudoku.init();
console.log(sudoku);
