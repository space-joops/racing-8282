import React from 'react';

interface Horse {
  id: number;
  name: string;
  jockey: string;
  weight: string;
  recent_performance: string;
  trainer: string;
  win_rate: number;
  dividend: number;
}

export default function HorseCard({ horse }: { horse: Horse }) {
  // Determine color based on win rate for visual cue
  const getProgressColor = (rate: number) => {
    if (rate >= 30) return 'bg-red-500'; // High chance
    if (rate >= 15) return 'bg-blue-500'; // Medium chance
    return 'bg-gray-400'; // Low chance
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full">
              {horse.id}
            </span>
            <h3 className="text-2xl font-extrabold text-gray-900">{horse.name}</h3>
          </div>
          <div className="text-lg text-gray-600 mt-1">
            기수: <span className="font-bold text-gray-800">{horse.jockey}</span> | 조교사: {horse.trainer}
          </div>
          <div className="text-md text-gray-500">
            체중: {horse.weight}kg | 최근: {horse.recent_performance}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-red-600">{horse.win_rate}%</div>
          <div className="text-lg font-bold text-gray-700">배당: {horse.dividend}배</div>
        </div>
      </div>

      {/* Gauge Bar for Win Rate */}
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1 font-bold text-gray-700">
          <span>승률 게이지</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${getProgressColor(horse.win_rate)}`}
            style={{ width: `${Math.min(horse.win_rate, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
