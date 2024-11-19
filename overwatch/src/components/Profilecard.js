import React from "react";
import styled from "styled-components";

const Card = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  width: 280px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0)); /* 그라데이션 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  margin-right: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Username = styled.span`
  font-size: 1rem;
  color: black;
`;

const ProfileCard = ({ username, profilePic }) => {
  return (
    <Card>
      <ProfileImage src={profilePic} alt="프로필 사진" />
      <Username>{username}</Username>
    </Card>
  );
};

export default ProfileCard;
