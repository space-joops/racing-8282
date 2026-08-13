import { Race } from '../types/horseRacing';

// 파이썬의 서비스(비즈니스 로직) 레이어에 해당합니다.
// KRA 공공데이터 API를 직접 호출하여 서버 컴포넌트에서 ISR을 적용합니다.

export async function getUpcomingRaces(): Promise<Race[]> {
  try {
    const API_KEY = process.env.KRA_API_KEY || "dummy_key_for_build";
    const BASE_URL = "https://apis.data.go.kr/B551015/API72_2/racePlan_2";

    const apiUrl = `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=1&numOfRows=10&meet=1&_type=json`;

    // Next.js fetch 캐싱 (ISR)
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`KRA API 응답 에러: ${response.status}`);
      return getMockData(); // 에러 시 폴백
    }

    // const data = await response.json();

    // 실제 API 연동 시 data.response.body.items 구조를 파싱하여 Race[] 형태로 매핑합니다.
    // 현재는 API 응답 형태를 콘솔로 확인하고, 프론트엔드 UI를 위해 임시 데이터를 반환합니다.
    // TODO: 실제 JSON 스키마에 맞게 매핑 로직 구현
    // console.log("API Data:", data);

    return getMockData();

  } catch (error) {
    console.error("경주 데이터를 가져오는 중 에러 발생:", error);
    return getMockData(); // 에러 시 폴백
  }
}

function getMockData(): Race[] {
  return [
    {
      id: "race-20231027-seoul-1",
      date: "2023-10-27",
      location: "서울",
      raceNumber: 1,
      distance: 1200,
      horses: [
        {
          id: "h1",
          name: "블루매직",
          jockey: "김철수",
          weight: 56.0,
          recentForm: "1-1-2",
          winRate: 15.5,
          aiScore: 92.5
        },
        {
          id: "h2",
          name: "썬더스톰",
          jockey: "박영진",
          weight: 54.5,
          recentForm: "3-2-1",
          winRate: 12.0,
          aiScore: 88.0
        },
        {
          id: "h3",
          name: "비상하는새",
          jockey: "이민수",
          weight: 55.0,
          recentForm: "5-4-3",
          winRate: 5.5,
          aiScore: 65.0
        }
      ]
    },
    {
      id: "race-20231027-busan-2",
      date: "2023-10-27",
      location: "부산경남",
      raceNumber: 2,
      distance: 1400,
      horses: [
        {
          id: "h4",
          name: "황금빛질주",
          jockey: "최강자",
          weight: 57.0,
          recentForm: "1-1-1",
          winRate: 25.0,
          aiScore: 95.0
        },
        {
          id: "h5",
          name: "다이아몬드",
          jockey: "정성공",
          weight: 53.0,
          recentForm: "2-4-2",
          winRate: 10.0,
          aiScore: 78.5
        }
      ]
    }
  ];
}
