import React from "react";
import styled from "styled-components";
import { useCoin } from "../components/CoinContext"; // Context 사용
import ProfilePic from "../assets/profilecard.png";
import CoinImage from "../assets/coin.png";

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  width: 280px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 8px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Username = styled.span`
  font-size: 1rem;
  color: black;
  font-weight: bold;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 280px;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
`;

const CoinImageStyled = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const ProfileCard = () => {
  const { coins, username } = useCoin(); // 현재 코인과 사용자 이름 가져오기

  return (
    <Wrapper>
      <Card>
        <ProfileImage src={ProfilePic} alt="프로필 사진" />
        <Username>{username}</Username> {/* username 표시 */}
      </Card>
      <CoinInfo>
        <CoinImageStyled src={CoinImage} alt="코인 사진" />
        {coins} Coins
      </CoinInfo>
    </Wrapper>
  );
};


export default ProfileCard;
