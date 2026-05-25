const inputStatusClass = {
  default:
    "border-gray-2 text-gray-5 placeholder:text-gray-2 focus:border-gray-4",

  error:
    "border-red-primary text-red-primary placeholder:text-red-primary focus:border-red-primary",
};

function Input({ status = "default", placeholder, className = "", ...props }) {
  const currentStatus = inputStatusClass[status] ? status : "default";

  return (
    <input
      className={`flex w-full items-center rounded-small border bg-gray-0 px-4 py-5 text-body outline-none transition-colors ${inputStatusClass[currentStatus]} ${className}`}
      placeholder={placeholder}
      aria-invalid={currentStatus === "error" ? true : undefined}
      {...props}
    />
  );
}

export default Input;
