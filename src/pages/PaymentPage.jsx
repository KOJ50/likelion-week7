import NavBar from "../components/NavBar.jsx";

function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <NavBar title="장바구니" />
      <main>결제 페이지</main>
    </div>
  );
}

export default PaymentPage;
