'use client';

import { useState, useEffect } from 'react';

interface OddsTabProps {
  raceId: string;
}

export default function OddsTab({ raceId }: OddsTabProps) {
  const [odds, setOdds] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchOdds = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (isMounted) {
          setOdds((Math.random() * 10 + 1).toFixed(1));
        }
      } catch (error) {
        console.error("배당률 로딩 에러:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Initial fetch, executed cleanly
    fetchOdds();

    const interval = setInterval(fetchOdds, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [raceId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-bold text-gray-800">실시간 예상 배당률</h3>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setOdds((Math.random() * 10 + 1).toFixed(1));
              setLoading(false);
            }, 500);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-3 py-1 rounded"
        >
          {loading ? '새로고침 중...' : '↻ 새로고침'}
        </button>
      </div>
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-2">현재 복승식 최고 배당률 추정치</p>
        <div className="text-4xl font-black text-red-600">
          {odds ? `${odds} 배` : '-'}
        </div>
      </div>
    </div>
  );
}
