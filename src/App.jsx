import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import CompletePage from "./pages/CompletePage";
import RechargeCreditPage from "./pages/RechargeCreditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-complete" element={<PaymentCompletePage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/recharge" element={<RechargeCreditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
