import { NextResponse } from 'next/server';

// 파이썬의 FastAPI 라우터 엔드포인트와 유사한 역할을 합니다.
export async function GET(request: Request) {
  // 요청 URL에서 쿼리 파라미터를 파싱합니다.
  const { searchParams } = new URL(request.url);

  // 파이썬의 os.environ.get('RACE_API_SERVICE_KEY') 와 동일하게 환경변수를 가져옵니다.
  const serviceKey = process.env.RACE_API_SERVICE_KEY;

  if (!serviceKey) {
    return NextResponse.json(
      { error: 'RACE_API_SERVICE_KEY is not configured in environment variables' },
      { status: 500 }
    );
  }

  // 외부 API 호출을 위한 기본 URL (고정 파라미터는 _type=json 하나만 유지)
  const baseUrl = 'https://apis.data.go.kr/B551015/API72_2/racePlan_2';

  // 클라이언트가 넘겨준 모든 쿼리 파라미터를 유지한 채 URLSearchParams 객체를 생성합니다.
  const targetParams = new URLSearchParams(searchParams.toString());

  // 인증 키 및 기본 필수 파라미터 덮어쓰기
  // 파이썬의 dict.update() 처럼 동작합니다.
  targetParams.set('ServiceKey', serviceKey);
  targetParams.set('_type', 'json');

  // pageNo, numOfRows, meet 등의 파라미터가 없다면 기본값을 추가합니다.
  if (!targetParams.has('pageNo')) targetParams.set('pageNo', '1');
  if (!targetParams.has('numOfRows')) targetParams.set('numOfRows', '10');
  if (!targetParams.has('meet')) targetParams.set('meet', '1');

  const targetUrl = `${baseUrl}?${targetParams.toString()}`;

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
