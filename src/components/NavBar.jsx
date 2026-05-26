import { useNavigate } from "react-router-dom";
import Cart from "./Cart.jsx";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full h-[83px] bg-[#F0485F] flex items-center justify-between px-3 min-[403px]:px-10 py-[20px] select-none">
      <h1
        className="text-white text-lg min-[403px]:text-2xl font-bold cursor-pointer whitespace-nowrap"
        onClick={() => navigate("/")}
      >
        어쩌구 저쩌구
      </h1>

      {/* 오른쪽 메뉴 영역 */}
      <div className="flex items-center gap-2 min-[403px]:gap-6 text-white min-w-max">
        <Cart count={1} />
        <button
          onClick={() => navigate("/login")}
          className="text-xs min-[403px]:text-sm hover:bg-white/30 rounded-sm cursor-pointer px-2 min-[403px]:px-3 py-1.5 whitespace-nowrap"
        >
          로그인
        </button>
      </div>
    </header>
  );
};

export default NavBar;
