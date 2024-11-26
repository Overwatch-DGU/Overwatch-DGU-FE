import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ProfileCard from "../components/Profilecard";
import { useCoin } from "../components/CoinContext"; // CoinContext에서 코인 사용하기
import axios from "axios"; // axios import

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
  height: 73%;
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

const LockIcon = styled.span`
  font-size: 14px;
  opacity: 0.7;
`;

const MiddlePanel = styled.div`
  width: 50%;
  margin-left:100px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    background-color: transparent;
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
  margin-left: 22px;
  margin-right: 24px;
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
`;const Gift = () => {
  const { characterId } = useParams(); // URL에서 characterId 파라미터 가져오기
  const [selectedSubMenu, setSelectedSubMenu] = useState([null, null]); // 선택된 서브 메뉴 상태
  const { coins, setCoins, userId } = useCoin(); // CoinContext에서 코인 및 userId 가져오기
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [heroData, setHeroData] = useState([]);
  const [groupedHeroData, setGroupedHeroData] = useState({});
  const [loading, setLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    console.log("Character ID:", characterId); // characterId 확인
    axios
      .get(`http://localhost:8080/api/gifts/characters/${characterId}`) // URL 수정
      .then((response) => {
        console.log("Fetched hero data:", response.data); // 응답 확인
        const groupedData = groupByType(response.data); // 데이터 그룹화
        setHeroData(response.data); // 서버 데이터 설정
        setGroupedHeroData(groupedData); // 그룹화된 데이터 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
        setLoading(false);
      });
  }, [characterId]);

  // 데이터 그룹화 함수
  const groupByType = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {});
  };

  const handleSubMenuClick = (mainType, subIndex) => {
    setSelectedSubMenu([mainType, subIndex]); // 서브 메뉴 선택 시 상태 업데이트
  };

  const handleGift = (mainType, itemId, price) => {
    if (coins >= price) {
      setShowPopup(true);
    } else {
      alert("코인이 부족합니다!");
    }
  };

  const handleConfirmGift = async () => {
    if (selectedUser.trim() === "") {
      alert("선물할 사용자를 입력하세요.");
      return;
    }

    const selectedItem =
      groupedHeroData[selectedSubMenu[0]]?.[selectedSubMenu[1]];

    if (!selectedItem) {
      alert("아이템을 선택해주세요.");
      return;
    }

    if (isNaN(selectedUser)) {
      alert("유효한 사용자 ID를 입력하세요.");
      return;
    }

    try {
      const requestBody = {
        senderId: userId, // userId를 senderId로 설정
        receiverId: parseInt(selectedUser), // receiverId는 여전히 사용자가 입력한 값
        itemId: selectedItem.itemId,
      };

      const response = await axios.post(
        "http://localhost:8080/api/gifts/send",
        requestBody
      );

      if (response.data.message === "Gift sent successfully") {
        setCoins(response.data.remainingCoins);
        alert("선물이 성공적으로 완료되었습니다!");
        setShowPopup(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("선물하기 API 요청 실패:", error);
      alert("이미 보유한 아이템입니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!heroData || heroData.length === 0) return <div>상점 데이터가 없습니다.</div>;

  const selectedItem =
    groupedHeroData[selectedSubMenu[0]]?.[selectedSubMenu[1]] || {};

  return (
    <Container>
      <ShopTitle>선물하기</ShopTitle>
      <ProfileCard />
      <ContentWrapper>
        <LeftPanel>
          {Object.keys(groupedHeroData).map((type) => (
            <div key={type}>
              <MainMenuItem>{type}</MainMenuItem>
              {groupedHeroData[type].map((subItem, subIndex) => (
                <SubMenuItem
                  key={subItem.itemId}
                  isSelected={
                    selectedSubMenu[0] === type && selectedSubMenu[1] === subIndex
                  }
                  onClick={() => handleSubMenuClick(type, subIndex)}
                >
                  <span>{subItem.name}</span>
                  <span>{subItem.price} 코인</span>
                </SubMenuItem>
              ))}
            </div>
          ))}
        </LeftPanel>
        <MiddlePanel>
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
          />
          {/* 선물하기 버튼은 아이템이 선택될 때만 보이도록 설정 */}
          {selectedSubMenu[0] !== null && selectedSubMenu[1] !== null && (
            <button
              onClick={() =>
                handleGift(
                  selectedSubMenu[0],
                  selectedItem.itemId,
                  selectedItem.price
                )
              }
            >
              선물하기
            </button>
          )}
        </MiddlePanel>
      </ContentWrapper>
      {showPopup && (
        <Overlay>
          <Popup>
            <PopupTitle>선물할 사용자 ID 입력</PopupTitle>
            <PopupInput
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder="사용자 ID 입력"
            />
            <Popupdiv>
              <Popupbutton onClick={() => setShowPopup(false)}>취소</Popupbutton>
              <Popupbutton onClick={handleConfirmGift}>확인</Popupbutton>
            </Popupdiv>
          </Popup>
        </Overlay>
      )}
    </Container>
  );
};

export default Gift;
