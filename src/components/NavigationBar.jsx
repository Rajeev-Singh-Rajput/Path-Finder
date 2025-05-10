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
    <header className="bg-gray-50 shadow p-4">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gray-800">
          Find the Way
        </a>

        <div className="flex items-center space-x-4">
          <button
            onClick={onVisualize}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-lg cursor-pointer"
          >
            {selectedAlgorithm
              ? `Visualize ${selectedAlgorithm}`
              : 'Visualize'}
          </button>

          <button
            onClick={onClearPath}
            className="text-gray-700 hover:text-blue-700 font-medium text-lg cursor-pointer"
          >
            Clear Path
          </button>

          <button
            onClick={onClearBoard}
            className="text-gray-700 hover:text-blue-700 font-medium text-lg cursor-pointer"
          >
            Clear Board
          </button>

          <button
            onClick={onGenerateMaze}
            className="text-gray-700 hover:text-blue-700 font-medium text-lg cursor-pointer"
          >
            Generate Maze
          </button>

          <div className="flex items-center space-x-2">
            <label
              htmlFor="algorithm-select"
              className="text-gray-700 hover:text-blue-700 font-medium text-lg cursor-pointer"
            >
              Algorithm:
            </label>
            <select
              id="algorithm-select"
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-gray-800 text-lg cursor-pointer"
            >
              <option value="">Select</option>
              {algorithmOptions.map((algo) => (
                <option key={algo} value={algo}>
                  {algo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;
