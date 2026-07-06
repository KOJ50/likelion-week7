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

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      restaurantName: "왕꼬치",
      items: [
        {
          id: 1,
          name: "닭꼬치 세트 (5ea)",
          price: 22000,
          quantity: 1,
          options: [
            {
              id: 1,
              name: "꼬치 추가 (+3,000원)",
            },
          ],
        },
        {
          id: 2,
          name: "떡꼬치",
          price: 5000,
          quantity: 1,
          options: [
            {
              id: 1,
              name: "꼬치 추가 (+3,000원)",
            },
            {
              id: 2,
              name: "떡사리 추가 (+2,000원)",
            },
          ],
        },
        {
          id: 3,
          name: "떡꼬치2",
          price: 5000,
          quantity: 1,
          options: [
            {
              id: 1,
              name: "꼬치 추가 (+3,000원)",
            },
            {
              id: 2,
              name: "떡사리 추가 (+2,000원)",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      restaurantName: "왕피자",
      items: [
        {
          id: 4,
          name: "페퍼로니 피자",
          price: 22000,
          quantity: 1,
          options: [
            {
              id: 1,
              name: "순한맛",
            },
            {
              id: 2,
              name: "중간맛",
            },
            {
              id: 3,
              name: "매운맛",
            },
          ],
        },
        {
          id: 5,
          name: "치즈 피자",
          price: 19000,
          quantity: 2,
        },
      ],
    },
  ]);

  const increaseQuantity = (restaurantId, itemId) => {
    setCartItems((prev) =>
      prev.map((restaurant) =>
        restaurant.id === restaurantId
          ? {
              ...restaurant,
              items: restaurant.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          : restaurant
      )
    );
  };

  const decreaseQuantity = (restaurantId, itemId) => {
    setCartItems((prev) =>
      prev.map((restaurant) =>
        restaurant.id === restaurantId
          ? {
              ...restaurant,
              items: restaurant.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity: Math.max(1, item.quantity - 1),
                    }
                  : item
              ),
            }
          : restaurant
      )
    );
  };

  const removeItem = (restaurantId, itemId) => {
    setCartItems((prev) =>
      prev
        .map((restaurant) =>
          restaurant.id === restaurantId
            ? {
                ...restaurant,
                items: restaurant.items.filter((item) => item.id !== itemId),
              }
            : restaurant
        )

        .filter((restaurant) => restaurant.items.length > 0)
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, restaurant) =>
      sum +
      restaurant.items.reduce(
        (itemSum, item) => itemSum + item.price * item.quantity,
        0
      ),
    0
  );

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
            {cartItems.length > 0 ? (
              cartItems.map((restaurant) => (
                <CartList
                  key={restaurant.id}
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.restaurantName}
                  items={restaurant.items}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))
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
            />
          </main>
        )}
      </div>

      {/* 데스크탑 */}
      <main className="hidden ph:flex w-full max-w-[1200px] justify-between mt-[104px] px-5 mx-auto gap-6">
        <section className="flex flex-col gap-6">
          {cartItems.length > 0 ? (
            cartItems.map((restaurant) => (
              <CartList
                key={restaurant.id}
                restaurantId={restaurant.id}
                restaurantName={restaurant.restaurantName}
                items={restaurant.items}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
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
