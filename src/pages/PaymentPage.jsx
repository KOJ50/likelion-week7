import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartList from "../components/CartList.jsx";
import ModalPay from "../components/ModalPay.jsx";
import pointerIcon from "../assets/icons/icon_pointer.png";
import cardIcon from "../assets/icons/icon_card.svg";
import cartIcon from "../assets/icons/icon_cart.svg";
import axios from "axios";
import { useEffect } from "react";

function PaymentPage() {
  const navigate = useNavigate();
  const [showPay, setShowPay] = useState(false);

  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const increaseQuantity = async (item) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/items/${item.id}`,
        {
          quantity: item.quantity + 1,
          menu_option_id: item.menu_option.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/items/${item.id}`,
        {
          quantity: item.quantity - 1,
          menu_option_id: item.menu_option.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (item) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/cart/items/${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const totalAmount =
    cart?.items?.reduce(
      (sum, item) =>
        sum +
        (item.menu.price + (item.menu_option?.price ?? 0)) * item.quantity,
      0
    ) ?? 0;

  return (
    <div className="w-full min-h-screen bg-gray-1 flex flex-col pb-[20px]">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[83px] bg-red-primary flex items-center justify-between px-3 ph:px-10 py-[20px] select-none">
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

      {/* 모바일 */}
      <div className="ph:hidden">
        {!showPay ? (
          <main className="w-full flex flex-col items-center px-5 mt-[110px] gap-6">
            {cart?.items?.length > 0 ? (
              <CartList
                restaurantName={cart.store.name}
                items={cart.items}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ) : (
              <div className="h-[200px] bg-gray-0 rounded-modal flex items-center justify-center text-body text-gray-4">
                장바구니에 담긴 메뉴가 없습니다.
              </div>
            )}
          </main>
        ) : (
          <main className="w-full px-5 mt-[110px]">
            <ModalPay
              totalAmount={totalAmount}
              onSubmit={() => navigate("/complete")}
              onRechargeCredit={() => navigate("/recharge")}
            />
          </main>
        )}
      </div>

      {/* 데스크탑 */}
      <main className="hidden ph:flex w-full max-w-[1200px] justify-between mt-[104px] px-5 mx-auto gap-6">
        <section className="flex flex-col gap-6">
          {cart?.items?.length > 0 ? (
            <CartList
              restaurantName={cart.store.name}
              items={cart.items}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          ) : (
            <div className="w-[561px] h-[200px] bg-gray-0 rounded-modal flex items-center justify-center text-body text-gray-4">
              장바구니에 담긴 메뉴가 없습니다.
            </div>
          )}
        </section>

        <ModalPay
          totalAmount={totalAmount}
          onSubmit={() => navigate("/complete")}
          onRechargeCredit={() => navigate("/recharge")}
        />
      </main>
    </div>
  );
}

export default PaymentPage;
