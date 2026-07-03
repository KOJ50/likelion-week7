import { useState } from "react";
import Button from "./Button-common";

const defaultPaymentMethods = [
  "카카오페이",
  "네이버페이",
  "카드 결제",
  "무통장 입금",
];

function ModalPay({
  paymentMethods = defaultPaymentMethods,
  totalAmount = 0,
  onSubmit,
  className = "",
}) {
  const [selectedPaymentMethod] = useState(paymentMethods[0] ?? "");
  const activePaymentMethod = paymentMethods.includes(selectedPaymentMethod)
    ? selectedPaymentMethod
    : paymentMethods[0];

  const handleSubmit = () => {
    onSubmit?.({
      paymentMethod: activePaymentMethod,
      totalAmount,
    });
  };

  return (
    <section
      className={`flex w-full flex-col border border-gray-2 bg-gray-0 px-12 py-14 text-gray-5 rounded-modal gap-15 ${className}`}
    >
      <h1 className="text-center text-header">결제하기</h1>

      <div className="flex flex-col gap-11">
        <div>1-1</div>
        <div className="flex flex-col gap-3.75">
          <div>1-2-1</div>
          <div>1-2-2</div>
        </div>
      </div>

      <Button status="noHoverBtn" className="self-center" onClick={handleSubmit}>
        결제하기
      </Button>
    </section>
  );
}

export default ModalPay;
