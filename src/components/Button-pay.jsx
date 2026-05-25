const payButtonStatusClass = {
  default: "bg-gray-1 text-gray-5 border-transparent",
  selected: "border-red-primary bg-red-assistive text-red-primary",
};

function PayButton({
  status = "default",
  selected = false,
  children,
  className = "",
  ...props
}) {
  const currentStatus =
    selected || status === "selected" ? "selected" : "default";

  return (
    <button
      type="button"
      className={`flex w-55 items-center justify-center rounded-small border px-6 py-3 text-body cursor-pointer ${payButtonStatusClass[currentStatus]} ${className}`}
      aria-pressed={currentStatus === "selected"}
      {...props}
    >
      {children}
    </button>
  );
}

export default PayButton;
