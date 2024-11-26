import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../components/Profilecard";
import { useCoin } from "../components/CoinContext";  // CoinContext에서 userId 가져오기

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

const LogTitle = styled.h2`
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

const TeamSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 100px;
`;

const TeamColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40%;
  padding: 20px;
`;

const TeamTitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const NumCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
`;

const GiftCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  background-color: white;
  color: black;
  font-size: 14px;
  position: relative;
`;

const IndicatorBox = styled.div`
  width: 5px;
  height: 100%;
  background-color: ${(props) => (props.type === "received" ? "#3377BE" : "#FF5555")};
  margin-right: 10px;
`;

const GiftDetail = styled.div`
  flex: 1;
  text-align: left;
`;

const LogScreen = () => {
  const { userId } = useCoin(); // CoinContext에서 현재 userId 가져오기
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [sentGifts, setSentGifts] = useState([]);
  const [receivedCount, setReceivedCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    if (!userId) return; // userId가 없으면 API 요청을 하지 않도록 처리

    axios
      .get(`http://localhost:8080/api/logs/gifts?userId=${userId}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          console.log("서버 응답 데이터:", response.data);

          const received = response.data.filter((gift) => gift.receiverId === userId);
          const sent = response.data.filter((gift) => gift.senderId === userId);

          setReceivedGifts(received);
          setSentGifts(sent);
          setReceivedCount(received.length);
          setSentCount(sent.length);
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container>
      <LogTitle>로그 및 통계</LogTitle>
      <ProfileCard />

      <TeamSection>
        {/* 총 횟수 */}
        <TeamColumn>
          <TeamTitle>주고 받은 횟수</TeamTitle>
          <NumCard>
            <GiftDetail>받은 횟수</GiftDetail>
            <GiftDetail>{receivedCount}회</GiftDetail>
          </NumCard>
          <NumCard>
            <GiftDetail>준 횟수</GiftDetail>
            <GiftDetail>{sentCount}회</GiftDetail>
          </NumCard>
        </TeamColumn>

        {/* 받은 선물 */}
        <TeamColumn>
          <TeamTitle>받은 선물</TeamTitle>
          {receivedGifts.map((gift) => (
            <GiftCard key={gift.giftId}>
              <IndicatorBox type="received" />
              <GiftDetail>보낸 사람: {gift.senderName}</GiftDetail>
              <GiftDetail>아이템: {gift.itemName}</GiftDetail>
              <GiftDetail>날짜: {formatDate(gift.giftedAt)}</GiftDetail>
            </GiftCard>
          ))}
        </TeamColumn>

        {/* 준 선물 */}
        <TeamColumn>
          <TeamTitle>준 선물</TeamTitle>
          {sentGifts.map((gift) => (
            <GiftCard key={gift.giftId}>
              <IndicatorBox type="sent" />
              <GiftDetail>받은 사람: {gift.receiverName}</GiftDetail>
              <GiftDetail>아이템: {gift.itemName}</GiftDetail>
              <GiftDetail>날짜: {formatDate(gift.giftedAt)}</GiftDetail>
            </GiftCard>
          ))}
        </TeamColumn>
      </TeamSection>
    </Container>
  );
};

export default LogScreen;
