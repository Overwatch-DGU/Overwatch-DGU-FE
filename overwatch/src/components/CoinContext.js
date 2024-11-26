import React, { createContext, useContext, useState } from "react";

// Context 생성
const CoinContext = createContext();

// Context Provider 컴포넌트
export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(0); // 초기 코인 상태
  const [username, setUsername] = useState(''); // 사용자 이름
  const [userId, setUserId] = useState(null); // 사용자 ID 추가

  return (
    <CoinContext.Provider
      value={{ coins, setCoins, username, setUsername, userId, setUserId }}
    >
      {children}
    </CoinContext.Provider>
  );
};

// Context 소비를 위한 커스텀 훅
export const useCoin = () => useContext(CoinContext);
