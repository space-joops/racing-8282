import { Horse } from '../types/horseRacing';

interface HorseRowProps {
  horse: Horse;
  rank: number;
  onBet?: (horse: Horse) => void;
}

export default function HorseRow({ horse, rank, onBet }: HorseRowProps) {
  // AI 점수에 따라 색상과 뱃지 스타일을 다르게 주어 직관성을 높입니다.
  const getScoreBadge = (score: number) => {
    if (score >= 90) return <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg font-bold text-xs">🔥 강력 추천</span>;
    if (score >= 80) return <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-lg font-bold text-xs">⭐ 추천</span>;
    return <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-bold text-xs">보통</span>;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors gap-4">

      {/* 왼쪽: 순위, 마명, 정보 */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm ${rank <= 3 ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
          {rank}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{horse.name}</h3>
            {getScoreBadge(horse.aiScore)}
          </div>
          <p className="text-sm text-gray-500 flex gap-2">
            <span>👤 {horse.jockey}</span>
            <span>📊 {horse.recentForm}</span>
          </p>
        </div>
      </div>

      {/* 오른쪽: AI 점수 및 배팅 버튼 */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right">
          <p className="text-xs text-gray-400 font-bold mb-0.5">AI 승률예측</p>
          <p className="text-2xl font-black text-indigo-600">
            {horse.aiScore.toFixed(1)}<span className="text-base text-indigo-400 font-bold ml-1">%</span>
          </p>
        </div>

        {/* 배팅 버튼 (onBet 콜백 호출) */}
        {onBet && (
          <button
            onClick={() => onBet(horse)}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all transform active:scale-95"
          >
            배팅하기 🪙
          </button>
        )}
      </div>

    </div>
  );
}
