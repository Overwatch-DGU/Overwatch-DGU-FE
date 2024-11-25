import React, { createContext, useContext, useState } from "react";

// Context 생성
const CoinContext = createContext();

// Context Provider 컴포넌트
export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(1200); // 초기 코인 상태
  const [username, setUsername] = useState(''); // 초기 username 상태 추가

  return (
    <CoinContext.Provider value={{ coins, setCoins, username, setUsername }}>
      {children}
    </CoinContext.Provider>
  );
};

// Context 소비를 위한 커스텀 훅
export const useCoin = () => useContext(CoinContext);
