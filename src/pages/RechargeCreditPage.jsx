import { useNavigate } from "react-router-dom";
import ModalPay from "../components/ModalPay";
import hamburgerIcon from "../assets/icons/icon_hamburger.svg";
import pointerIcon from "../assets/icons/icon_pointer.png";

function RechargeCreditPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-22.5">
      <header className="flex h-20.75 w-full items-center justify-between bg-red-primary px-10 py-5 ph:justify-start ph:gap-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex size-12 cursor-pointer items-center justify-center rounded-small bg-red-secondary"
          aria-label="뒤로가기"
        >
          <img src={pointerIcon} alt="" className="size-8" />
        </button>

        <h1 className="text-header text-gray-0">크레딧 충전</h1>

        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center ph:hidden"
        >
          <img src={hamburgerIcon} alt="" className="size-8" />
        </button>
      </header>

      <main className="flex items-center justify-center bg-gray-0">
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
