export function getNeighbours(cell) {
  return [
    { row: cell.row - 1, col: cell.col },
    { row: cell.row, col: cell.col + 1 },
    { row: cell.row + 1, col: cell.col },
    { row: cell.row, col: cell.col - 1 },
  ];
}

export function isValid(row, col, grid) {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

export function BFS(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const queue = [source];
  const visited = new Set([`${source.row}-${source.col}`]);
  const parent = new Map();

  if (grid[source.row][source.col].type === "wall") {
    return { searchAnimation: [source], pathAnimation: [] };
  }

  while (queue.length) {
    const current = queue.shift();
    searchAnimation.push(current);

    if (current.row === target.row && current.col === target.col) {
      let temp = current;
      while (temp) {
        pathAnimation.push(temp);
        temp = parent.get(`${temp.row}-${temp.col}`);
      }
      pathAnimation.reverse();
      break;
    }

    for (const n of getNeighbours(current)) {
      const key = `${n.row}-${n.col}`;
      if (
        isValid(n.row, n.col, grid) &&
        grid[n.row][n.col].type !== "wall" &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push(n);
        parent.set(key, current);
      }
    }
  }

  return { searchAnimation, pathAnimation };
}

export function DFS(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const visited = new Set();
  const parent = new Map();

  function dfs(cell) {
    const key = `${cell.row}-${cell.col}`;
    if (
      !isValid(cell.row, cell.col, grid) ||
      grid[cell.row][cell.col].type === "wall" ||
      visited.has(key)
    )
      return false;

    visited.add(key);
    searchAnimation.push(cell);

    if (cell.row === target.row && cell.col === target.col) return true;

    for (const n of getNeighbours(cell)) {
      const nKey = `${n.row}-${n.col}`;
      if (!visited.has(nKey)) {
        parent.set(nKey, cell);
        if (dfs(n)) return true;
      }
    }

    return false;
  }

  if (dfs(source)) {
    let curr = target;
    while (curr) {
      pathAnimation.push(curr);
      curr = parent.get(`${curr.row}-${curr.col}`);
    }
    pathAnimation.reverse();
  }

  return { searchAnimation, pathAnimation };
}

export function Dijkstra(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const dist = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(Infinity)
  );
  const visited = new Set();
  const parent = new Map();

  dist[source.row][source.col] = 0;
  const pq = [{ cell: source, cost: 0 }];

  while (pq.length) {
    pq.sort((a, b) => a.cost - b.cost);
    const { cell: current } = pq.shift();
    const key = `${current.row}-${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    searchAnimation.push(current);

    if (current.row === target.row && current.col === target.col) {
      let cur = current;
      while (cur) {
        pathAnimation.push(cur);
        cur = parent.get(`${cur.row}-${cur.col}`);
      }
      pathAnimation.reverse();
      break;
    }

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

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function Astar(grid, source, target) {
  const searchAnimation = [];
  const pathAnimation = [];
  const gScore = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(Infinity)
  );
  const fScore = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(Infinity)
  );
  const visited = new Set();
  const parent = new Map();

  gScore[source.row][source.col] = 0;
  fScore[source.row][source.col] = heuristic(source, target);
  const openSet = [{ cell: source, f: fScore[source.row][source.col] }];

  while (openSet.length) {
    openSet.sort((a, b) => a.f - b.f);
    const { cell: current } = openSet.shift();
    const key = `${current.row}-${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);
    searchAnimation.push(current);

    if (current.row === target.row && current.col === target.col) {
      let cur = current;
      while (cur) {
        pathAnimation.push(cur);
        cur = parent.get(`${cur.row}-${cur.col}`);
      }
      pathAnimation.reverse();
      break;
    }

    for (const n of getNeighbours(current)) {
      if (isValid(n.row, n.col, grid) && grid[n.row][n.col].type !== "wall") {
        const tentativeG =
          gScore[current.row][current.col] + grid[n.row][n.col].weight;

        if (tentativeG < gScore[n.row][n.col]) {
          gScore[n.row][n.col] = tentativeG;
          fScore[n.row][n.col] = tentativeG + heuristic(n, target);
          parent.set(`${n.row}-${n.col}`, current);
          openSet.push({ cell: n, f: fScore[n.row][n.col] });
        }
      }
    }
  }

  return { searchAnimation, pathAnimation };
}
