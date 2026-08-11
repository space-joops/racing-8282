import React from 'react';
import HorseCard from './HorseCard';

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

interface Race {
  id: number;
  number: number;
  time: string;
  distance: string;
  horses: Horse[];
}

export default function RaceList({ races }: { races: Race[] }) {
  if (!races || races.length === 0) {
    return <div className="text-xl text-center py-10 font-bold">경주 정보가 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-black text-center mb-6 text-gray-900 border-b-4 border-gray-900 pb-2">
        오늘의 경마 예상
      </h1>

      {races.map((race) => (
        <div key={race.id} className="mb-10">
          <div className="bg-gray-100 p-3 rounded-t-lg border-t border-l border-r border-gray-300">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md">제 {race.number}경주</span>
              <span>{race.time} | {race.distance}</span>
            </h2>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-300 rounded-b-lg">
            {race.horses.map((horse) => (
              <HorseCard key={horse.id} horse={horse} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
