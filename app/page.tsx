import RaceCard from '../components/RaceCard';
import { getUpcomingRaces } from '../services/horseRacing';

// ISR (Incremental Static Regeneration) 설정
// 이 페이지는 3600초(1시간) 동안 캐싱됩니다.
// 사용자가 수만 명 접속해도 1시간에 딱 1번만 getUpcomingRaces()가 호출되므로
// API(혹은 AI) 서버 비용을 극적으로 절감할 수 있습니다.
export const revalidate = 3600;

export default async function Home() {
  // 서버 사이드 렌더링(SSR/SSG) 과정에서 데이터를 가져옵니다.
  const races = await getUpcomingRaces();

  return (
    <main className="min-h-screen bg-gray-100 pb-20">

      {/* 상단 네비게이션 바 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-green-800 tracking-tight">
            🐴 AI경마예측
          </h1>
          <button className="p-2 text-gray-500 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 (모바일 화면 기준 최대 넓이 설정) */}
      <div className="max-w-md mx-auto p-4 mt-2">

        {/* 안내 문구 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-base leading-relaxed">
            <strong className="block text-lg mb-1">AI가 분석한 오늘의 승률입니다.</strong>
            최신 데이터를 바탕으로 예측한 결과로, 배팅 시 참고용으로 활용해 주세요.
          </p>
        </div>

        {/* 경주 카드 목록 */}
        <div className="space-y-6">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>

      </div>
    </main>
  );
}
