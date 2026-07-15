import { useState } from "react";
import Button from "./Button-common";
import RechargeCredit from "./RechargeCredit";
import SelectedCredit from "./SelectedCredit";

const CREDIT_OPTIONS = [1000, 3000, 5000, 10000];

const formatWon = (amount) => `${amount.toLocaleString("ko-KR")}원`;
const formatCredit = (amount) => `${amount.toLocaleString("ko-KR")}C`;
const formatAddedCredit = (amount) => `+${formatCredit(amount)}`;
const formatDeductedCredit = (amount) =>
  amount === 0 ? formatCredit(amount) : `-${formatCredit(amount)}`;

function ModalPay({
  variant = "default",
  varient,
  totalAmount,
  creditOptions = CREDIT_OPTIONS,
  initialSelectedCredit = CREDIT_OPTIONS[0],
  ownedCredit = 0,
  onSubmit,
  onRechargeCredit,
  isSubmitting = false,
  className = "",
}) {
  const currentVariant = varient ?? variant;
  const [selectedCredit, setSelectedCredit] = useState(initialSelectedCredit);
  const deductionCredit = totalAmount;
  const remainingCredit = ownedCredit - deductionCredit;
  const chargedCredit = ownedCredit + selectedCredit;

  const handleSubmit = () => {
    onSubmit?.({
      totalAmount,
    });
  };

  const handleCreditSubmit = () => {
    onSubmit?.({
      credit: selectedCredit,
      totalAmount: selectedCredit,
    });
  };

  if (currentVariant === "credit") {
    return (
      <section
        className={`flex h-142.75 w-100.5 flex-col justify-between rounded-modal border border-gray-2 bg-gray-0 px-12 pt-14 pb-10.5 ph:w-142 ${className}`}
      >
        <h1 className="text-center text-header text-gray-5">크레딧 충전하기</h1>

        <div className="flex h-75.5 w-76 flex-col justify-between self-center gap-1.5 ph:w-119.5">
          <div className="flex h-68.25 w-76 flex-col ph:h-auto ph:w-118.75">
            <div className="grid h-23.25 w-full grid-cols-2 gap-x-3 gap-y-4 ph:flex ph:h-9.75 ph:items-center ph:justify-between ph:gap-0">
              {creditOptions.map((credit) => (
                <SelectedCredit
                  key={credit}
                  selected={selectedCredit === credit}
                  className="h-9.75 w-full px-3 py-0 ph:w-fit"
                  onClick={() => setSelectedCredit(credit)}
                >
                  {formatAddedCredit(credit)}
                </SelectedCredit>
              ))}
            </div>

            <div className="flex h-45 w-full items-center justify-center">
              <div className="flex w-full flex-col items-start justify-center gap-4 rounded-small bg-gray-1 px-3 py-6 ph:w-118">
                <div className="flex w-full items-center justify-between text-subbody-bold text-gray-5">
                  <span>보유 크레딧</span>
                  <span className="text-right">
                    {formatCredit(ownedCredit)}
                  </span>
                </div>

                <div className="flex w-full items-center justify-between text-body-bold text-red-primary">
                  <span>충전 후 크레딧</span>
                  <span className="text-right">
                    {formatCredit(chargedCredit)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-76 items-center justify-between text-body-bold ph:w-118">
            <span>결제금액</span>
            <span>{formatWon(selectedCredit)}</span>
          </div>
        </div>

        <Button
          status="noHoverBtn"
          className="self-center"
          onClick={handleCreditSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "충전 중..." : "충전하기"}
        </Button>
      </section>
    );
  }

  return (
    <section
      className={`flex w-100.5 max-w-full flex-col border border-gray-2 bg-gray-0 px-12 py-14 text-gray-5 rounded-modal gap-15 ph:w-full ${className}`}
    >
      <h1 className="text-center text-header">결제하기</h1>

      <div className="flex w-63.25 flex-col gap-11 ph:w-118">
        <div className="inline-flex items-center justify-between text-body-bold">
          <span>총 결제금액</span>
          <span>{formatWon(totalAmount)}</span>
        </div>

        <div className="flex flex-col gap-3.75">
          <div className="flex flex-col items-end justify-center gap-3.75 rounded-small bg-gray-1 px-3 py-6">
            <div className="flex w-full items-center justify-between text-body-bold">
              <span>보유 크레딧</span>
              <span className="text-right">{formatCredit(ownedCredit)}</span>
            </div>

            <div className="flex w-full items-center justify-between text-subbody">
              <span>차감 예정 크레딧</span>
              <span className="text-right">
                {formatDeductedCredit(deductionCredit)}
              </span>
            </div>

            <div className="flex w-full items-center justify-between text-green-primary text-subbody-bold">
              <span>차감 후 잔액</span>
              <span className="text-right">
                {formatCredit(remainingCredit)}
              </span>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2.5 self-end">
            <span className="text-caption text-gray-3">
              크레딧이 부족한가요?
            </span>
            <RechargeCredit onClick={onRechargeCredit} />
          </div>
        </div>
      </div>

      <Button
        status="noHoverBtn"
        className="self-center"
        onClick={handleSubmit}
      >
        결제하기
      </Button>
    </section>
  );
}

export default ModalPay;
