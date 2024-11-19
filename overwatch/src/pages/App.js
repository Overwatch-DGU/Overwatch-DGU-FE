import React from 'react';
import styled from 'styled-components';
import OWLogo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #92A1BB;
  font-family: 'Arial', sans-serif;
  position: relative; 
`;

const Logo = styled.div`
  text-align: center;
`;

const LogoImage = styled.img`
  width: 450px;
  height: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
  transform: translate(-0%, -60%); 
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AccessButton = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 1rem;
  background-color: #ff9900;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #cc7a00;
  }
`;


const Footer = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 0.8rem;
  color: #555;
`;

const OverwatchScreen = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router 훅

  const handleLogin = (e) => {
    e.preventDefault(); // 기본 동작 방지
    navigate('/dashboard'); // "/dashboard" 경로로 이동
  };
  return (
    <Container>
      <Logo>
        <LogoImage
          src={OWLogo}
          alt="Overwatch Logo"
        />
      </Logo>
      <Form>
        <Input type="email" placeholder="이메일 주소" required />
        <Input type="password" placeholder="비밀번호" required />
        <AccessButton onClick={handleLogin}>접속</AccessButton>
      </Form>
      <Footer>© 2016 - 2022 BLIZZARD ENTERTAINMENT, INC. ALL RIGHTS RESERVED.</Footer>
    </Container>
  );
};

export default OverwatchScreen;
