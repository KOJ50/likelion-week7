const buttonStatusClass = {
  disabled: "bg-gray-1 text-gray-3 cursor-not-allowed",
  active:
    "bg-red-assisitive text-red-primary cursor-pointer hover:border-red-primary hover:border",
  noHoverBtn: "bg-red-primary text-gray-0 cursor-pointer",
};

function Button({
  status = "active",
  disabled = false,
  children,
  className = "",
  ...props
}) {
  const currentStatus =
    disabled || status === "disabled"
      ? "disabled"
      : buttonStatusClass[status]
        ? status
        : "active";

  return (
    <button
      type="button"
      className={`inline-flex h-13.5 items-center justify-center rounded-button px-16 py-4 text-body whitespace-nowrap ${buttonStatusClass[currentStatus]} ${className}`}
      disabled={currentStatus === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
