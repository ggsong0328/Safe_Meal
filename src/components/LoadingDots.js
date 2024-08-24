import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;  /* 왼쪽 정렬로 설정 */
  align-items: center;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;  /* 내용에 맞춰 너비 설정 */
`;

const Dot = styled.div`
  width: 6px;  /* 점 크기 축소 */
  height: 6px;
  background-color: #3498db;
  border-radius: 50%;
  margin: 0 2px;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay || '0s'};
`;

const LoadingDots = () => {
  return (
    <LoadingContainer>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </LoadingContainer>
  );
};

export default LoadingDots;
