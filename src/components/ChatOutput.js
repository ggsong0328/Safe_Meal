import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const OutputContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  margin-top: 10px;  /* 입력창과 메시지 출력 부분 사이의 간격 조정 */
`;


const ResponseBubble = styled.div`
  background: ${({ fromUser }) => (fromUser ? '#6475E5' : '#f4f4f4')};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 1rem;
  color: ${({ fromUser }) => (fromUser ? '#fff' : '#2c3e50')};
  align-self: ${({ fromUser }) => (fromUser ? 'flex-end' : 'flex-start')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-in-out;

  /* 사용자 입력일 때 오른쪽에 공간을 남기고, 시스템 응답일 때 왼쪽에 공간을 남기기 */
  margin-left: ${({ fromUser }) => (fromUser ? '15px' : 'auto')};
  margin-right: ${({ fromUser }) => (fromUser ? 'auto' : '15px')};
  max-width: 70%; /* 메시지 버블의 최대 너비를 설정하여 더 작은 화면에서 적절하게 표시되도록 함 */
`;


const ChatOutput = ({ responses }) => {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <OutputContainer ref={outputRef}>
      {responses.map((response, index) => (
        <ResponseBubble key={index} fromUser={response.fromUser}>
          {response.text}
        </ResponseBubble>
      ))}
    </OutputContainer>
  );
};

export default ChatOutput;
