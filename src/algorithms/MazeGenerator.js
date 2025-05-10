// src/algorithms/MazeGenerator.js

/**
 * Generates a maze by randomly turning some "unvisited" cells into walls.
 * @param {Array<Array<Object>>} grid - The current grid state.
 * @param {Function} setGrid - The state setter to update the grid.
 */
export function generateMaze(grid, setGrid) {
  // Create a new grid by mapping over each cell.
  const newGrid = grid.map(row =>
    row.map(cell => {
      // For cells that are "unvisited", randomly make them walls (30% chance)
      if (cell.type === 'unvisited' && Math.random() < 0.3) {
        return { ...cell, type: 'wall' };
      }
      return cell;
    })
  );
  // Update the grid state.
  setGrid(newGrid);
}
