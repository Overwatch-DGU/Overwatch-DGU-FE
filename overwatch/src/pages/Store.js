import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ProfileCard from "../components/Profilecard";
import { useCoin } from "../components/CoinContext"; // CoinContext에서 코인 사용하기
import axios from "axios"; // axios import

// 스타일 정의
const Container = styled.div`
  height: 100vh;
  background-color: #92A1BB;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 70%;
  overflow: hidden;
  padding-top: 60px;
`;

const LeftPanel = styled.div`
  width: 35%;
  background-color: #4A5768;
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
  -webkit-background-clip: text; /* For Safari */
  padding: 10px 20px;
  font-family: GowunDodum-Regular;
`;

const MainMenuItem = styled.div`
  font-weight: bold;
  padding: 10px;
  background-color: #2A3149;
  cursor: pointer;
`;

const SubMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  border: ${({ isSelected }) => (isSelected ? "2px solid #3A6B97" : "none")};
  background-color: ${({ isSelected }) => (isSelected ? "#435F80" : "transparent")};
  cursor: pointer;
`;

const MiddlePanel = styled.div`
  width: 50%;
  background-color: #92A1BB;
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
  const { characterId } = useParams();
  const [selectedSubMenu, setSelectedSubMenu] = useState([null, null]);
  const { coins, setCoins } = useCoin();
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/shop/characters/${characterId}?userId=1`)
      .then((response) => {
        setHeroData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
        setHeroData([]);
        setLoading(false);
      });
  }, [characterId]);

  const handlePurchase = async (itemIndex, itemId, price) => {
    if (coins >= price) {
      try {
        await axios.post(`http://localhost:8080/api/shop/buy`, {
          userId: 1,
          itemId: itemId,
        });

        setCoins(coins - price);

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
      <ShopTitle>상점</ShopTitle>
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
                  src={
                    groupedData[selectedSubMenu[0]][selectedSubMenu[1]].image
                  }
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
