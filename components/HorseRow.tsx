import { Horse } from '../types/horseRacing';

interface HorseRowProps {
  horse: Horse;
  rank: number; // 1등, 2등 표시를 위해
}

export default function HorseRow({ horse, rank }: HorseRowProps) {
  // AI 점수에 따라 색상을 다르게 주어 직관성을 높입니다.
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600 font-bold'; // 매우 높음 (강력 추천)
    if (score >= 80) return 'text-orange-500 font-bold'; // 높음
    return 'text-gray-600'; // 보통
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors">

      {/* 왼쪽: 순위와 마명 */}
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${rank <= 3 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}>
          {rank}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{horse.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            기수: {horse.jockey} | 최근성적: {horse.recentForm}
          </p>
        </div>
      </div>

      {/* 오른쪽: AI 점수 */}
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-1">AI 예측</p>
        <p className={`text-2xl ${getScoreColor(horse.aiScore)}`}>
          {horse.aiScore.toFixed(1)}점
        </p>
      </div>

    </div>
  );
}
