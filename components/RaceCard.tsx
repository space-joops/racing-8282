import { Race } from '../types/horseRacing';
import HorseRow from './HorseRow';

interface RaceCardProps {
  race: Race;
}

export default function RaceCard({ race }: RaceCardProps) {
  // AI 점수가 높은 순으로 말들을 정렬합니다.
  const sortedHorses = [...race.horses].sort((a, b) => b.aiScore - a.aiScore);

  return (
    <div className="mb-6 rounded-xl overflow-hidden shadow-md border border-gray-200">

      {/* 헤더 부분: 짙은 녹색으로 경마장 느낌과 신뢰감 부여 */}
      <div className="bg-green-800 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            {race.location} {race.raceNumber}경주
          </h2>
          <p className="text-green-100 mt-1">
            {race.date} | {race.distance}m
          </p>
        </div>
        <div className="bg-white text-green-800 px-3 py-1 rounded-full text-sm font-bold">
          AI 분석완료
        </div>
      </div>

      {/* 출전 말 목록 */}
      <div className="bg-white">
        {sortedHorses.map((horse, index) => (
          <HorseRow key={horse.id} horse={horse} rank={index + 1} />
        ))}
      </div>

      {/* 더보기 / 배팅하러가기 등 액션 버튼 (예시) */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors">
          상세 분석 보기
        </button>
      </div>

    </div>
  );
}
