import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPay from "../components/ModalPay";
import hamburgerIcon from "../assets/icons/icon_hamburger.svg";
import pointerIcon from "../assets/icons/icon_pointer.png";
import { chargeCredit, getCredit } from "../apis/credit";
import { clearAccessToken, getAccessToken } from "../apis/axiosInstance";

function RechargeCreditPage() {
  const navigate = useNavigate();
  const [ownedCredit, setOwnedCredit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/login", { replace: true });
      return undefined;
    }

    const controller = new AbortController();

    const fetchCredit = async () => {
      try {
        const data = await getCredit({ signal: controller.signal });
        setOwnedCredit(data.credit);
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        if (error.response?.status === 401) {
          clearAccessToken();
          navigate("/login", { replace: true });
          return;
        }

        alert(
          error.response?.data?.message ?? "크레딧 정보를 불러오지 못했습니다.",
        );
        setOwnedCredit(0);
      }
    };

    fetchCredit();

    return () => controller.abort();
  }, [navigate]);

  const handleCharge = async ({ credit }) => {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const data = await chargeCredit({ amount: credit });
      setOwnedCredit(data.credit_after);
      navigate("/payment");
    } catch (error) {
      if (error.response?.status === 401) {
        clearAccessToken();
        navigate("/login", { replace: true });
        return;
      }

      alert(
        error.response?.data?.message ??
          "크레딧 충전 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-22.5">
      <header className="flex h-20.75 w-full items-center justify-between bg-red-primary px-10 py-5 ph:justify-start ph:gap-12">
        <button
          type="button"
          onClick={() => navigate("/payment")}
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
        {ownedCredit === null ? (
          <p className="text-body text-gray-3">
            크레딧 정보를 불러오는 중입니다.
          </p>
        ) : (
          <ModalPay
            variant="credit"
            ownedCredit={ownedCredit}
            isSubmitting={isSubmitting}
            onSubmit={handleCharge}
          />
        )}
      </main>
    </div>
  );
}

export default RechargeCreditPage;
