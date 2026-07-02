const optionTagClass = {
  main: {
    base: "px-4 py-2",
    default: "bg-gray-1 text-red-secondary hover:bg-white",
    selected: "bg-red-secondary text-white",
  },
  menu: {
    base: "px-2 py-1",
    default:
      "bg-gray-1 text-red-primary hover:bg-red-assisitive hover:border-red-primary hover:border",
    selected: "border border-red-primary bg-red-assisitive text-red-primary",
  },
};

const OptionTag = ({
  text,
  children,
  isSelected = false,
  variant = "main",
  className = "",
  ...props
}) => {
  const currentVariant = optionTagClass[variant] ? variant : "main";
  const currentStatus = isSelected ? "selected" : "default";
  const currentClass = optionTagClass[currentVariant];

  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-small cursor-pointer text-body ${currentClass.base} ${currentClass[currentStatus]} ${className}`}
      {...props}
    >
      {children ?? text}
    </button>
  );
};

export default OptionTag;
