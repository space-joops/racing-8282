"use client";

import React, { useState } from 'react';
import { Race, Horse } from '../types/horseRacing';
import RaceCard from './RaceCard';

interface GameDashboardProps {
  races: Race[];
}

interface BetHistory {
  id: string;
  raceInfo: string;
  horseName: string;
  amount: number;
  time: Date;
}

export default function GameDashboard({ races }: GameDashboardProps) {
  // 모의 지갑 상태 (기본 50,000 포인트)
  const [walletBalance, setWalletBalance] = useState<number>(50000);
  // 배팅 내역 상태
  const [betHistory, setBetHistory] = useState<BetHistory[]>([]);

  // 배팅 처리 함수
  const handleBet = (race: Race, horse: Horse, amount: number = 1000) => {
    if (walletBalance < amount) {
      alert("포인트가 부족합니다! 😢");
      return;
    }

    // 포인트 차감
    setWalletBalance(prev => prev - amount);

    // 배팅 내역 추가
    const newBet: BetHistory = {
      id: Date.now().toString(),
      raceInfo: `${race.location} ${race.raceNumber}경주`,
      horseName: horse.name,
      amount: amount,
      time: new Date()
    };

    setBetHistory(prev => [newBet, ...prev]);

    // 이모지와 함께 간단한 알림창 띄우기 (실제 서비스에서는 토스트 UI 등을 권장)
    alert(`🎉 ${horse.name}에 ${amount.toLocaleString()} 포인트 배팅 완료! 행운을 빕니다! 🍀`);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-2">
      {/* 지갑 및 대시보드 상단 */}
      <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-3xl p-6 mb-8 shadow-lg text-white">
        <h2 className="text-xl font-bold mb-2 opacity-90">나의 지갑 👛</h2>
        <div className="text-4xl font-black mb-4 flex items-center justify-between">
          <span>{walletBalance.toLocaleString()} <span className="text-2xl font-bold opacity-80">P</span></span>
          <span className="text-3xl bg-white bg-opacity-20 p-2 rounded-xl border border-white border-opacity-30">🏇</span>
        </div>
        <p className="text-sm opacity-90">오늘은 어떤 말을 응원해볼까요?</p>
      </div>

      {/* 배팅 내역 (간단히 최근 2건만 표시) */}
      {betHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            📝 최근 배팅 내역
          </h3>
          <ul className="space-y-2">
            {betHistory.slice(0, 2).map(bet => (
              <li key={bet.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800">{bet.horseName}</p>
                  <p className="text-xs text-gray-500">{bet.raceInfo}</p>
                </div>
                <div className="font-bold text-red-500">
                  -{bet.amount.toLocaleString()} P
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 경주 카드 목록 */}
      <h3 className="font-bold text-xl text-gray-800 mb-4 px-1">🔥 오늘의 경주</h3>
      <div className="space-y-6">
        {races.map((race) => (
          <RaceCard key={race.id} race={race} onBet={handleBet} />
        ))}
      </div>
    </div>
  );
}
