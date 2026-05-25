const OptionTag = ({ text, isSelected }) => {
  return (
    <div
      className={`w-[71px] h-[39px] px-4 py-2  text-[20px] flex items-center justify-center rounded-[var(--radius-small)] cursor-pointer
    ${
      isSelected
        ? "bg-[#F9A0AD] text-white"
        : "text-[#F9A0AD] bg-white/60 hover:bg-white"
    }`}
    >
      {text}
    </div>
  );
};

export default OptionTag;
