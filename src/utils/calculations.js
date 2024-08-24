export const calculatePhenylalanine = (food, amount) => {
    return (food.phenylalanine * amount) / 100;  // 음식의 페닐알라닌 함량을 양에 맞춰 계산
  };
  
  export const calculateRemainingIntake = (totalIntake, limit) => {
    return limit - totalIntake;
  };
  