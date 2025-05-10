export function animateCells(cellList, newType, delay, setGrid) {
  return new Promise(resolve => {
    let i = 0;
    function animateNext() {
      if (i >= cellList.length) {
        resolve();
        return;
      }
      const cell = cellList[i];
      if (!cell) {
        i++;
        setTimeout(animateNext, delay);
        return;
      }
      const { row, col } = cell;
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
        if (newGrid[row] && newGrid[row][col] && newGrid[row][col].type !== 'wall') {
          newGrid[row][col].type = newType;
        }
        return newGrid;
      });
      i++;
      setTimeout(animateNext, delay);
    }
    animateNext();
  });
}
