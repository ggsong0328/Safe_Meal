import React from 'react';
import { calculateRemainingIntake } from '../utils/parseInput';

const Recommendation = ({ totalIntake, dailyLimit }) => {
  const remainingIntake = calculateRemainingIntake(totalIntake, dailyLimit);

  if (remainingIntake < 0) {
    return <div style={{ color: 'red' }}>경고: 오늘 섭취량을 초과했습니다!</div>;
  }

  return (
    <div>
      <p>오늘 남은 섭취 가능량: {remainingIntake}mg 페닐알라닌</p>
      {remainingIntake > 100 ? (
        <p>추천 메뉴: 과일 샐러드, 저단백 스낵</p>
      ) : (
        <p>추천 메뉴: 가벼운 야채 스낵</p>
      )}
    </div>
  );
};

export default Recommendation;
