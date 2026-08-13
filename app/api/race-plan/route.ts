import { NextResponse } from 'next/server';

// Next.js 라우트 핸들러 캐싱 설정
// request.url 등 동적 API를 사용하므로 이 라우트는 기본적으로 동적으로 처리되지만,
// 내부의 fetch는 next: { revalidate: 3600 } 옵션을 통해 캐싱(ISR)이 적용됩니다.
// 따라서 아래 revalidate 옵션은 주석 처리하거나 제거하는 것이 Next.js 14+ 빌드 시
// "Dynamic server usage" 에러 메시지를 정적 렌더링 시도 과정에서 뱉는 것을 막는 가장 확실한 방법 중 하나입니다.
// 명시적으로 동적 라우트임을 알려주는 옵션을 사용합니다.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // API 키와 엔드포인트 URL
    // 환경 변수에서 API 키를 불러옵니다. 빌드 환경이나 로컬 개발 시에는 API 키가 없을 수 있으므로 예외 처리를 유연하게 합니다.
    const API_KEY = process.env.KRA_API_KEY || "dummy_key_for_build";

    const BASE_URL = "https://apis.data.go.kr/B551015/API72_2/racePlan_2";

    // 클라이언트의 요청 URL에서 쿼리 파라미터를 파싱합니다.
    const { searchParams } = new URL(request.url);
    const pageNo = searchParams.get('pageNo') || '1';
    const numOfRows = searchParams.get('numOfRows') || '10';
    const meet = searchParams.get('meet') || '1';

    // 최종적으로 호출할 API URL 구성
    const apiUrl = `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&meet=${meet}&_type=json`;

    // fetch 함수 호출
    // next: { revalidate: 3600 } 옵션을 통해 1시간마다 새로운 데이터를 받아오고 (백그라운드),
    // 그 사이의 요청은 캐시된 응답을 매우 빠르게 제공합니다.
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    // 외부 API 호출 실패 시 에러 처리
    if (!response.ok) {
      throw new Error(`KRA API 응답 에러: ${response.status}`);
    }

    const data = await response.json();

    // 정상적으로 가져온 데이터를 JSON 형태로 클라이언트에 반환
    return NextResponse.json(data);
  } catch (error) {
    // 에러 발생 시 500 에러와 함께 에러 메시지를 반환
    console.error("경주계획표 API 호출 중 에러 발생:", error);
    return NextResponse.json(
      { error: "경주계획표 데이터를 가져오는 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}
