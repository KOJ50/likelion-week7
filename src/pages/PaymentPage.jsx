import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartList from "../components/CartList.jsx";
import ModalPay from "../components/ModalPay.jsx";
import pointerIcon from "../assets/icons/icon_pointer.png";
import cardIcon from "../assets/icons/icon_card.svg";
import cartIcon from "../assets/icons/icon_cart.svg";

function PaymentPage() {
  const navigate = useNavigate();
  const [showPay, setShowPay] = useState(false);

  const cartItems = [
    {
      count: 1,
      mainName: "왕꼬치",
      firstMenu: "닭꼬치 세트 (5ea)",
      firstPrice: "12,000",
    },
    {
      count: 2,
      mainName: "왕꼬치",
      firstMenu: "닭꼬치 세트 (5ea)",
      firstPrice: "12,000",
      secondMenu: "떡꼬치",
      secondPrice: "5,000",
    },
  ];

  const totalAmount = 17000;

  return (
    <div className="w-full min-h-screen bg-gray-1 flex flex-col">
      {/* 헤더 */}
      <header className="w-full h-[83px] bg-red-primary flex items-center justify-between px-6 ph:px-10 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (showPay) setShowPay(false);
              else navigate(-1);
            }}
            className="cursor-pointer hover:opacity-70 p-1"
          >
            <img
              src={pointerIcon}
              alt="뒤로가기"
              className="w-6 h-6 ph:w-8 ph:h-8"
            />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-white text-[36px] ph:text-2xl font-bold">
            장바구니
          </h1>
        </div>

        {/* 모바일 전용 */}
        <button
          className="flex ph:hidden cursor-pointer hover:opacity-70 p-1"
          onClick={() => setShowPay(!showPay)}
        >
          <img
            src={showPay ? cartIcon : cardIcon}
            alt={showPay ? "장바구니로" : "결제하기"}
            className="w-6 h-6"
          />
        </button>
      </header>

      <div className="ph:hidden">
        {!showPay ? (
          <main className="w-full flex flex-col items-center px-5 mt-10 gap-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartList
                  key={index}
                  count={item.count}
                  mainName={item.mainName}
                  firstMenu={item.firstMenu}
                  firstPrice={item.firstPrice}
                  secondMenu={item.secondMenu}
                  secondPrice={item.secondPrice}
                />
              ))
            ) : (
              <div className="h-[200px] bg-gray-0 rounded-modal flex items-center justify-center text-body text-gray-4">
                장바구니에 담긴 메뉴가 없습니다.
              </div>
            )}
          </main>
        ) : (
          <main className="w-full px-5 mt-10">
            <ModalPay
              totalAmount={totalAmount}
              onSubmit={() => navigate("/complete")}
            />
          </main>
        )}
      </div>

      {/* 데스크탑 */}
      <main className="hidden ph:flex w-full max-w-[1200px] justify-between mt-[90px] px-5 mx-auto gap-6 ">
        <section className="flex flex-col gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartList
                key={index}
                count={item.count}
                mainName={item.mainName}
                firstMenu={item.firstMenu}
                firstPrice={item.firstPrice}
                secondMenu={item.secondMenu}
                secondPrice={item.secondPrice}
              />
            ))
          ) : (
            <div className="w-[561px] h-[200px] bg-gray-0 rounded-modal flex items-center justify-center text-body text-gray-4">
              장바구니에 담긴 메뉴가 없습니다.
            </div>
          )}
        </section>
        <ModalPay
          totalAmount={totalAmount}
          className="w-[568px]"
          onSubmit={() => navigate("/complete")}
        />
      </main>
    </div>
  );
}

export default PaymentPage;
