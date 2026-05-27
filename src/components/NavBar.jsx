import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";
import { useState } from "react";

const NavBar = ({ title }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full h-[83px] bg-red-primary flex items-center justify-between px-3 ph:px-10 py-[20px] select-none">
        <h1
          className="text-white text-lg ph:text-2xl font-bold cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/")}
        >
          {title}
        </h1>

        {/* 데스크탑 메뉴 */}
        <div className="hidden ph:flex items-center ph:gap-6 text-white min-w-max">
          <Cart count={1} onClick={() => navigate("/payment")} />
          <button
            onClick={() => navigate("/login")}
            className="text-xs ph:text-sm hover:bg-white/30 rounded-small cursor-pointer px-2 ph:px-3 py-1.5 whitespace-nowrap"
          >
            로그인
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
            className="fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-[83px] right-0 w-[263px] h-[791px] bg-yellow-primary flex flex-col items-center pt-10 gap-6 z-50">
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
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              로그아웃
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
