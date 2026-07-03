function RechargeCredit({
  children = "크레딧 충전",
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`flex w-25 h-6 items-center justify-center rounded-small bg-green-primary px-6 py-3 text-caption text-gray-0 whitespace-nowrap cursor-pointer hover:bg-green-assistive hover:text-gray-5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default RechargeCredit;
