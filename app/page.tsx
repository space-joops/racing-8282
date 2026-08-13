import RaceCard from '../components/RaceCard';
import { getUpcomingRaces } from '../services/horseRacing';
import UnlockButton from '../components/UnlockButton';

// ISR (Incremental Static Regeneration) 설정
// 이 페이지는 3600초(1시간) 동안 캐싱됩니다.
export const revalidate = 3600;

export default async function Home() {
  // 서버 사이드 렌더링(SSR/SSG) 과정에서 데이터를 가져옵니다.
  const races = await getUpcomingRaces();

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
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
      <div className="max-w-md mx-auto p-4 mt-2 space-y-8">

        {/* 상단: 안내 문구 */}
        <section>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-base leading-relaxed">
              <strong className="block text-xl mb-1">AI가 분석한 오늘의 승률입니다.</strong>
              최신 데이터를 바탕으로 예측한 결과로, 배팅 시 참고용으로 활용해 주세요.
            </p>
          </div>
        </section>

        {/* 중단: 각 경마장별 경주 시간 타임라인 (가로 스크롤) */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 px-1">오늘의 주요 경주 타임라인</h2>
          <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-hide">
            <div className="snap-center shrink-0 w-48 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-blue-600 mb-1 block">서울경마장</span>
              <p className="text-lg font-black text-gray-900">14:00 - 1경주</p>
              <p className="text-sm text-gray-500 mt-1">총 12두 출전</p>
            </div>
            <div className="snap-center shrink-0 w-48 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-red-600 mb-1 block">부산경남경마장</span>
              <p className="text-lg font-black text-gray-900">14:30 - 2경주</p>
              <p className="text-sm text-gray-500 mt-1">총 10두 출전</p>
            </div>
            <div className="snap-center shrink-0 w-48 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm font-bold text-orange-500 mb-1 block">제주경마장</span>
              <p className="text-lg font-black text-gray-900">15:10 - 3경주</p>
              <p className="text-sm text-gray-500 mt-1">총 10두 출전</p>
            </div>
          </div>
        </section>

        {/* 경주 카드 목록 */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 px-1">하이라이트 대상경주</h2>
          <div className="space-y-4">
            {races.map((race) => (
              <RaceCard key={race.id} race={race} />
            ))}
          </div>
        </section>

        {/* 하단: 유료화 테스트용 AI 추천 픽 버튼 (Client Component 분리 필요) */}
        <section className="mt-8 mb-4">
          <UnlockButton />
        </section>

      </div>
    </main>
  );
}
