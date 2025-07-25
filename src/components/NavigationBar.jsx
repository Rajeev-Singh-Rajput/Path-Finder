import React from "react";

function NavigationBar({
  onVisualize,
  onClearPath,
  onClearBoard,
  onGenerateMaze,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) {
  const algorithmOptions = ["BFS", "DFS", "Dijkstra", "A*"];

  return (
    <header className="backdrop-blur-xs">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between border-b-2 border-blue-300 mb-2 ">
        {/* Title */}
        <a href="/" className="text-2xl font-bold text-blue-600">
          Find the Way
        </a>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={onVisualize}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm cursor-pointer"
          >
            {selectedAlgorithm ? `Visualize ${selectedAlgorithm}` : "Visualize"}
          </button>

          <button
            onClick={onClearPath}
            className="text-gray-700 hover:text-blue-600 font-medium text-sm px-2 cursor-pointer"
          >
            Clear Path
          </button>

          <button
            onClick={onClearBoard}
            className="text-gray-700 hover:text-blue-600 font-medium text-sm px-2 cursor-pointer"
          >
            Clear Board
          </button>

          <button
            onClick={onGenerateMaze}
            className="text-gray-700 hover:text-blue-600 font-medium text-sm px-2 cursor-pointer"
          >
            Generate Maze
          </button>

          {/* Algorithm Selector */}
          <label
            htmlFor="algorithm"
            className="text-gray-700 font-medium text-sm px-2"
          >
            Algorithm:
          </label>

          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-gray-800 text-sm bg-white"
          >
            {algorithmOptions.map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;
