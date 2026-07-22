import { useState } from "react";
import closeIcon from "../assets/icons/icon_close.svg";
import Button from "./Button-common";
import Stepper from "./Stepper";
import OptionTag from "./OptionTag";
import { addCartItem } from "../apis/cart";

function formatWon(amount) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "0원";
  }

  return `${numericAmount.toLocaleString("ko-KR")}원`;
}
function ModalMenu({ menu, isOpen = true, onClose, className = "" }) {
  const [quantities, setQuantities] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  if (!isOpen || !menu) {
    return null;
  }

  const menuItems = menu.items ?? [];
  const handleQuantityChange = (itemId, amount) => {
    const nextQuantity = Math.max(1, (quantities[itemId] ?? 1) + amount);

    setQuantities((prev) => ({
      ...prev,
      [itemId]: nextQuantity,
    }));
  };

  const handleOptionSelect = (itemId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [itemId]: option,
    }));
  };

  const addToCart = async (item) => {
    const selectedOption = selectedOptions[item.id];
    const quantity = quantities[item.id] ?? 1;

    try {
      await addCartItem({
        menuId: item.id,
        quantity,
        menuOptionIds: selectedOption ? [selectedOption.id] : [],
      });
      alert("장바구니에 담았습니다.");
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className={`flex w-full flex-col items-start bg-gray-0 px-14 py-12 h-full overflow-y-auto ph:h-[667px] ph:w-[738px] ph:gap-10 ph:rounded-modal ${className}`}
    >
      <div className="flex w-full items-start justify-between gap-6">
        <div>
          <h1 className="text-header">{menu.name}</h1>
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

      <ul className="mt-8 flex w-full flex-col gap-14 ph:mt-0">
        {menuItems.map((item) => {
          const menuOptions = item.menuOptions ?? item.menu_options ?? [];
          const quantity = quantities[item.id] ?? 1;

          return (
            <li
              key={item.id}
              className="flex flex-col gap-3 ph:flex-row ph:items-start ph:justify-between ph:gap-6 ph:py-4"
            >
              <div className="flex min-w-0 flex-col">
                <div className="flex flex-col gap-[7px]">
                  <h2 className="text-body">{item.name}</h2>
                  <p className="text-caption text-gray-3">
                    {item.description}
                  </p>
                </div>

                <strong className="mt-2 text-body-bold">
                  {formatWon(item.price)}
                </strong>

                {menuOptions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {menuOptions.map((option) => (
                      <OptionTag
                        key={option.id}
                        text={
                          option.price > 0
                            ? `${option.content} (+${formatWon(option.price)})`
                            : option.content
                        }
                        variant="menu"
                        isSelected={
                          selectedOptions[item.id]?.id === option.id
                        }
                        onClick={() => handleOptionSelect(item.id, option)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Stepper
                  quantity={quantity}
                  onDecrease={() => handleQuantityChange(item.id, -1)}
                  onIncrease={() => handleQuantityChange(item.id, 1)}
                />

                <Button
                  className="w-[167px]"
                  onClick={() => addToCart(item)}
                >
                  담기
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ModalMenu;
