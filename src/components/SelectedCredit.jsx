const selectedCreditStatusClass = {
  default: "border-transparent bg-gray-0 text-gray-5",
  selected: "border-green-primary bg-green-secondary text-gray-0",
};

function SelectedCredit({
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
      className={`flex w-fit items-center justify-center rounded-small border px-3 py-2 text-body whitespace-nowrap cursor-pointer ${selectedCreditStatusClass[currentStatus]} ${className}`}
      aria-pressed={currentStatus === "selected"}
      {...props}
    >
      {children}
    </button>
  );
}

export default SelectedCredit;
