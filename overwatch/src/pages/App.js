import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import OWLogo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import { useCoin } from '../components/CoinContext'; // CoinContext import

// Styled Components (기존 코드 유지)
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCoins, setUsername } = useCoin(); // setUsername 가져오기
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });
      console.log('로그인 성공:', response.data);

      // 응답에서 username과 coin 값을 추출하고 CoinContext에 설정
      const userCoins = response.data.coin;
      const userUsername = response.data.username; // 응답에서 username 값 추출
      setCoins(userCoins); // CoinContext의 coins 상태 업데이트
      setUsername(userUsername); // CoinContext의 username 상태 업데이트

      navigate('/pick');
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      alert('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Logo>
        <LogoImage src={OWLogo} alt="Overwatch Logo" />
      </Logo>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <AccessButton type="submit">Login</AccessButton>
      </Form>
      <Footer>© 2016 - 2022 BLIZZARD ENTERTAINMENT, INC. ALL RIGHTS RESERVED.</Footer>
    </Container>
  );
};

export default OverwatchScreen;
