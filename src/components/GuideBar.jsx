import React from 'react';

const guideItems = [
  { label: 'Unvisited', color: 'bg-white', border: 'border-gray-400' },
  { label: 'Visited', color: 'bg-blue-400', border: 'border-blue-400' },
  { label: 'Path', color: 'bg-green-400', border: 'border-green-400' },
  { label: 'Wall', color: 'bg-gray-800', border: 'border-gray-800' },
];

const GuideBar = () => {
  return (
    <div className="w-full px-4 py-2 bg-gray-100">
      <div className="flex flex-wrap space-y-2 gap-2 md:space-y-0">
        {guideItems.map(({ label, color, border }) => (
          <div key={label} className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${color} border ${border} rounded-sm`} />
            <span className="text-sm md:text-base text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideBar;