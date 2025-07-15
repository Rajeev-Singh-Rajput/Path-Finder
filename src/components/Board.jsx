import React, { useEffect, useRef } from "react";

function Board({ cellWidth = 22, grid, setGrid, onGridUpdate }) {
  const boardRef = useRef(null);

  // Initialize grid on mount or resize
  useEffect(() => {
    const createGrid = () => {
      if (!boardRef.current) return;
      const width = boardRef.current.clientWidth;
      const cols = Math.floor(width / cellWidth) - 1;
      const rows = Math.floor((window.innerHeight - 200) / cellWidth);
      const newGrid = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          row.push({ row: r, col: c, type: "unvisited", weight: 1 });
        }
        newGrid.push(row);
      }
      setGrid(newGrid);
      onGridUpdate(newGrid);
    };

    createGrid();
    window.addEventListener("resize", createGrid);
    return () => window.removeEventListener("resize", createGrid);
  }, [cellWidth]);

  // Cell click toggles weight/wall
  const handleClick = (r, c) => {
    setGrid((g) =>
      g.map((row, ri) =>
        row.map((cell, ci) => {
          if (ri === r && ci === c) {
            if (cell.type === "wall")
              return { ...cell, type: "unvisited", weight: 1 };
            const next = cell.weight === 5 ? null : cell.weight + 1;
            if (next == null) return { ...cell, type: "wall", weight: 1 };
            return { ...cell, type: "unvisited", weight: next };
          }
          return cell;
        })
      )
    );
  };

  // Determine cell background
  const bgColor = (cell) => {
    if (cell.type === "wall") return "bg-gray-800";
    if (cell.type === "visited") return "bg-blue-400";
    if (cell.type === "path") return "bg-green-400";
    if (cell.weight > 1) return `bg-gray-500 bg-opacity-${cell.weight * 10}`;
    return "bg-transparent";
  };

  return (
    <div
      ref={boardRef}
      className="w-full overflow-auto p-2"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div
        className="inline-grid"
        style={{
          gridTemplateColumns: `repeat(${
            grid[0]?.length || 0
          }, ${cellWidth}px)`,
          gridAutoRows: `${cellWidth}px`,
        }}
      >
        {grid.flat().map((cell) => (
          <button
            key={`${cell.row}-${cell.col}`}
            onClick={() => handleClick(cell.row, cell.col)}
            className={`${bgColor(
              cell
            )} border border-gray-300 focus:outline-none`}
            style={{ width: cellWidth, height: cellWidth }}
            aria-label={`Cell ${cell.row}, ${cell.col}`}
          >
            {cell.weight > 1 && cell.type !== "wall" && (
              <span className="text-xs text-gray-900">{cell.weight}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Board;
