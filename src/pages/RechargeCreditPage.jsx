import { useNavigate } from "react-router-dom";
import ModalPay from "../components/ModalPay";

function RechargeCreditPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-1 p-8">
      <ModalPay
        variant="credit"
        onSubmit={() => {
          alert("충전이 완료되었습니다.");
          navigate("/payment");
        }}
      />
    </main>
  );
}

export default RechargeCreditPage;
