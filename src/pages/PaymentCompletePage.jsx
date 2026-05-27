import { useNavigate } from "react-router-dom";
import Button from "../components/Button-common.jsx";

function PaymentCompletePage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-1">
      <section className="flex w-[229px] flex-col items-center text-center gap-9">
        <h1 className="text-header text-gray-5">주문 완료!</h1>
        <p className="text-body text-gray-3">음식이 배달 됩니다 ...</p>
        <Button
          status="noHoverBtn"
          className="w-full"
          onClick={() => navigate("/")}
        >
          홈으로
        </Button>
      </section>
    </main>
  );
}

export default PaymentCompletePage;
