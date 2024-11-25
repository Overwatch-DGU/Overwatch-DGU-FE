import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../components/Profilecard";

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
  -webkit-background-clip: text; /* For Safari */
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
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 40%;
  padding: 20px;
`;

const TeamTitle = styled.div`
  width: 35%;
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  padding: 0px;
  background-color: none; /* 제목 배경 */
  text-align: left;
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

const NumDetail = styled.div`
  flex: 1;
  text-align: left;
`;

const Num = styled.div``;

const GiftCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  padding-left: 0px;
  background-color: white;
  color: black;
  font-size: 14px;
  position: relative; /* 박스 위치를 위해 */
`;

const IndicatorBox = styled.div`
  width: 5px; /* 얇은 박스 */
  height: 150%;
  background-color: ${(props) => (props.type === "received" ? "#3377BE" : "#FF5555")};
  margin-right: 10px; /* 박스와 내용 간의 간격 */
`;

const GiftDetail = styled.div`
  flex: 1;
  text-align: center;
`;

const LogScreen = () => {
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [sentGifts, setSentGifts] = useState([]);
  const [receivedCount, setReceivedCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    // API 호출
    axios.get("http://localhost:8080/api/logs/gifts?userId=1")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          // 서버 응답 데이터를 확인
          console.log("서버 응답 데이터:", response.data);

          // 받은 선물과 준 선물 배열을 각각 추출
          const received = response.data.filter(gift => gift.totalGiftsReceived > 0);
          const sent = response.data.filter(gift => gift.totalGiftsSent > 0);

          // 상태 업데이트
          setReceivedGifts(received);
          setSentGifts(sent);

          // 총 받은 선물과 준 선물 횟수 계산
          setReceivedCount(received.length);
          setSentCount(sent.length);
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, []);

  return (
    <Container>
      <LogTitle>로그 및 통계</LogTitle>
      <ProfileCard />

      <TeamSection>
        {/* 총횟수들 */}
        <TeamColumn>
          <TeamTitle>주고 받은 횟수</TeamTitle>
          <NumCard>
            <NumDetail>받은 횟수</NumDetail>
            <Num>{receivedCount}회</Num>
          </NumCard>
          <NumCard>
            <NumDetail>준 횟수</NumDetail>
            <Num>{sentCount}회</Num>
          </NumCard>
        </TeamColumn>

        {/* 받은 선물 */}
        <TeamColumn>
          <TeamTitle>받은 선물</TeamTitle>
          {receivedGifts.map((gift, index) => (
            <GiftCard key={index}>
              <IndicatorBox type="received" />
              <GiftDetail>{gift.userId}</GiftDetail>
              <GiftDetail>{gift.totalGiftsReceived}</GiftDetail>
              <GiftDetail>{gift.lastGiftDate}</GiftDetail>
            </GiftCard>
          ))}
        </TeamColumn>

        {/* 준 선물 */}
        <TeamColumn>
          <TeamTitle>준 선물</TeamTitle>
          {sentGifts.map((gift, index) => (
            <GiftCard key={index}>
              <IndicatorBox type="sent" />
              <GiftDetail>{gift.userId}</GiftDetail>
              <GiftDetail>{gift.totalGiftsSent}</GiftDetail>
              <GiftDetail>{gift.lastGiftDate}</GiftDetail>
            </GiftCard>
          ))}
        </TeamColumn>
      </TeamSection>
    </Container>
  );
};

export default LogScreen;
