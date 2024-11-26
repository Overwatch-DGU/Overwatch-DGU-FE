import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCoin } from "../components/CoinContext";
import axios from "axios";
import ProfileCard from "../components/Profilecard";

// 스타일 정의
const Container = styled.div`
  height: 100vh;
  background-color: #92a1bb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 73%;
  overflow: hidden;
  padding-top: 60px;
`;

const LeftPanel = styled.div`
  width: 35%;
  background-color: #4a5768;
  display: flex;
  flex-direction: column;
  color: #ffffff;
`;

const ShopTitle = styled.h2`
  position: absolute;
  font-style: italic;
  top: -20px;
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

const MainMenuItem = styled.div`
  font-weight: bold;
  padding: 10px;
  background-color: #2a3149;
  cursor: pointer;
`;

const SubMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  border: ${({ isSelected }) => (isSelected ? "2px solid #3a6b97" : "none")};
  background-color: ${({ isSelected }) => (isSelected ? "#435f80" : "transparent")};
  cursor: pointer;
`;

const MiddlePanel = styled.div`
  width: 50%;
  background-color: white;
  margin-left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    max-width: 100%;
    max-height: 80%;
    object-fit: cover;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: orange;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2a4d6b;
    }
  }
`;

const Store = () => {
  const { characterId } = useParams(); // URL 파라미터에서 characterId 가져오기
  const { coins, setCoins, userId } = useCoin(); // CoinContext에서 coins와 userId 가져오기
  const [selectedSubMenu, setSelectedSubMenu] = useState([null, null]);
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    if (!userId) {
      console.warn("로그인되지 않았습니다.");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/shop/characters/${characterId}?userId=${userId}`)
      .then((response) => {
        setHeroData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setHeroData([]);
        setLoading(false);
      });
  }, [characterId, userId]);

  // 아이템 구매 처리
  const handlePurchase = async (itemIndex, itemId, price) => {
    if (!userId) {
      alert("로그인이 필요합니다!");
      return;
    }

    if (coins >= price) {
      try {
        const response = await axios.post("http://localhost:8080/api/shop/buy", {
          userId, // 동적으로 userId 사용
          itemId,
        });

        setCoins(response.data.remainingCoins); // 남은 코인 업데이트

        // 구매한 아이템을 소유 상태로 변경
        setHeroData((prevHeroData) =>
          prevHeroData.map((item, index) =>
            index === itemIndex ? { ...item, owned: true } : item
          )
        );

        alert("아이템이 성공적으로 구매되었습니다!");
      } catch (error) {
        console.error("구매 실패:", error);
        alert("구매 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("코인이 부족합니다!");
    }
  };

  // 로딩 상태 표시
  if (loading) return <div>로딩 중...</div>;
  if (!heroData || heroData.length === 0) return <div>상점 데이터가 없습니다.</div>;

  // type별로 그룹화
  const groupedData = heroData.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const renderSubItems = (type, items) =>
    items.map((item, index) => (
      <SubMenuItem
        key={item.itemId}
        isSelected={selectedSubMenu[0] === type && selectedSubMenu[1] === index}
        onClick={() => setSelectedSubMenu([type, index])}
      >
        <span>{item.name}</span>
        <span>{item.owned ? "🔓" : `${item.price} 코인`}</span>
      </SubMenuItem>
    ));

  return (
    <Container>
      <ShopTitle>상 점</ShopTitle>
      <ProfileCard />
      <ContentWrapper>
        <LeftPanel>
          {Object.entries(groupedData).map(([type, items]) => (
            <div key={type}>
              <MainMenuItem>{type}</MainMenuItem>
              {renderSubItems(type, items)}
            </div>
          ))}
        </LeftPanel>
        <MiddlePanel>
          {selectedSubMenu[0] !== null &&
            selectedSubMenu[1] !== null &&
            groupedData[selectedSubMenu[0]][selectedSubMenu[1]] && (
              <>
                <img
                  src={groupedData[selectedSubMenu[0]][selectedSubMenu[1]].image}
                  alt={groupedData[selectedSubMenu[0]][selectedSubMenu[1]].name}
                />
                {!groupedData[selectedSubMenu[0]][selectedSubMenu[1]].owned && (
                  <button
                    onClick={() =>
                      handlePurchase(
                        selectedSubMenu[1],
                        groupedData[selectedSubMenu[0]][selectedSubMenu[1]].itemId,
                        groupedData[selectedSubMenu[0]][selectedSubMenu[1]].price
                      )
                    }
                  >
                    구매하기
                  </button>
                )}
              </>
            )}
        </MiddlePanel>
      </ContentWrapper>
    </Container>
  );
};

export default Store;
