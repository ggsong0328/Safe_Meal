import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './components/ChatInput';
import ChatOutput from './components/ChatOutput';
import LoadingDots from './components/LoadingDots';
import { parseInput } from './utils/parseInput';
import { calculatePhenylalanine, calculateRemainingIntake } from './utils/calculations';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  justify-content: center;
`;

const PhoneContainer = styled.div`
  width: 375px;
  height: 667px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  padding-bottom: 10px;
`;

const TitleBar = styled.div`
  height: 50px;
  width: 100%;
  background-color: #6475E5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1; /* 다른 요소들보다 위에 위치하도록 */
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 60px 10px 10px; /* 타이틀 바의 높이만큼 패딩을 추가 */
  overflow-y: auto;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  background-color: #f0f4f8;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const ResetButton = styled.button`
  width: 375px;
  padding: 10px;
  margin-top: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;

function App() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const dailyLimit = 300;
  const [totalIntake, setTotalIntake] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    setResponses([{ text: '안녕하세요! 오늘 하루 식단을 추천해 주거나, 먹은 음식을 알려주시면 메뉴 추천을 해드려요!', fromUser: false }]);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [responses]);

  const addResponse = (response) => {
    setResponses(prevResponses => [...prevResponses, response]);
  };

  const handleUserInput = (input) => {
    addResponse({ text: input, fromUser: true });

    setLoading(true);

    if (input.includes('오늘 하루 식단을 추천해줘')) {
      const dietResponses = [
        "페닐케톤뇨증(PKU) 환자를 위한 하루 식단을 제안합니다. 각 식사는 250mg의 페닐알라닌을 포함하도록 조합하였습니다.",
        "식단 1",
        "아침: 밥 (100g): 30mg, 오이무침 (50g): 10mg, 두부조림 (50g): 80mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 120mg",
        "점심: 밥 (100g): 30mg, 시금치나물 (50g): 20mg, 버섯볶음 (50g): 50mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 100mg",
        "저녁: 밥 (100g): 30mg, 브로콜리 (50g): 20mg, 감자조림 (50g): 60mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 110mg",
        "총 섭취량: 330mg",
        "--------------------------------",
        "식단 2",
        "아침: 밥 (100g): 30mg, 무생채 (50g): 10mg, 애호박볶음 (50g): 40mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 80mg",
        "점심: 밥 (100g): 30mg, 콩나물무침 (50g): 20mg, 가지볶음 (50g): 30mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 80mg",
        "저녁: 밥 (100g): 30mg, 양배추샐러드 (50g): 10mg, 당근조림 (50g): 30mg, 커피 (무가당, 1컵): 0mg | 총 페닐알라닌: 70mg",
        "총 섭취량: 230mg",
        "--------------------------------",
        "이 식단은 각각 250mg 이하의 페닐알라닌을 포함하고 있으며, 다양한 반찬과 커피를 포함하여 균형 잡힌 식사를 제공합니다. 필요에 따라 조정할 수 있습니다."
      ];

      setResponses(prevResponses => [...prevResponses, { text: <LoadingDots />, fromUser: false }]);

      setTimeout(() => {
        setLoading(false);
        setResponses(prevResponses => prevResponses.slice(0, -1)); // 로딩 제거
        dietResponses.forEach((response, index) => {
          setTimeout(() => {
            addResponse({ text: response, fromUser: false });
          }, 1000 * (index + 1));
        });
      }, 1500);

      return;
    }

    const parsedFoods = parseInput(input);
    let intake = 0;
    let newResponses = [];

    if (parsedFoods.length === 0) {
      newResponses.push("음식을 인식할 수 없습니다. 다시 입력해 주세요.");
    } else {
      parsedFoods.forEach(foodItem => {
        const phenylalanine = calculatePhenylalanine(foodItem.foodData, foodItem.amount);
        intake += phenylalanine;
        newResponses.push(`${foodItem.name} ${foodItem.amount}g 섭취: 약 ${phenylalanine}mg의 페닐알라닌을 포함합니다.`);
      });

      const newTotalIntake = totalIntake + intake;
      setTotalIntake(newTotalIntake);

      const remainingIntake = calculateRemainingIntake(newTotalIntake, dailyLimit);
      if (remainingIntake > 120) {
        newResponses.push(`현재까지 섭취한 페닐알라닌: ${newTotalIntake}mg`);
        newResponses.push(`오늘 남은 섭취 가능량: ${remainingIntake}mg`);
        newResponses.push(`충분한 여유가 있습니다. 저녁에는 저단백 쌀밥, 구운 채소, 과일 샐러드를 드시는 것을 추천드립니다.`);
      } else if (remainingIntake > 60) {
        newResponses.push(`현재까지 섭취한 페닐알라닌: ${newTotalIntake}mg`);
        newResponses.push(`오늘 남은 섭취 가능량: ${remainingIntake}mg`);
        newResponses.push(`섭취 가능량이 줄어들고 있습니다. 저녁에는 페닐알라닌 함량이 적은 식사를 권장합니다.`);
      } else if (remainingIntake > 0) {
        newResponses.push(`현재까지 섭취한 페닐알라닌: ${newTotalIntake}mg`);
        newResponses.push(`오늘 남은 섭취 가능량: ${remainingIntake}mg`);
        newResponses.push(`목표 섭취량에 거의 도달했습니다. 저녁에는 아주 소량의 페닐알라닌만 섭취하세요.`);
      } else {
        newResponses.push(`현재까지 섭취한 페닐알라닌: ${newTotalIntake}mg`);
        newResponses.push(`경고: 오늘 섭취량을 초과했습니다! 더 이상 페닐알라닌을 섭취하지 마세요.`);
      }
    }

    setResponses(prevResponses => [...prevResponses, { text: <LoadingDots />, fromUser: false }]);

    setTimeout(() => {
      setLoading(false);
      setResponses(prevResponses => prevResponses.slice(0, -1));
      newResponses.forEach((response, index) => {
        setTimeout(() => {
          addResponse({ text: response, fromUser: false });
        }, 1000 * (index + 1));
      });
    }, 1500);
  };

  const handleReset = () => {
    setTotalIntake(0);
    setResponses([
      { text: '섭취한 페닐알라닌이 초기화되었습니다. 다시 시작할 수 있습니다!', fromUser: false },
      { text: '안녕하세요! 오늘 하루 식단을 추천해 주거나, 먹은 음식을 알려주시면 메뉴 추천을 해드려요!', fromUser: false }
    ]);
  };

  return (  
    <AppContainer>
      <PhoneContainer>
        <TitleBar>SAFEMEAL</TitleBar>
        <ContentContainer ref={contentRef}>
          <ChatOutput responses={responses} />
        </ContentContainer>
        <InputContainer>
          <ChatInput onUserInput={handleUserInput} />
        </InputContainer>
      </PhoneContainer>
      <ResetButton onClick={handleReset}>섭취량 초기화</ResetButton>
    </AppContainer>
  );
}

export default App;
