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

// 한국마사회(KRA) API 응답을 위한 타입 정의입니다.
// 파이썬의 dict 구조를 명시적으로 타입화(Type Hinting)한 것과 동일합니다.
export interface KraRaceItem {
  ageCond: string;   // 연령조건 (예: "2세", "연령오픈")
  budam: string;     // 부담조건 (예: "별정A", "핸디캡")
  chaksun1: number;  // 1착 상금
  meet: string;      // 경마장 (예: "서울", "부산경남")
  rank: string;      // 등급 (예: "국6등급")
  rcDate: number;    // 경주 일자 (예: 20260817)
  rcDist: number;    // 경주 거리 (예: 1000)
  rcName: string;    // 경주 명칭 (예: "일반")
  rcNo: number;      // 경주 번호 (예: 1)
  schStTime: number; // 출발 예정 시간 (예: 1035)
  sexCond: string;   // 성별 조건 (예: "성별오픈")
}

export interface KraApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: KraRaceItem[]; // 경주 목록 배열
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
