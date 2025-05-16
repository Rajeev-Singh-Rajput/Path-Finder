import React from 'react';

function NavigationBar({
  onVisualize,
  onClearPath,
  onClearBoard,
  onGenerateMaze,
  selectedAlgorithm,
  setSelectedAlgorithm,
}) {
  const algorithmOptions = ['BFS', 'DFS', 'Dijkstra', 'A*'];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Title */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          Find the Way
        </a>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={onVisualize}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm"
          >
            {selectedAlgorithm ? `Visualize ${selectedAlgorithm}` : 'Visualize'}
          </button>

          <button
            onClick={onClearPath}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm px-2"
          >
            Clear Path
          </button>

          <button
            onClick={onClearBoard}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm px-2"
          >
            Clear Board
          </button>

          <button
            onClick={onGenerateMaze}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm px-2"
          >
            Generate Maze
          </button>

          {/* Algorithm Selector */}
          <label htmlFor="algorithm" className="sr-only">
            Algorithm
          </label>
          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-gray-800 text-sm bg-white"
          >
            <option value="">Select Algorithm</option>
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
