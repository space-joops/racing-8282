import { Race, Horse } from '../types/horseRacing';

// 파이썬 개발자를 위한 안내:
// 이 파일은 비즈니스 로직 및 외부 API 연동을 담당하는 서비스 레이어입니다.
// Next.js의 fetch API를 사용하여 데이터를 가져옵니다.

export async function getUpcomingRaces(): Promise<Race[]> {
  try {
    // 공공데이터포털 한국마사회 경주계획표 API 호출 URL 및 파라미터 설정
    // ISR(Incremental Static Regeneration) 방식을 사용하여 캐싱을 적용합니다.
    // next: { revalidate: 3600 } 옵션은 파이썬의 @lru_cache(maxsize=1) 과 비슷하지만,
    // 3600초(1시간)마다 백그라운드에서 캐시를 갱신해주는 매우 효율적인 서버단 캐싱 방식입니다.
    const url = 'https://apis.data.go.kr/B551015/API72_2/racePlan_2?ServiceKey=23bpr%2BEAiuuw0XHFfDxZYnQ%2BFuDhjeyB1bCSAi%2BKKVsZT%2FHBt%2FPsG%2BWHmaFy%2B38JwF%2BpfOQ%2BG%2FoVBGnBeDC%2BBQ%3D%3D&pageNo=1&numOfRows=10&meet=1&_type=json';

    const response = await fetch(url, {
      next: { revalidate: 3600 } // 1시간 캐싱
    });

    if (!response.ok) {
      throw new Error(`API fetch failed: ${response.status}`);
    }

    const data = await response.json();
    const items = data?.response?.body?.items?.item || [];

    // API 응답 데이터를 프론트엔드에서 사용하기 좋은 Race 타입으로 매핑(변환)합니다.
    const races: Race[] = items.map((item: Record<string, unknown>) => {
      const raceId = `race-${item.rcDate}-${item.meet}-${item.rcNo}`;

      // 모의 배팅 게임을 위한 가상의 출전 말(Horse) 데이터를 생성합니다.
      // 실제 API에는 말 데이터가 없으므로 임의로 3마리씩 만듭니다.
      const horses: Horse[] = [
        {
          id: `${raceId}-h1`,
          name: "블루매직 🦄",
          jockey: "김철수",
          weight: 56.0,
          recentForm: "1-1-2",
          winRate: 15.5,
          aiScore: 92.5
        },
        {
          id: `${raceId}-h2`,
          name: "썬더스톰 ⚡",
          jockey: "박영진",
          weight: 54.5,
          recentForm: "3-2-1",
          winRate: 12.0,
          aiScore: 88.0
        },
        {
          id: `${raceId}-h3`,
          name: "황금빛질주 ✨",
          jockey: "이민수",
          weight: 55.0,
          recentForm: "5-4-3",
          winRate: 5.5,
          aiScore: 65.0
        }
      ];

      return {
        id: raceId,
        date: String(item.rcDate),
        location: String(item.meet),
        raceNumber: Number(item.rcNo),
        distance: Number(item.rcDist),
        horses: horses
      };
    });

    return races;
  } catch (error) {
    console.error("경주 데이터 조회 실패:", error);
    return []; // 에러 시 빈 배열 반환
  }
}
