// PickScreen.js (메인 화면)
import React from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/bg.png"; // 배경 이미지
import TextLogo from "../assets/TextLogo.png";
import ProfileCard from "../components/Profilecard"; // 분리된 컴포넌트 임포트
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: "Arial", sans-serif;
  color: white;
  padding: 20px;
  overflow: hidden;
`;

// Background-related styles
const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

const Overwatch = styled.img`
  position: absolute;
  top: -30px;
  left: 10px;
  width: 300px;
  height: auto;
  z-index: 2;
`;

// Menu styles
const MenuList = styled.div`
  position: absolute;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MenuItem = styled.div`
  font-family: GowunDodum-Regular;
  font-size: 3rem;
  font-weight: bold;
  font-style: italic;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: orange;
    transform: scale(1.05);
    transition: 0.3s;
  }
`;

const Badge = styled.span`
  background-color: yellow;
  color: black;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 3px 5px;
  border-radius: 5px;
`;

const PickScreen = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router 훅

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      {/* 흐린 배경 */}
      <BackgroundWrapper>
        <Background />
      </BackgroundWrapper>
      <Overwatch src={TextLogo} alt="Overwatch Logo" />

      {/* 분리된 프로필 카드 */}
      <ProfileCard />

      {/* 메뉴 리스트 */}
      <MenuList>
        <MenuItem onClick={() => handleNavigation("/hero?type=shop")}>
          상 점<Badge>신규!</Badge>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/hero?type=gift")}>
          선물하기
        </MenuItem>
      </MenuList>
    </Container>
  );
};

export default PickScreen;
