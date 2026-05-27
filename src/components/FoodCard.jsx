const FoodCard = ({ image, name, rate, caption }) => {
  return (
    <div className="w-[280px] rounded-xl border border-gray-100 overflow-hidden bg-white hover:shadow-[0px_5px_10px_0px_var(--gray-2)] transition-shadow cursor-pointer">
      <img src={image} alt={name} className="w-full h-[200px] object-cover" />
      <div className="px-5 pt-4 pb-5">
        <div className="text-2xl font-medium mb-1">{name}</div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <span className="text-amber-400">⭐</span>
          <span>{rate}</span>
        </div>
        <hr className="border-[#F9A0AD] mb-3" />
        <div className="text-[12px] font-medium text-[#F9A0AD]">{caption}</div>
      </div>
    </div>
  );
};

export default FoodCard;
