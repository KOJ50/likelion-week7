import { useState } from "react";
import closeIcon from "../assets/icons/icon_close.svg";
import minusIcon from "../assets/icons/icon_minus.svg";
import plusIcon from "../assets/icons/icon_plus.svg";
import Button from "./Button-common";

function formatWon(amount) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "0원";
  }

  return `${numericAmount.toLocaleString("ko-KR")}원`;
}
//수량 버튼 디자인
function QuantityButton({ icon, onClick }) {
  return (
    <button
      type="button"
      className="flex size-8 cursor-pointer items-center justify-center rounded-small bg-gray-1"
      onClick={onClick}
    >
      <img className="size-8" src={icon} alt="" />
    </button>
  );
}

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center gap-8 px-2 py-3">
      <QuantityButton icon={minusIcon} onClick={onDecrease} />

      <span className="text-center text-body">{quantity}</span>

      <QuantityButton icon={plusIcon} onClick={onIncrease} />
    </div>
  );
}

function ModalMenu({
  menu,
  isOpen = true,
  onClose,
  onQuantityChange,
  className = "",
}) {
  const [quantities, setQuantities] = useState({});

  if (!isOpen || !menu) {
    return null;
  }

  const menuItems = menu.items ?? [];

  const handleQuantityChange = (itemId, amount) => {
    const nextQuantity = (quantities[itemId] ?? 0) + amount;
    const nextQuantities = { ...quantities };

    if (nextQuantity <= 0) {
      delete nextQuantities[itemId];
    } else {
      nextQuantities[itemId] = nextQuantity;
    }

    setQuantities(nextQuantities);
    onQuantityChange?.(nextQuantities);
  };

  return (
    <section
      className={`flex w-full flex-col items-start bg-gray-0 px-14 py-12 h-full overflow-y-auto ph:h-[667px] ph:w-[738px] ph:gap-10 ph:rounded-modal ${className}`}
    >
      <div className="flex w-full items-start justify-between gap-6">
        <div>
          <h1 className="text-header">{menu.name}</h1>

          <div className="mt-3 flex items-center gap-1 text-body text-gray-3">
            <span>⭐</span>
            <span>{menu.rating}</span>
          </div>
        </div>

        <button
          type="button"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-small bg-gray-1 p-2"
          onClick={onClose}
        >
          <img className="h-4 w-4" src={closeIcon} alt="" />
        </button>
      </div>

      <div className="mt-8 h-px w-full bg-gray-2 ph:mt-0" />

      <ul className="mt-8 flex w-full flex-col gap-14 ph:mt-0 ph:h-[416px] ph:justify-between ph:gap-0">
        {menuItems.map((item) => {
          const quantity = quantities[item.id] ?? 0;

          return (
            <li
              key={item.id}
              className="flex flex-col gap-3 ph:h-20 ph:flex-row ph:items-center ph:justify-between ph:gap-6"
            >
              <div className="flex min-w-0 flex-col ph:h-full ph:justify-between">
                <div className="flex flex-col gap-[7px]">
                  <h2 className="text-body">{item.name}</h2>
                  <p className="text-caption text-gray-3">{item.description}</p>
                </div>
                <strong className="text-body-bold">
                  {formatWon(item.price)}
                </strong>
              </div>

              <div className="flex shrink-0">
                {quantity > 0 ? (
                  <QuantityControl
                    quantity={quantity}
                    onDecrease={() => handleQuantityChange(item.id, -1)}
                    onIncrease={() => handleQuantityChange(item.id, 1)}
                  />
                ) : (
                  <Button
                    className="w-[167px]"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    담기
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ModalMenu;
