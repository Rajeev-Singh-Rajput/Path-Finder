import React from 'react';

function NoPathOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">No Path Found</h2>
        <p className="mb-4">
          It looks like the walls are blocking the path. Try removing some walls or regenerating the maze.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default NoPathOverlay;
