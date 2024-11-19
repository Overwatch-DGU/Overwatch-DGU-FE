import { useParams } from "react-router-dom";

const Gift = () => {
  const { heroId } = useParams();  // heroId 파라미터 가져오기

  return (
    <div>
      <h1>선물하기 페이지</h1>
      <p>캐릭터 ID: {heroId}</p>
      {/* 여기에 선물하기 관련 UI 구성 */}
    </div>
  );
};

export default Gift;
