import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";  // useNavigate 추가
import ProfileCard from "../components/Profilecard"; 

// Styled Components
const Container = styled.div`
  height: 100vh;
  background-color: #92A1BB;
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

// 상단 왼쪽에 고정될 텍스트
const TopLeftText = styled.div`
  position: absolute;
  font-style: italic;
  top: 40px;
  left: 20px;
  font-size: 90px;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  background-clip: text;
  -webkit-background-clip: text; /* For Safari */
  padding: 10px 20px;
  font-family: GowunDodum-Regular;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 90px;
  right: 30px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f77f00;
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #e66d00;
  }
  `;
const HeroesGrid = styled.div`
  display: flex;
  justify-content: center;
  max-width: 3000px;
  margin: 0;
  padding: 190px 20px;
`;

const HeroCard = styled.div`
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

const HeroImage = styled.div`
  width: 140%;
  height: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 250px;
  transform: skewX(14deg) translateX(-16px);
`;

const HeroName = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  text-align: center;
`;

const LogoWrapper = styled.div`
  max-width: 300px;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 100%;
`;

// Filtered heroes: Only indices 0, 12, and 21 are kept
const heroes = [
  { id: 21, image: "https://raw.githubusercontent.com/ParkYoungWoong/overwatch-hero-selector-vanilla/master/images/hero22.png", name: "시그마" },
  { id: 12, image: "https://raw.githubusercontent.com/ParkYoungWoong/overwatch-hero-selector-vanilla/master/images/hero13.png", name: "맥크리" },
  { id: 0, image: "https://raw.githubusercontent.com/ParkYoungWoong/overwatch-hero-selector-vanilla/master/images/hero1.png", name: "아나" },
];

const HeroSelector = () => {
  const location = useLocation();
  const navigate = useNavigate();  // navigate 함수 추가
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const handleHeroClick = (heroId) => {
    if (type === "shop") {
      navigate(`/store/${heroId}`);
    } else if (type === "gift") {
      navigate(`/gift/${heroId}`);
    }
  };

  return (
    <Container>
      <TopLeftText>
        {type === "shop" && <div>상 점</div>}
        {type === "gift" && <div>선물하기</div>}
      </TopLeftText>
      <ProfileCard />
      {type === "gift" && (
        <ButtonWrapper>
          <Button onClick={() => alert("로그 및 통계 보기 클릭!")}>로그 및 통계</Button>
        </ButtonWrapper>
      )}
      
      <HeroesGrid>
        {heroes.map((hero) => (
          <HeroCard key={hero.id} onClick={() => handleHeroClick(hero.id)}>
            <HeroImage style={{ backgroundImage: `url(${hero.image})` }} />
            <HeroName>{hero.name}</HeroName>
          </HeroCard>
        ))}
      </HeroesGrid>
    </Container>
  );
};

export default HeroSelector;
