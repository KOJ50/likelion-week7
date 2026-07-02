import minusIcon from "../assets/icons/icon_minus.svg";
import plusIcon from "../assets/icons/icon_plus.svg";

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

function Stepper({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center gap-8 px-2 py-3">
      <QuantityButton icon={minusIcon} onClick={onDecrease} />

      <span className="text-center text-subtitle">{quantity}</span>

      <QuantityButton icon={plusIcon} onClick={onIncrease} />
    </div>
  );
}

export default Stepper;
