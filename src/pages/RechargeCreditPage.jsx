import { useNavigate } from "react-router-dom";
import ModalPay from "../components/ModalPay";
import pointerIcon from "../assets/icons/icon_pointer.png";

function RechargeCreditPage() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="fixed flex h-20.75 w-full items-center gap-12 bg-red-primary px-3 py-5 ph:px-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex size-12 cursor-pointer items-center justify-center rounded-small bg-red-secondary"
        >
          <img src={pointerIcon} alt="" className="size-8" />
        </button>

        <h1 className="text-header text-gray-0">크레딧 충전</h1>
      </header>

      <main className="flex min-h-screen items-center justify-center bg-gray-0 pt-20.75">
        <ModalPay
          variant="credit"
          onSubmit={() => {
            alert("충전이 완료되었습니다.");
            navigate("/payment");
          }}
        />
      </main>
    </div>
  );
}

export default RechargeCreditPage;
