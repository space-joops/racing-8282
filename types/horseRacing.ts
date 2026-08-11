// 파이썬의 TypedDict 또는 Pydantic Model과 유사한 역할을 합니다.
// 데이터 구조를 명확히 정의하면 코드를 읽고 유지보수하기 훨씬 쉬워집니다.

export interface Horse {
  id: string;
  name: string;      // 마명 (말 이름)
  jockey: string;    // 기수명
  weight: number;    // 부담중량
  recentForm: string; // 최근 성적 (예: "1-2-3")
  winRate: number;   // 기본 승률 (단승식)
  aiScore: number;   // AI 예측 점수 (0~100)
}

export interface Race {
  id: string;
  date: string;      // 경주 날짜
  location: string;  // 경마장 (예: 서울, 부산경남, 제주)
  raceNumber: number; // 경주 번호 (예: 1경주)
  distance: number;  // 경주 거리 (m)
  horses: Horse[];   // 출전 말 목록
}
