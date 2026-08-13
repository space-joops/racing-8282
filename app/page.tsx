import { getUpcomingRaces } from '../services/horseRacing';
import GameDashboard from '../components/GameDashboard';

// ISR (Incremental Static Regeneration) 설정
// 이 페이지는 3600초(1시간) 동안 캐싱됩니다.
// 사용자가 수만 명 접속해도 1시간에 딱 1번만 getUpcomingRaces()가 호출되므로
// API(혹은 AI) 서버 비용을 극적으로 절감할 수 있습니다.
export const revalidate = 3600;

export default async function Home() {
  // 서버 사이드 렌더링(SSR/SSG) 과정에서 데이터를 가져옵니다.
  const races = await getUpcomingRaces();

  return (
    <main className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* 상단 네비게이션 바 (모바일 앱 스타일) */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-md mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tight flex items-center gap-2">
            🐴 AI경마왕
          </h1>
          <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/*
        메인 콘텐츠 영역
        데이터(races)를 서버에서 가져온 뒤, 모의 배팅 상태를 관리하는
        클라이언트 컴포넌트(GameDashboard)로 넘겨줍니다.
      */}
      <GameDashboard races={races} />

    </main>
  );
}
