import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Board from "./components/Board";
import TutorialOverlay from "./components/TutorialOverlay";
import NoPathOverlay from "./components/NoPathOverlay";
import { generateMaze } from "./algorithms/MazeGenerator";
import { BFS, DFS, Dijkstra, Astar } from "./algorithms/PathFindingAlgorithms";
import { animateCells } from "./utils/PathFindingUtils";

function App() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [showNoPath, setShowNoPath] = useState(false);
  const [grid, setGrid] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS");

  // Called by Board when it creates the initial grid
  const handleGridUpdate = (newGrid) => {
    setGrid(newGrid);
  };

  const handleGenerateMaze = () => {
    if (grid.length) {
      generateMaze(grid, setGrid);
    }
  };

  const clearHighlights = () => {
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) =>
          cell.type === "visited" || cell.type === "path"
            ? { ...cell, type: "unvisited" }
            : cell
        )
      )
    );
  };

  const handleVisualize = () => {
    clearHighlights();

    if (!grid.length) return;

    const source = { row: 0, col: 0 };
    const target = {
      row: grid.length - 1,
      col: grid[0].length - 1,
    };

    let result;
    switch (selectedAlgorithm) {
      case "BFS":
        result = BFS(grid, source, target);
        break;
      case "DFS":
        result = DFS(grid, source, target);
        break;
      case "Dijkstra":
        result = Dijkstra(grid, source, target);
        break;
      case "A*":
        result = Astar(grid, source, target);
        break;
      default:
        return;
    }

    const { searchAnimation, pathAnimation } = result;
    const delay = 50;

    animateCells(searchAnimation, "visited", delay, setGrid).then(() => {
      if (!pathAnimation.length) {
        setShowNoPath(true);
      } else {
        animateCells(pathAnimation, "path", delay, setGrid);
      }
    });
  };

  const handleClearPath = () => {
    clearHighlights();
  };

  const handleClearBoard = () => {
    setGrid((prev) =>
      prev.map((row) => row.map((cell) => ({ ...cell, type: "unvisited" })))
    );
  };

  return (
    <div className="App">
      {showTutorial && (
        <TutorialOverlay onClose={() => setShowTutorial(false)} />
      )}
      {showNoPath && <NoPathOverlay onClose={() => setShowNoPath(false)} />}

      <NavigationBar
        onVisualize={handleVisualize}
        onClearPath={handleClearPath}
        onClearBoard={handleClearBoard}
        onGenerateMaze={handleGenerateMaze}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />

      <Board grid={grid} setGrid={setGrid} onGridUpdate={handleGridUpdate} />
    </div>
  );
}

export default App;
