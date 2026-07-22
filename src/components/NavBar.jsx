import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";
import { useEffect, useState } from "react";
import { logout } from "../apis/member";
import { clearAccessToken, getAccessToken } from "../apis/axiosInstance";
import CurrentCredit from "./CurrentCredit.jsx";
import { CART_UPDATED_EVENT, getCart } from "../apis/cart";

const NavBar = ({ title }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getAccessToken()));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      return undefined;
    }

    const controller = new AbortController();
    const fetchCartCount = async () => {
      try {
        const cart = await getCart({ signal: controller.signal });
        setCartCount(
          (cart.items ?? []).reduce(
            (count, item) => count + (item.quantity ?? 0),
            0,
          ),
        );
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setCartCount(0);
        }
      }
    };

    fetchCartCount();
    window.addEventListener(CART_UPDATED_EVENT, fetchCartCount);

    return () => {
      controller.abort();
      window.removeEventListener(CART_UPDATED_EVENT, fetchCartCount);
    };
  }, [isLoggedIn]);

  const handleAuthClick = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await logout();
    } catch (error) {
      if (error.response?.status !== 401) {
        alert(
          error.response?.data?.message ?? "로그아웃 중 오류가 발생했습니다.",
        );
      }
    } finally {
      clearAccessToken();
      setIsLoggedIn(false);
      setCartCount(0);
      navigate("/login");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[83px] bg-red-primary flex items-center justify-between px-3 ph:px-10 py-[20px] select-none">
        <h1
          className="text-white text-lg ph:text-2xl font-bold cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/")}
        >
          {title}
        </h1>

        {/* 데스크탑 메뉴 */}
        <div className="hidden ph:flex items-center ph:gap-6 text-white min-w-max">
          <CurrentCredit onClick={() => navigate("/recharge")} />
          <Cart count={cartCount} onClick={() => navigate("/payment")} />
          <button
            onClick={handleAuthClick}
            className="text-xs ph:text-sm hover:bg-white/30 rounded-small cursor-pointer px-2 ph:px-3 py-1.5 whitespace-nowrap"
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </button>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="flex ph:hidden text-white text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* 모바일 사이드 메뉴 */}
      {isMenuOpen && (
        <>
          <div
            className="fixed top-[83px] right-[263px] left-0 bottom-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[83px] right-0 w-[263px] h-[791px] bg-[#F7F7F7] flex flex-col items-center pt-10 gap-6 z-50">
            <button
              className="text-red-primary text-xl font-semibold"
              onClick={() => {
                navigate("/payment");
                setIsMenuOpen(false);
              }}
            >
              장바구니
            </button>
            <button
              className="text-red-primary text-xl font-semibold"
              onClick={() => {
                handleAuthClick();
                setIsMenuOpen(false);
              }}
            >
              {isLoggedIn ? "로그아웃" : "로그인"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
