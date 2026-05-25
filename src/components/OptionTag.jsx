const OptionTag = ({ text, isSelected }) => {
  return (
    <div
      className={`w-[71px] h-[39px] px-4 py-2  text-[20px] flex items-center justify-center rounded-small cursor-pointer
    ${
      isSelected
        ? "bg-red-secondary text-white"
        : "text-red-secondary bg-white/60 hover:bg-white"
    }`}
    >
      {text}
    </div>
  );
};

export default OptionTag;
