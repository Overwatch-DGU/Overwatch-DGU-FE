import { useParams } from "react-router-dom";

const Store = () => {
  const { heroId } = useParams();  // heroId 파라미터 가져오기

  return (
    <div>
      <h1>상점 페이지</h1>
      <p>캐릭터 ID: {heroId}</p>
      {/* 여기에 상점 관련 UI 구성 */}
    </div>
  );
};

export default Store;
