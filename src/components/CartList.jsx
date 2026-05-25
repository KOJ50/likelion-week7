import IconPlus from "../assets/icons/icon_plus.svg?react";
import IconClose from "../assets/icons/icon_close.svg?react";
import IconMinus from "../assets/icons/icon_minus.svg?react";

const CartList = ({
  count,
  mainName,
  firstMenu,
  firstPrice,
  secondMenu,
  secondPrice,
}) => {
  return (
    <div className="w-[247px] ph:w-[561px] rounded-small overflow-hidden bg-gray-0">
      <div className="bg-yellow-primary px-5 py-3 text-body-bold">
        {mainName}
      </div>

      <div className="flex flex-col gap-[10px] ph:p-0">
        <div className="bg-gray-0 rounded-small ph:rounded-none flex flex-col ph:flex-row ph:items-center ph:justify-between px-5 py-3 ">
          <div className="flex flex-col gap-2">
            <div className="text-subtitle">{firstMenu}</div>
            <div className="text-subtitle text-red-primary">
              {firstPrice}
            </div>
          </div>
          <div className="flex items-center gap-8 mt-3 ph:mt-0">
            <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
              <IconMinus />
            </button>
            <div className="text-body text-center min-w-4">1</div>
            <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
              <IconPlus />
            </button>
            <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
              <IconClose />
            </button>
          </div>
        </div>

        {count === 2 && (
          <div className="bg-gray-0 rounded-small ph:rounded-none flex flex-col ph:flex-row ph:items-center ph:justify-between px-5 py-3 border-t border-gray-2">
            <div className="flex flex-col gap-2">
              <div className="text-subtitle">{secondMenu}</div>
              <div className="text-subtitle text-red-primary">
                {secondPrice}
              </div>
            </div>
            <div className="flex items-center gap-8 mt-3 ph:mt-0">
              <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
                <IconMinus />
              </button>
              <div className="text-body text-center min-w-4">1</div>
              <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
                <IconPlus />
              </button>
              <button className="w-8 h-8 bg-gray-1 rounded-small cursor-pointer flex items-center justify-center">
                <IconClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
