// src/algorithms/PathFindingAlgorithms.js

/**
 * Returns the four neighboring cells (up, right, down, left) of the given cell.
 * @param {Object} cell - An object with properties { row, col }.
 * @returns {Array<Object>}
 */
export function getNeighbours(cell) {
  return [
    { row: cell.row - 1, col: cell.col }, // up
    { row: cell.row, col: cell.col + 1 }, // right
    { row: cell.row + 1, col: cell.col }, // down
    { row: cell.row, col: cell.col - 1 }, // left
  ];
}

/**
 * Checks if the given (row, col) coordinate is within the grid bounds.
 * @param {number} row
 * @param {number} col
 * @param {Array<Array<Object>>} grid
 * @returns {boolean}
 */
export function isValid(row, col, grid) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

/**
 * Breadth-First Search (BFS) algorithm.
 * @param {Array<Array<Object>>} grid - The current grid.
 * @param {Object} source - Starting cell { row, col }.
 * @param {Object} target - Target cell { row, col }.
 * @returns {Object} - Contains searchAnimation and pathAnimation arrays.
 */
export function BFS(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const queue = [];
  const visited = new Set();
  const parent = new Map();

  // Immediately return if source is blocked.
  if (grid[source.row][source.col].type === "wall") {
    return { searchAnimation: [source], pathAnimation: [] };
  }

  queue.push(source);
  visited.add(`${source.row}-${source.col}`);

  while (queue.length > 0) {
    const current = queue.shift();

    // If we reached the target, record it and break.
    if (current.row === target.row && current.col === target.col) {
      searchAnimation.push(current);
      let path = [];
      let temp = current;
      while (temp) {
        path.push(temp);
        const key = `${temp.row}-${temp.col}`;
        temp = parent.get(key);
      }
      pathAnimation.push(...path.reverse());
      return { searchAnimation, pathAnimation };
    }

    // Record this visit.
    searchAnimation.push(current);

    const neighbours = getNeighbours(current);
    for (const neighbour of neighbours) {
      const key = `${neighbour.row}-${neighbour.col}`;
      if (
        isValid(neighbour.row, neighbour.col, grid) &&
        grid[neighbour.row][neighbour.col].type !== "wall" &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push(neighbour);
        parent.set(key, current);
      }
    }
  }

  // If loop ends without reaching target, return what we collected.
  return { searchAnimation, pathAnimation };
}

/**
 * Depth-First Search (DFS) algorithm.
 * This function uses recursion to explore the grid.
 * It returns an object containing:
 *  - searchAnimation: Cells visited in order.
 *  - pathAnimation: The final path from source to target (if found).
 * @param {Array<Array<Object>>} grid - The current grid.
 * @param {Object} source - Starting cell { row, col }.
 * @param {Object} target - Target cell { row, col }.
 * @returns {Object} - { searchAnimation, pathAnimation }
 */
export function DFS(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const visited = new Set();
  const parent = new Map();

  // DFS recursive helper function.
  function dfs(cell) {
    const { row, col } = cell;
    const key = `${row}-${col}`;

    // Return false if out of bounds, cell is a wall, or already visited.
    if (
      !isValid(row, col, grid) ||
      grid[row][col].type === "wall" ||
      visited.has(key)
    ) {
      return false;
    }

    visited.add(key);
    searchAnimation.push(cell);

    // If target found, return true.
    if (row === target.row && col === target.col) {
      return true;
    }

    const neighbours = getNeighbours(cell);
    for (const neighbour of neighbours) {
      const nKey = `${neighbour.row}-${neighbour.col}`;
      if (!visited.has(nKey)) {
        parent.set(nKey, cell); // Track the parent.
        if (dfs(neighbour)) {
          return true; // If target found in the branch, bubble up true.
        }
      }
    }
    return false; // No path found from this branch.
  }

  // Start DFS from the source.
  if (dfs(source)) {
    let curr = target;
    const path = [];
    // Backtrack from target to source using the parent map.
    while (curr) {
      path.push(curr);
      const key = `${curr.row}-${curr.col}`;
      curr = parent.get(key);
    }
    // Reverse the path so it goes from source to target.
    pathAnimation.push(...path.reverse());
  }

  return { searchAnimation, pathAnimation };
}

// Dijkstra’s Algorithm
export function Dijkstra(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // distances + visited + parent
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const visited = new Set();
  const parent = new Map();

  dist[source.row][source.col] = 0;
  const pq = [{ cell: source, cost: 0 }];

  while (pq.length) {
    // pop the smallest cost
    pq.sort((a, b) => a.cost - b.cost);
    const { cell: current } = pq.shift();
    const key = `${current.row}-${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    searchAnimation.push(current);

    if (current.row === target.row && current.col === target.col) {
      // build path
      let cur = current;
      while (cur) {
        pathAnimation.push(cur);
        cur = parent.get(`${cur.row}-${cur.col}`);
      }
      pathAnimation.reverse();
      return { searchAnimation, pathAnimation };
    }

    // explore neighbors
    for (const n of getNeighbours(current)) {
      if (isValid(n.row, n.col, grid) && grid[n.row][n.col].type !== "wall") {
        const newDist =
          dist[current.row][current.col] + grid[n.row][n.col].weight;

        if (newDist < dist[n.row][n.col]) {
          dist[n.row][n.col] = newDist;
          parent.set(`${n.row}-${n.col}`, current);
          pq.push({ cell: n, cost: newDist });
        }
      }
    }
  }

  return { searchAnimation, pathAnimation };
}

// A* Algorithm
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function Astar(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const visited = new Set();
  const parent = new Map();

  gScore[source.row][source.col] = 0;
  fScore[source.row][source.col] = heuristic(source, target);
  const openSet = [{ cell: source, f: fScore[source.row][source.col] }];

  while (openSet.length) {
    // pop lowest fScore
    openSet.sort((a, b) => a.f - b.f);
    const { cell: current } = openSet.shift();
    const key = `${current.row}-${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    searchAnimation.push(current);

    if (current.row === target.row && current.col === target.col) {
      // build path
      let cur = current;
      while (cur) {
        pathAnimation.push(cur);
        cur = parent.get(`${cur.row}-${cur.col}`);
      }
      pathAnimation.reverse();
      return { searchAnimation, pathAnimation };
    }

    for (const n of getNeighbours(current)) {
      if (isValid(n.row, n.col, grid) && grid[n.row][n.col].type !== "wall") {
        const tentativeG =
          gScore[current.row][current.col] + grid[n.row][n.col].weight;

        if (tentativeG < gScore[n.row][n.col]) {
          gScore[n.row][n.col] = tentativeG;
          parent.set(`${n.row}-${n.col}`, current);
          const f = tentativeG + heuristic(n, target);
          fScore[n.row][n.col] = f;
          openSet.push({ cell: n, f });
        }
      }
    }
  }

  return { searchAnimation, pathAnimation };
}
