import Button from "./Button-common";
import RechargeCredit from "./RechargeCredit";
import { MOCK_USER } from "../data/mockUser";

const mockPayment = {
  totalAmount: 2000,
};

const formatWon = (amount) => `${amount.toLocaleString("ko-KR")}원`;
const formatCredit = (amount) => `${amount.toLocaleString("ko-KR")}C`;
const formatDeductedCredit = (amount) =>
  amount === 0 ? formatCredit(amount) : `-${formatCredit(amount)}`;

function ModalPay({
  totalAmount = mockPayment.totalAmount,
  onSubmit,
  onRechargeCredit,
  className = "",
}) {
  const paymentTotalAmount = mockPayment.totalAmount ?? totalAmount;
  const ownedCredit = MOCK_USER.credit;
  const deductionCredit = paymentTotalAmount;
  const remainingCredit = ownedCredit - deductionCredit;

  const handleSubmit = () => {
    onSubmit?.({
      totalAmount: paymentTotalAmount,
    });
  };

  return (
    <section
      className={`flex w-[402px] max-w-full flex-col border border-gray-2 bg-gray-0 px-12 py-14 text-gray-5 rounded-modal gap-15 ph:w-full ${className}`}
    >
      <h1 className="text-center text-header">결제하기</h1>

      <div className="flex w-63.25 flex-col gap-11 ph:w-118">
        <div className="inline-flex items-center justify-between text-body-bold">
          <span>총 결제금액</span>
          <span>{formatWon(paymentTotalAmount)}</span>
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
