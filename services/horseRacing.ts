import { Race } from '../types/horseRacing';

// 파이썬의 서비스(비즈니스 로직) 레이어에 해당합니다.
// 현재는 임시(Mock) 데이터를 반환하지만, 나중에 이 함수 내부만 AI API 호출 코드로 바꾸시면 됩니다.

export async function getUpcomingRaces(): Promise<Race[]> {
  // 실제 API 연동 시에는 아래와 같이 변경할 수 있습니다.
  // const response = await fetch('https://api.myai.com/v1/races');
  // return response.json();

  // 현재는 데이터베이스나 외부 API 대신 임시 데이터를 즉시 반환합니다.
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
