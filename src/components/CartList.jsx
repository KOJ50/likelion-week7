import Stepper from "./Stepper";
import IconClose from "../assets/icons/icon_close.svg?react";
import OptionTag from "./OptionTag";

const CartList = ({
  restaurantName = "장바구니 메뉴",
  items,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="w-[247px] ph:w-[561px] rounded-modal overflow-hidden bg-gray-0">
      <div className="bg-red-assisitive px-5 py-3 text-body-bold">
        {restaurantName}
      </div>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={item.cartItemId}
            className={`flex flex-col ph:flex-row ph:items-center ph:justify-between px-5 py-3 ${
              index !== 0 ? "border-t border-gray-2" : ""
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="text-subtitle">{item.menuName}</div>

              {item.options?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.options.map((option) => (
                    <OptionTag
                      key={option.cartItemOptionId ?? option.menuOptionId}
                      text={option.content ?? option.option}
                      variant="menu"
                      isSelected={false}
                    />
                  ))}
                </div>
              )}
              <div className="text-subtitle text-black-primary">
                {(
                  item.menuPrice +
                  (item.options?.reduce(
                    (sum, option) => sum + (option.price ?? 0),
                    0,
                  ) ?? 0)
                ).toLocaleString("ko-KR")}
                원
              </div>
            </div>

            <div className="flex items-center gap-8 mt-3 ph:mt-0">
              <Stepper
                quantity={item.quantity}
                onDecrease={() => onDecrease(item)}
                onIncrease={() => onIncrease(item)}
              />

              <button
                onClick={() => onRemove(item)}
                className="w-8 h-8 bg-gray-1 rounded-small flex items-center justify-center"
              >
                <IconClose />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
