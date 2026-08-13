'use client';

import { sendGAEvent } from '@next/third-parties/google';

export default function UnlockButton() {
  const handleUnlockClick = () => {
    // GA4 이벤트 트래킹 발송
    sendGAEvent({ event: 'unlock_ai_pick', value: 'premium_click' });
    alert("프리미엄 AI 예측 보기 (유료화 테스트 팝업)");
  };

  return (
    <button
      onClick={handleUnlockClick}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xl py-4 rounded-xl shadow-lg transition-colors active:scale-95"
    >
      오늘의 AI 추천 픽 보기 🔒
    </button>
  );
}
