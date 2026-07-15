import { useEffect, useState } from "react";
import cardIcon from "../assets/icons/icon_card.svg";
import { getCredit } from "../apis/credit";
import { getAccessToken } from "../apis/axiosInstance";

function CurrentCredit({ onClick }) {
  const [credit, setCredit] = useState(() => (getAccessToken() ? null : 0));

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return undefined;
    }

    const controller = new AbortController();

    const fetchCredit = async () => {
      try {
        const data = await getCredit({ signal: controller.signal });
        setCredit(data.credit);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setCredit(0);
        }
      }
    };

    fetchCredit();

    return () => controller.abort();
  }, []);

  const formattedCredit =
    credit === null ? "..." : `${credit.toLocaleString("ko-KR")}C`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-14 cursor-pointer flex-col items-center gap-px rounded-small hover:bg-white/30"
    >
      <img src={cardIcon} aria-hidden="true" className="h-5.25 w-6.5" />
      <span className="text-caption text-gray-0">{formattedCredit}</span>
    </button>
  );
}

export default CurrentCredit;
