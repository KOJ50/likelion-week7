// src/pages/CompletePage.jsx
import { useNavigate } from "react-router-dom";

function CompletePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-1 flex items-center justify-center">
      <div className="w-[229px] flex flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[36px] font-bold text-gray-5">주문 완료!</h2>
          <p className="text-body text-gray-3">음식이 배달됩니다 ...</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full h-[55px] bg-red-primary text-white text-body py-3 rounded-button cursor-pointer hover:opacity-90"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

export default CompletePage;
