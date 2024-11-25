import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/Profilecard";

// Styled Components
const Container = styled.div`
  height: 100vh;
  background-color: #92a1bb;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  position: relative;
`;

const TopLeftText = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  font-size: 70px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  padding: 10px 20px;
  font-family: GowunDodum-Regular;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 90px;
  right: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f77f00;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e66d00;
  }
`;

const CharactersGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 3000px;
  padding: 190px 20px;
`;

const CharacterCard = styled.div`
  position: relative;
  width: 300px;
  height: 320px;
  margin: 30px;
  border: 3px solid gray;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  transform: skewX(-14deg);
  transition: transform 0.1s, background-color 0.6s;

  &:hover {
    background-color: #f77f00;
    transform: scale(1.3) skewX(-14deg);
    z-index: 1;
  }
`;

const CharacterImage = styled.div`
  width: 140%;
  height: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  transform: skewX(14deg) translateX(-16px);
`;

const CharacterName = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 5px 10px;
  text-align: center;
`;

const CharacterSelector = () => {
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const type = new URLSearchParams(location.search).get("type");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const url = type === "shop" 
          ? "http://localhost:8080/api/shop/characters"
          : "http://localhost:8080/api/gifts/characters";
        const response = await axios.get(url);
        setCharacters(response.data);
      } catch (error) {
        console.error("캐릭터 데이터 로딩 실패:", error);
      }
    };

    fetchCharacters();
  }, [type]);

  const handleCharacterClick = (characterId) => {
    const targetPath = type === "shop" ? `/store/${characterId}` : `/gift/${characterId}`;
    navigate(targetPath);
  };

  const handleLogButtonClick = (e) => {
    e.preventDefault();
    navigate("/log");
  };

  return (
    <Container>
      <TopLeftText>{type === "shop" ? "상 점" : "선물하기"}</TopLeftText>
      <ProfileCard />
      {type === "gift" && (
        <ButtonWrapper>
          <Button onClick={handleLogButtonClick}>로그 및 통계</Button>
        </ButtonWrapper>
      )}
      <CharactersGrid>
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard
              key={character.characterId}
              onClick={() => handleCharacterClick(character.characterId)}
            >
<CharacterImage url={character.image} />
              <CharacterName>{character.name}</CharacterName>
            </CharacterCard>
          ))
          
        ) : (
          <div>로딩 중...</div>
        )}
      </CharactersGrid>
    </Container>
  );
};

export default CharacterSelector;
