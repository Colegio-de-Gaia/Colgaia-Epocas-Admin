import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const TextInput = styled.input`
  background: white;
  border: none;
  border-radius: 5px;
  border: 1px solid #ededed;
  color: #969696;
  font-weight: bold;
  height: 40px;
  width: 300px;
  margin-bottom: 10px;
  padding: 0 10px;
`;

export const Button = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 40px;
  color: white;
  background-color: #124a2a;
  transition: all 0.2s;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0c2416;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #124a2a;
`;
