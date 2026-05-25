import IconCart from "../assets/icons/icon_cart.svg?react";

const Cart = ({ count }) => {
  return (
    <div className="relative">
      <button className="w-[31.5px] h-[31.5px] p-[6px] relative flex items-center justify-center rounded-small cursor-pointer hover:bg-white/30">
        <IconCart />
      </button>
      {count > 0 && (
        <div className="absolute top-[3px] left-[17px] rounded-full w-3 h-3 px-[4px] py-[1px] bg-yellow-primary flex items-center justify-center text-[8px]">
          {count}
        </div>
      )}
    </div>
  );
};

export default Cart;
