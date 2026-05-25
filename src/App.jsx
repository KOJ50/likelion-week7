import CartList from "./components/CartList";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <CartList
        count={2}
        mainName="왕꼬치"
        firstMenu="닭꼬치 세트 (5ea)"
        firstPrice="12,000"
        secondMenu="떡꼬치"
        secondPrice="5,000"
      />
      <Cart count={1} />
    </div>
  );
}

export default App;
