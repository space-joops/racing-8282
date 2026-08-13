import { Race, Horse } from '../types/horseRacing';
import HorseRow from './HorseRow';

interface RaceCardProps {
  race: Race;
  onBet?: (race: Race, horse: Horse) => void;
}

export default function RaceCard({ race, onBet }: RaceCardProps) {
  // AI 점수가 높은 순으로 말들을 정렬합니다.
  const sortedHorses = [...race.horses].sort((a, b) => b.aiScore - a.aiScore);

  return (
    <div className="mb-6 rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-white">

      {/* 헤더 부분: 둥근 모서리와 파스텔톤 그라데이션으로 산뜻하게 변경 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
              📍 {race.location}
            </span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
              🏃 {race.distance}m
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            제 {race.raceNumber}경주
          </h2>
        </div>
        <div className="text-right">
          <div className="bg-white text-indigo-600 px-3 py-1.5 rounded-xl text-sm font-black shadow-sm flex items-center gap-1">
            🤖 AI 예측완료
          </div>
        </div>
      </div>

      {/* 출전 말 목록 */}
      <div className="bg-white">
        {sortedHorses.map((horse, index) => (
          <HorseRow
            key={horse.id}
            horse={horse}
            rank={index + 1}
            // HorseRow에서 배팅 버튼 클릭 시, race 정보까지 포함해서 부모(GameDashboard)로 전달
            onBet={onBet ? (h) => onBet(race, h) : undefined}
          />
        ))}
      </div>

    </div>
  );
}
