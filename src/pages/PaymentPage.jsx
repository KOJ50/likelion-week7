import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CartList from "../components/CartList.jsx";
import ModalPay from "../components/ModalPay.jsx";
import pointerIcon from "../assets/icons/icon_pointer.png";
import cardIcon from "../assets/icons/icon_card.svg";
import cartIcon from "../assets/icons/icon_cart.svg";
import { getCredit } from "../apis/credit.js";
import { clearAccessToken, getAccessToken } from "../apis/axiosInstance.js";
import {
  clearCartItems,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../apis/cart.js";
import { getMenuDetail } from "../apis/menu.js";
import { getMyInfo } from "../apis/member.js";
import { createOrder } from "../apis/order.js";
import { getStores } from "../apis/store.js";

function PaymentPage() {
  const navigate = useNavigate();
  const [showPay, setShowPay] = useState(false);
  const [ownedCredit, setOwnedCredit] = useState(null);
  const [creditError, setCreditError] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [cart, setCart] = useState({ items: [] });
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCart = useCallback(
    async (config = {}) => {
      try {
        const [cartData, stores] = await Promise.all([
          getCart(config),
          getStores(config),
        ]);
        const storeNames = new Map(
          stores.map((store) => [
            Number(store.id ?? store.store_id),
            store.name ?? store.store_name,
          ]),
        );
        const items = await Promise.all(
          (cartData.items ?? []).map(async (item) => {
            const menu = await getMenuDetail(item.menuId, config);
            const storeId = item.storeId ?? menu.storeId ?? menu.store_id;

            return {
              ...item,
              menuName: item.menuName ?? menu.name,
              menuPrice: menu.price ?? 0,
              storeId,
              storeName:
                storeNames.get(Number(storeId)) ?? cartData.store?.name,
            };
          }),
        );

        setCart({ ...cartData, items });
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        if (error.response?.status === 401) {
          clearAccessToken();
          navigate("/login", { replace: true });
          return;
        }

        console.error("장바구니 정보를 불러오지 못했습니다.", error);
      }
    },
    [navigate],
  );

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
        if (data.memberId != null) {
          setMemberId(data.memberId);
          setPaymentError("");
        }
      } catch (error) {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        if (error.response?.status === 401) {
          clearAccessToken();
          navigate("/login", { replace: true });
          return;
        }

        setCreditError(
          error.response?.data?.message ?? "크레딧 정보를 불러오지 못했습니다.",
        );
      }
    };

    fetchCredit();
    getMyInfo({ signal: controller.signal })
      .then((data) => {
        if (data.memberId == null) {
          throw new Error("회원 ID가 응답에 포함되지 않았습니다.");
        }

        setMemberId(data.memberId);
        setPaymentError("");
      })
      .catch((error) => {
        if (error.code === "ERR_CANCELED") {
          return;
        }

        if (error.response?.status === 401) {
          clearAccessToken();
          navigate("/login", { replace: true });
          return;
        }

        setPaymentError(
          error.response?.data?.message ?? "회원 정보를 불러오지 못했습니다.",
        );
      });
    Promise.resolve().then(() => fetchCart({ signal: controller.signal }));

    return () => controller.abort();
  }, [fetchCart, navigate]);

  const increaseQuantity = async (item) => {
    try {
      await updateCartItem(item.cartItemId, {
        quantity: item.quantity + 1,
        menuOptionIds: item.options?.map((option) => option.menuOptionId) ?? [],
      });
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message ?? "수량을 변경하지 못했습니다.");
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;
    try {
      await updateCartItem(item.cartItemId, {
        quantity: item.quantity - 1,
        menuOptionIds: item.options?.map((option) => option.menuOptionId) ?? [],
      });

      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message ?? "수량을 변경하지 못했습니다.");
    }
  };

  const removeItem = async (item) => {
    try {
      await deleteCartItem(item.cartItemId);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message ?? "상품을 삭제하지 못했습니다.");
    }
  };

  const totalAmount =
    cart?.items?.reduce(
      (sum, item) =>
        sum +
        (item.menuPrice +
          (item.options?.reduce(
            (optionSum, option) => optionSum + (option.price ?? 0),
            0,
          ) ?? 0)) *
          item.quantity,
      0,
    ) ?? 0;

  const cartGroups = Array.from(
    cart.items.reduce((groups, item) => {
      const groupKey = item.storeId ?? item.storeName ?? "unknown";
      const currentGroup = groups.get(groupKey) ?? {
        storeId: item.storeId,
        storeName: item.storeName ?? "가게 정보 없음",
        items: [],
      };

      currentGroup.items.push(item);
      groups.set(groupKey, currentGroup);
      return groups;
    }, new Map()),
  ).map(([, group]) => group);

  const handlePaymentSubmit = async () => {
    if (!cart.items.length || isSubmitting) {
      return;
    }

    if (ownedCredit - totalAmount < 0) {
      navigate("/recharge");
      return;
    }

    if (memberId == null) {
      setPaymentError("회원 정보를 확인할 수 없습니다. 다시 시도해주세요.");
      return;
    }

    const cartItemIds = cart.items.map((item) => item.cartItemId);

    setIsSubmitting(true);
    setPaymentError("");

    try {
      await createOrder({
        memberId,
        cartItemIds,
      });
    } catch (error) {
      setPaymentError(
        error.response?.data?.message ??
          "주문을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await clearCartItems(cartItemIds);
      setCart((currentCart) => ({ ...currentCart, items: [] }));
    } catch (error) {
      console.error("주문 후 장바구니 초기화에 실패했습니다.", error);
      alert(
        "주문은 완료되었지만 장바구니를 초기화하지 못했습니다. 페이지를 새로고침해주세요.",
      );
    } finally {
      navigate("/complete");
    }
  };

  const renderPaymentModal = () => {
    if (creditError) {
      return <p className="text-body text-red-primary">{creditError}</p>;
    }

    if (ownedCredit === null) {
      return (
        <p className="text-body text-gray-3">
          크레딧 정보를 불러오는 중입니다.
        </p>
      );
    }

    return (
      <div className="flex w-full flex-col gap-3">
        {paymentError && (
          <p className="text-body text-red-primary">{paymentError}</p>
        )}
        <ModalPay
          totalAmount={totalAmount}
          ownedCredit={ownedCredit}
          onSubmit={handlePaymentSubmit}
          onRechargeCredit={() => navigate("/recharge")}
          isSubmitting={isSubmitting}
          disabled={!cart.items.length}
        />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-1 flex flex-col pb-[20px]">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[83px] bg-red-primary flex items-center justify-between px-3 ph:px-10 py-[20px] select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (showPay) setShowPay(false);
              else navigate("/");
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
              <div className="flex flex-col gap-6">
                {cartGroups.map((group) => (
                  <CartList
                    key={group.storeId ?? group.storeName}
                    restaurantName={group.storeName}
                    items={group.items}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[200px] bg-gray-0 rounded-modal flex items-center justify-center text-body text-gray-4">
                장바구니에 담긴 메뉴가 없습니다.
              </div>
            )}
          </main>
        ) : (
          <main className="flex w-full justify-center px-5 mt-[110px]">
            {renderPaymentModal()}
          </main>
        )}
      </div>

      {/* 데스크탑 */}
      <main className="hidden ph:flex w-full max-w-[1200px] justify-between mt-[104px] px-5 mx-auto gap-6">
        <section className="flex flex-col gap-6">
          {cart?.items?.length > 0 ? (
            cartGroups.map((group) => (
              <CartList
                key={group.storeId ?? group.storeName}
                restaurantName={group.storeName}
                items={group.items}
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

        {renderPaymentModal()}
      </main>
    </div>
  );
}

export default PaymentPage;
