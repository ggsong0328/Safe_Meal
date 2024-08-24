import foodData from '../data/foodData';

export const parseInput = (input) => {
  const parsedData = [];

  foodData.forEach(food => {
    if (input.includes(food.name)) {
      const amountMatch = input.match(/(\d+)\s?(개|g)/);
      let amount = 100; // 기본 값 100g
      if (amountMatch) {
        const unit = amountMatch[2];
        if (unit === '개') {
          amount = parseInt(amountMatch[1]) * 100; // 1개를 100g으로 가정
        } else if (unit === 'g') {
          amount = parseInt(amountMatch[1]);
        }
      }
      parsedData.push({ name: food.name, amount, foodData: food });
    }
  });

  return parsedData;
};
