import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;
  background-color: #f0f4f8;
  padding: 10px;
  padding-right: 30px;
  display: flex;
  justify-content: center;
`;

const InputForm = styled.form`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;  /* 입력 필드가 가능한 한 최대한의 너비를 차지하도록 설정 */
  padding: 10px;
  border-radius: 20px 0 0 20px;  /* 입력 필드의 좌측 상단 및 하단을 둥글게 */
  border: 1px solid #ccc;
  font-size: 1rem;
  border-right: none;  /* 입력 필드와 버튼 사이의 경계선 제거 */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #6475E5;
  color: #fff;
  border: none;
  border-radius: 0 20px 20px 0;  /* 버튼의 우측 상단 및 하단을 둥글게 */
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const ChatInput = ({ onUserInput }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onUserInput(input);
      setInput('');  // 입력 후 텍스트 필드 초기화
    }
  };

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="오늘 먹은 음식을 입력하세요..."
        />
        <Button type="submit">입력</Button>
      </InputForm>
    </InputContainer>
  );
};

export default ChatInput;
