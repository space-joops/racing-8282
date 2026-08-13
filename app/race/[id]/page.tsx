import { getUpcomingRaces } from '../../../services/horseRacing';
import OddsTab from '../../../components/OddsTab';
import Link from 'next/link';

// ISR (Incremental Static Regeneration) 설정
// 특정 경주 상세 정보도 1시간 동안 캐싱됩니다.
export const revalidate = 3600;

interface RacePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RacePage({ params }: RacePageProps) {
  // 실제 서비스 시 해당 ID의 경주 정보를 불러오는 API 사용 (현재는 임시 데이터 매칭)
  const resolvedParams = await params;
  const races = await getUpcomingRaces();
  const race = races.find(r => r.id === resolvedParams.id) || races[0];

  return (
    <main className="min-h-screen bg-gray-100 pb-20">

      {/* 상단 네비게이션 */}
      <header className="bg-white shadow-sm sticky top-0 z-10 flex items-center p-4">
        <Link href="/" className="mr-4 text-green-700 hover:text-green-900 font-bold">
          ← 뒤로가기
        </Link>
        <h1 className="text-xl font-black text-gray-900 truncate">
          {race.date} {race.location} {race.raceNumber}경주
        </h1>
      </header>

      <div className="max-w-md mx-auto p-4 mt-2">
        {/* 경주 기본 정보 */}
        <section className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-4">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">경주 정보</span>
              <h2 className="text-2xl font-black mt-2 text-gray-800">{race.distance}m</h2>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">출전마 리스트</h3>
          <ul className="space-y-4">
            {race.horses.map((horse, idx) => (
              <li key={horse.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{horse.name}</p>
                    <p className="text-sm text-gray-500">기수: {horse.jockey} | 전적: {horse.recentForm}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 실시간 배당률 탭 (Client-side Data Fetching 적용 컴포넌트) */}
        <section>
          <OddsTab raceId={race.id} />
        </section>

      </div>
    </main>
  );
}
