import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ProfileCard from "../components/Profilecard";
import { useCoin } from "../components/CoinContext"; // CoinContext에서 코인 사용하기

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
  padding-top:60px;
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
  background-color: #2A3149;  // 항상 고정된 배경색
  cursor: pointer;
`;

const SubMenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;
  font-size: 14px;
  border: ${({ isSelected }) => (isSelected ? "2px solid #3A6B97" : "none")};
  background-color: ${({ isSelected }) => (isSelected ? "#435F80" : "transparent")};  // 선택된 메뉴의 배경색
  cursor: pointer;
`;

const LockIcon = styled.span`
  font-size: 14px;
  opacity: 0.7;
`;

const MiddlePanel = styled.div`
  width: 50%;
  background-color: #92A1BB;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Add this to align the image and button vertically */

  img {
    max-width: 100%;
    max-height: 80%;
    object-fit: cover;
  }

  button {
    margin-top: 20px; /* Add spacing between image and button */
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


const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  width: 350px;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
`;

const PopupTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const PopupInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 15px 0;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4A90E2;
  }
`;

const Popupdiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-left:22px;
  margin-right:24px;
`;

const Popupbutton = styled.button`
  background-color: #f39c12;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }

  &:focus {
    outline: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeInOverlay 0.3s ease-in-out;
`;





const Gift = () => {
  const { heroId } = useParams(); // URL에서 heroId 파라미터 가져오기
  const [selectedSubMenu, setSelectedSubMenu] = useState([null, null]); // [mainIndex, subIndex]로 변경
  const { coins, setCoins } = useCoin(); // CoinContext에서 코인 상태 가져오기
  const [purchasedItems, setPurchasedItems] = useState({}); // 아이템별 구매 상태 저장
  const [showPopup, setShowPopup] = useState(false); // 선물하기 팝업 상태
  const [selectedUser, setSelectedUser] = useState(""); // 선물할 사용자

  // 캐릭터별 데이터 매핑
  const [heroData, setHeroData] = useState({
    0: [
      {
        id: 0,
        name: "스킨",
        items: [
          {
            id: 0,
            name: "A-7000 워컷",
            image: "/images/a7000.png",
            description: "A-7000 워컷은 최고의 디자인으로 제작된 프리미엄 스킨입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
          {
            id: 1,
            name: "B-3000 클래식",
            image: "/images/b3000.png",
            description: "B-3000 클래식은 영웅적인 디자인을 자랑하는 스킨입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 1,
        name: "승리 포즈",
        items: [
          {
            id: 0,
            name: "승리의 춤",
            image: "/images/victory_dance.png",
            description: "영웅이 승리 후 춤을 추는 포즈입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 2,
        name: "스프레이",
        items: [
          {
            id: 0,
            name: "다이아몬드",
            image: "/images/spray_diamond.png",
            description: "반짝이는 다이아몬드를 형상화한 스프레이입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
    ],
    12: [
      {
        id: 0,
        name: "스킨",
        items: [
          {
            id: 0,
            name: "가멜도",
            image: "/images/gamelo.png",
            description: "독특한 스타일의 스킨입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 1,
        name: "승리 포즈",
        items: [
          {
            id: 0,
            name: "기계 손",
            image: "/images/victory_pose1.png",
            description: "기계 손을 들어 올리는 승리 포즈입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 2,
        name: "스프레이",
        items: [
          {
            id: 0,
            name: "가멜도다",
            image: "/images/spray1.png",
            description: "독특한 개성을 보여주는 스프레이입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
    ],
    21: [
      {
        id: 0,
        name: "스킨",
        items: [
          {
            id: 0,
            name: "엑스트라 슈퍼 스킨",
            image: "/images/sigma1.png",
            description: "강력한 외형의 스킨입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 1,
        name: "승리 포즈",
        items: [
          {
            id: 0,
            name: "힘의 포즈",
            image: "/images/victory_pose2.png",
            description: "힘을 과시하는 포즈입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
      {
        id: 2,
        name: "스프레이",
        items: [
          {
            id: 0,
            name: "엑스트라 기어",
            image: "/images/spray2.png",
            description: "엑스트라 기어 모양의 스프레이입니다.",
            price: 100, // 가격 고정
            locked: true,
          },
        ],
      },
    ],
  });

  const menuData = heroData[heroId] || []; // heroId에 맞는 데이터 가져오기

  const handleSubMenuClick = (mainIndex, subIndex) => {
    setSelectedSubMenu([mainIndex, subIndex]); // 세부 메뉴 변경
  };

  // 선택된 아이템 데이터
  const selectedItem = menuData[selectedSubMenu[0]]?.items[selectedSubMenu[1]] || {};

  const handleGift = (mainIndex, itemId, price) => {
    if (coins >= price) {
      // 코인이 충분하면 선물하기 팝업을 띄운다
      setShowPopup(true);
    }
  };

  const handleConfirmGift = () => {
    // 선물하기 처리 로직 추가 (선택된 사용자에게 아이템 선물)
    setCoins(coins - selectedItem.price); // 코인 차감
    setPurchasedItems(prev => ({ ...prev, [`${selectedSubMenu[0]}-${selectedSubMenu[1]}`]: true })); // 아이템 구매 처리
    setHeroData(prevHeroData => {
      const updatedHeroData = { ...prevHeroData };
      updatedHeroData[heroId][selectedSubMenu[0]].items[selectedSubMenu[1]].locked = false; // 아이템 잠금 해제
      return updatedHeroData;
    });
    setShowPopup(false); // 팝업 닫기
  };

  return (
    <Container>
      <ShopTitle>상점</ShopTitle> {/* 화면 왼쪽 상단에 고정된 상점 제목 */}
      <ProfileCard/>
      <ContentWrapper>
        {/* 좌측 패널: 메뉴 */}
        <LeftPanel>
          {menuData.map((mainItem, mainIndex) => (
            <div key={mainItem.id}>
              <MainMenuItem>{mainItem.name}</MainMenuItem>
              {mainItem.items.map((subItem, subIndex) => (
                <SubMenuItem
                  key={subItem.id}
                  isSelected={selectedSubMenu[0] === mainIndex && selectedSubMenu[1] === subIndex}
                  onClick={() => handleSubMenuClick(mainIndex, subIndex)}
                >
                  <span>{subItem.name}</span>
                  <span>{subItem.locked ? <LockIcon>🔒</LockIcon> : ""}</span>
                </SubMenuItem>
              ))}
            </div>
          ))}
        </LeftPanel>

        {/* 중앙 패널: 아이템 상세 */}
        <MiddlePanel>
          {selectedItem.image && (
            <>
              <img src={selectedItem.image} alt={selectedItem.name} />
              <button onClick={() => handleGift(selectedSubMenu[0], selectedSubMenu[1], selectedItem.price)}>
                선물하기 ({selectedItem.price} 코인)
              </button>
            </>
          )}
        </MiddlePanel>
      </ContentWrapper>

      {/* 선물하기 팝업 */}
      {showPopup && (
        <>
          <Overlay onClick={() => setShowPopup(false)} />
          <Popup>
            <PopupTitle>선물할 사용자</PopupTitle>
            <PopupInput
              type="text"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder="사용자 이름 입력"
            />
            <Popupdiv>
              <Popupbutton onClick={handleConfirmGift}>선물하기</Popupbutton>
              <Popupbutton onClick={() => setShowPopup(false)}>취소</Popupbutton>
            </Popupdiv>
          </Popup>
        </>
      )}
    </Container>
  );
};

export default Gift;
