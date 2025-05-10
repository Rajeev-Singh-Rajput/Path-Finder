import React, { useEffect, useRef } from 'react';

function Board({ cellWidth = 22, grid, setGrid, onGridUpdate }) {
  const boardRef = useRef(null);

  const createGrid = () => {
    if (!boardRef.current) return;
    const boardWidth = boardRef.current.clientWidth;
    const boardHeight = boardRef.current.clientHeight;
    const cols = Math.floor(boardWidth / cellWidth);
    const rows = Math.floor(boardHeight / cellWidth);

    const newGrid = [];
    for (let r = 0; r < rows; r++) {
      const rowCells = [];
      for (let c = 0; c < cols; c++) {
        rowCells.push({
          row: r,
          col: c,
          type: 'unvisited',
          weight: 1,
        });
      }
      newGrid.push(rowCells);
    }
    setGrid(newGrid);
    onGridUpdate(newGrid);
  };

  useEffect(() => {
    createGrid();
  }, [cellWidth]);

  const handleCellClick = (r, c) => {
    setGrid(prev =>
      prev.map(row =>
        row.map(cell => {
          if (cell.row === r && cell.col === c) {
            if (cell.type === 'wall') {
              return { ...cell, type: 'unvisited', weight: 1 };
            }
            const nextWeight = cell.weight === 5 ? null : cell.weight + 1;
            if (nextWeight == null) {
              return { ...cell, type: 'wall', weight: 1 };
            } else {
              return { ...cell, type: 'unvisited', weight: nextWeight };
            }
          }
          return cell;
        })
      )
    );
  };

  const bgColor = (cell) => {
    if (cell.type === 'wall') return '#34495e';
    if (cell.type === 'visited') return 'rgba(0,190,218,0.75)';
    if (cell.type === 'path')    return 'rgb(50, 168, 82)';
    // unvisited with weight >1
    if (cell.weight > 1)
      return `rgba(100,100,100,${cell.weight * 0.15})`;
    return 'transparent';
  };

  return (
    <div
      ref={boardRef}
      className="board-container p-4 border border-gray-300 overflow-auto"
      style={{ minHeight: '300px' }}
    >
      {grid.map((row, ri) => (
        <div key={`row-${ri}`} className="flex">
          {row.map((cell, ci) => (
            <div
              key={`cell-${ri}-${ci}`}
              onClick={() => handleCellClick(ri, ci)}
              className="cell border border-gray-200 flex items-center justify-center text-xs select-none cursor-pointer"
              style={{
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
                backgroundColor: bgColor(cell),
              }}
            >
              {cell.type !== 'wall' && cell.weight > 1 ? cell.weight : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
