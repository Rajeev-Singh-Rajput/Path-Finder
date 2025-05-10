// src/components/TutorialOverlay.jsx
import React, { useState } from 'react';

// Define your slides as an array of objects.
const slides = [
  {
    title: 'Welcome to Find the Way!',
    text: 'This visualizer demonstrates how pathfinding algorithms navigate a grid to find the optimal path.'
  },
  {
    title: 'Set Up Your Grid',
    text: 'Click on the grid to toggle walls. Walls block the path, and the algorithm will avoid them.'
  },
  {
    title: 'Visualize Algorithms',
    text: 'Press the "Visualize" button to see the algorithm in action. You can also clear the board or generate mazes.'
  }
];

function TutorialOverlay({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Go to the next slide, or close the tutorial if it’s the last slide.
  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onClose();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Go to the previous slide if not on the first one.
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{slides[currentSlide].title}</h2>
        <p className="mb-4">{slides[currentSlide].text}</p>
        <div className="flex justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Skip Tutorial
        </button>
      </div>
    </div>
  );
}

export default TutorialOverlay;
