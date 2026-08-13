import { NextResponse } from 'next/server';

/**
 * [KR]
 * 한국마사회 경주계획표 API를 호출하는 Route Handler 입니다.
 * 파이썬 FastAPI의 `@app.get("/api/race-plan")` 데코레이터와 매핑되는 엔드포인트 함수와 같은 역할을 합니다.
 * Next.js App Router에서는 폴더 경로(`app/api/race-plan`)가 곧 URL 엔드포인트가 되며,
 * 해당 폴더 내의 `route.ts` 파일에서 `GET`, `POST` 등의 이름으로 함수를 export 하여 HTTP 메서드를 정의합니다.
 */
export async function GET(request: Request) {
  // 파이썬의 request.query_params 와 같이 요청 URL의 쿼리 파라미터를 파싱합니다.
  const { searchParams } = new URL(request.url);
  // 최신 데이터를 위해 기본값을 오늘/이번주에 맞게 동적으로 설정하는 로직이 향후 필요합니다.
  const pageNo = searchParams.get('pageNo') || '1';
  const numOfRows = searchParams.get('numOfRows') || '10';
  const meet = searchParams.get('meet') || '1';

  // [KR] 환경변수(Vercel Environment Variables)에서 ServiceKey 로드
  // 파이썬의 `os.environ.get('KRA_SERVICE_KEY')` 와 동일합니다.
  // 보안을 위해 하드코딩하지 않고 Vercel 대시보드에 설정된 값을 사용합니다.
  const serviceKey = process.env.KRA_SERVICE_KEY;

  if (!serviceKey) {
    // API 키가 설정되지 않은 경우 서버 내부 오류 반환 (FastAPI의 HTTPException 500)
    return NextResponse.json(
      { error: '서버 환경 변수 설정 오류: API 키가 누락되었습니다.' },
      { status: 500 }
    );
  }

  // API 호출 URL 구성
  const apiUrl = `https://apis.data.go.kr/B551015/API72_2/racePlan_2?ServiceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&meet=${meet}&_type=json`;

  try {
    /**
     * [KR] ISR (Incremental Static Regeneration) 캐싱 적용
     * 파이썬의 메모리 캐싱(예: @lru_cache)이나 Redis를 통한 TTL 캐싱과 유사한 기능입니다.
     * `next: { revalidate: 3600 }` 옵션은 이 API의 fetch 결과를 3600초(1시간) 동안 서버 엣지(Edge)나 캐시 저장소에 보관하라는 의미입니다.
     * 첫 번째 요청 이후 1시간 이내에 들어오는 모든 요청은 외부 공공데이터 API를 다시 호출하지 않고 캐시된 응답을 즉시 반환하여 트래픽 한도를 아끼고 성능을 최적화합니다.
     */
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 3600 // 1시간(3600초) 단위로 백그라운드에서 캐시 갱신
      }
    });

    if (!response.ok) {
      // FastAPI의 `raise HTTPException(status_code=response.status, detail="API Error")` 와 유사하게 오류를 처리합니다.
      throw new Error(`마사회 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();

    // FastAPI의 `return {"data": data}` (또는 JSONResponse) 와 동일하게 클라이언트에게 JSON 형태로 응답합니다.
    return NextResponse.json(data);
  } catch (error: unknown) {
    // 에러 발생 시 500 Internal Server Error 반환
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
