import { useState } from "react";
import Button from "./Button-common";
import PayButton from "./Button-pay";

const defaultPaymentMethods = [
  "카카오페이",
  "네이버페이",
  "카드 결제",
  "무통장 입금",
];

function formatWon(amount) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "0원";
  }

  return `${numericAmount.toLocaleString("ko-KR")}원`;
}

function ModalPay({
  paymentMethods = defaultPaymentMethods,
  totalAmount = 0,
  onSubmit,
  className = "",
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0] ?? "",
  );
  const activePaymentMethod = paymentMethods.includes(selectedPaymentMethod)
    ? selectedPaymentMethod
    : paymentMethods[0];
  const amountText = formatWon(totalAmount);

  const handleMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = () => {
    onSubmit?.({
      paymentMethod: activePaymentMethod,
      totalAmount,
    });
  };

  return (
    <section
      className={`flex w-full flex-col bg-gray-0 px-6 py-8 text-gray-5 ph:min-h-[604px] ph:max-w-[568px] ph:rounded-modal ph:px-12 ph:py-14 ${className}`}
      aria-labelledby="payment-title"
    >
      <h1 id="payment-title" className="text-center text-header">
        결제하기
      </h1>

      <div className="mx-auto mt-10 flex w-full max-w-[223px] flex-col gap-[94px] ph:mt-15 ph:max-w-none ph:gap-30">
        <section className="w-full" aria-labelledby="payment-method-title">
          <p id="payment-method-title" className="text-body text-red-primary">
            결제 방법
          </p>

          <div
            className="mt-8 grid w-full grid-cols-1 gap-3 ph:grid-cols-2 ph:gap-x-8 ph:gap-y-6"
            role="radiogroup"
            aria-label="결제 방법"
          >
            {paymentMethods.map((method) => (
              <PayButton
                key={method}
                selected={method === activePaymentMethod}
                className="!w-full"
                role="radio"
                aria-checked={method === activePaymentMethod}
                onClick={() => handleMethodClick(method)}
              >
                {method}
              </PayButton>
            ))}
          </div>
        </section>

        <section
          className="flex w-full flex-col gap-[94px] ph:gap-0"
          aria-label="총 결제금액"
        >
          <div className="flex w-full items-center justify-between gap-4 text-body-bold">
            <span>총 결제금액</span>
            <strong className="text-right text-body-bold">{amountText}</strong>
          </div>

          <Button
            status="noHoverBtn"
            className="mx-auto w-full max-w-[300px] text-center ph:mt-7"
            onClick={handleSubmit}
          >
            {amountText} 결제하기
          </Button>
        </section>
      </div>
    </section>
  );
}

export default ModalPay;
