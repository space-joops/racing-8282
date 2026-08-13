import { NextResponse } from 'next/server';

// 파이썬의 FastAPI 라우터 엔드포인트와 유사한 역할을 합니다.
export async function GET(request: Request) {
  // 요청 URL에서 쿼리 파라미터를 파싱합니다.
  const { searchParams } = new URL(request.url);

  // 클라이언트에서 전달받은 파라미터들 (없을 경우 기본값 설정)
  const pageNo = searchParams.get('pageNo') || '1';
  const numOfRows = searchParams.get('numOfRows') || '10';
  const meet = searchParams.get('meet') || '1';

  // 한국마사회 경주계획표 API URL 및 쿼리스트링 구성
  // 파이썬의 os.environ.get('RACE_API_SERVICE_KEY') 와 동일하게 환경변수를 가져옵니다.
  const serviceKey = process.env.RACE_API_SERVICE_KEY;

  if (!serviceKey) {
    return NextResponse.json(
      { error: 'RACE_API_SERVICE_KEY is not configured in environment variables' },
      { status: 500 }
    );
  }

  const targetUrl = `https://apis.data.go.kr/B551015/API72_2/racePlan_2?ServiceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&meet=${meet}&_type=json`;

  try {
    // 외부 API 호출
    // 파이썬의 requests.get(..., headers={'Cache-Control': '...'}) 또는
    // @lru_cache, @cache 데코레이터처럼 동작하는 부분입니다.
    // next: { revalidate: 3600 } 옵션을 통해 1시간(3600초) 단위로 ISR 캐싱을 수행합니다.
    const res = await fetch(targetUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // 응답이 정상이 아닐 경우 에러 처리
      throw new Error(`API fetch failed with status: ${res.status}`);
    }

    const data = await res.json();

    // 파이썬의 return JSONResponse(content=data) 와 동일하게
    // 클라이언트에게 JSON 형태로 데이터 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching race plan:', error);
    // 에러 발생 시 500 에러와 함께 에러 메시지 반환
    return NextResponse.json(
      { error: 'Failed to fetch race plan data' },
      { status: 500 }
    );
  }
}
