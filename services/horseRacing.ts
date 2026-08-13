import { Race, KraApiResponse } from '../types/horseRacing';

// 파이썬의 서비스(비즈니스 로직) 레이어에 해당합니다.
// 한국마사회 경주계획표 API를 호출하여 데이터를 가져오고, UI에서 필요한 Race 타입으로 변환합니다.

export async function getUpcomingRaces(): Promise<Race[]> {
  try {
    // 마사회 API URL 생성
    // 파이썬의 requests.get(url, params=...) 와 유사한 방식입니다.
    const baseUrl = 'https://apis.data.go.kr/B551015/API72_2/racePlan_2';
    const params = new URLSearchParams({
      ServiceKey: '23bpr+EAiuuw0XHFfDxZYnQ+FuDhjeyB1bCSAi+KKVsZT/HBt/PsG+WHmaFy+38JwF+pfOQ+G/oVBGnBeDC+BQ==', // 디코딩된 ServiceKey
      pageNo: '1',
      numOfRows: '10',
      meet: '1',
      _type: 'json'
    });

    // next: { revalidate: 3600 } 옵션을 통해 ISR 캐싱 적용
    // 이 옵션으로 인해 1시간(3600초) 동안 서버에 캐시된 응답이 재사용됩니다.
    // 이는 서버 부하 감소 및 API 호출 횟수(비용) 절감에 매우 효과적입니다.
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data: KraApiResponse = await response.json();

    // API 응답 구조 검증 (결과 코드가 "00" 정상일 때만 진행)
    if (data.response?.header?.resultCode !== "00") {
      throw new Error(`API 오류: ${data.response?.header?.resultMsg}`);
    }

    const items = data.response.body.items.item || [];

    // KRA 응답 항목(KraRaceItem)들을 화면 표시용 Race 타입으로 매핑(Mapping)합니다.
    const races: Race[] = items.map((item, index) => {
      // 날짜 포맷팅 (YYYYMMDD -> YYYY-MM-DD)
      const dateStr = String(item.rcDate);
      const formattedDate = dateStr.length === 8
        ? `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
        : dateStr;

      return {
        id: `race-${item.rcDate}-${item.meet}-${item.rcNo}`,
        date: formattedDate,
        location: item.meet,
        raceNumber: item.rcNo,
        distance: item.rcDist,
        // 현재 마사회 '경주계획표' API는 출전 마(Horse) 정보를 제공하지 않으므로,
        // 화면을 깨지 않기 위해 UI를 위한 임시(Mock) 데이터를 채워줍니다.
        // 향후 출전등록 현황 등의 추가 API 연동 시 실제 데이터로 변경 가능합니다.
        horses: generateMockHorses(index)
      };
    });

    return races;

  } catch (error) {
    console.error("경주 데이터 조회 중 오류 발생:", error);
    // 에러 발생 시 빈 배열 반환하여 서버 크래시 방지
    return [];
  }
}

// UI 렌더링을 위해 임시 출전 마 데이터를 생성해주는 헬퍼 함수입니다.
// 파이썬의 헬퍼 메서드(Helper Method)와 동일한 역할입니다.
function generateMockHorses(seed: number) {
  return [
    {
      id: `h1-${seed}`,
      name: "블루매직",
      jockey: "김철수",
      weight: 56.0,
      recentForm: "1-1-2",
      winRate: 15.5,
      aiScore: 92.5
    },
    {
      id: `h2-${seed}`,
      name: "썬더스톰",
      jockey: "박영진",
      weight: 54.5,
      recentForm: "3-2-1",
      winRate: 12.0,
      aiScore: 88.0
    },
    {
      id: `h3-${seed}`,
      name: "비상하는새",
      jockey: "이민수",
      weight: 55.0,
      recentForm: "5-4-3",
      winRate: 5.5,
      aiScore: 65.0
    }
  ];
}
