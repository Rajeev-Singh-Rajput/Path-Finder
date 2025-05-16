import React from 'react';

export default function NoPathOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold mb-3">No Path Found</h2>
        <p className="mb-4 text-gray-700">
          There’s no valid path! Try clearing some walls or regenerating the maze.
        </p>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
