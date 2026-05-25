import IconPlus from "../assets/icons/icon_plus.svg?react";
import IconClose from "../assets/icons/icon_close.svg?react";
import IconMinus from "../assets/icons/icon_minus.svg?react";

const CartList = ({ count = 2 }) => {
  // count는 1 또는 2
  return (
    <div className="w-[561px] rounded-[var(--radius-small)] overflow-hidden bg-[var(--color-gray-0)]">
      <div className="bg-[var(--color-yellow-primary)] px-5 py-3 text-body-bold">
        왕꼬치
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-gray-2)]">
        <div className="flex flex-col gap-2">
          <div className="text-subtitle">닭꼬치 세트 (5ea)</div>
          <div className="text-subtitle text-[var(--color-red-primary)]">
            12,000
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
            <IconMinus />
          </button>
          <div className="text-body text-center min-w-4">1</div>
          <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
            <IconPlus />
          </button>
          <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
            <IconClose />
          </button>
        </div>
      </div>

      {count === 2 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--color-gray-2)]">
          <div className="flex flex-col gap-2">
            <div className="text-subtitle">떡꼬치</div>
            <div className="text-subtitle text-[var(--color-red-primary)]">
              5,000
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
              <IconMinus />
            </button>
            <div className="text-body text-center min-w-4">1</div>
            <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
              <IconPlus />
            </button>
            <button className="w-8 h-8 bg-[var(--color-gray-1)] rounded-[var(--radius-small)] cursor-pointer flex items-center justify-center">
              <IconClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
