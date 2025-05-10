export function generateMaze(grid, setGrid) {
  const newGrid = grid.map(row =>
    row.map(cell =>
      cell.type === 'unvisited' && Math.random() < 0.3
        ? { ...cell, type: 'wall' }
        : cell
    )
  );
  setGrid(newGrid);
}
