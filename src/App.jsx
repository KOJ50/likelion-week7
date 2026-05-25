import CartList from "./components/CartList";
function App() {
  return (
    <div>
      <CartList
        count={2}
        restaurantName="왕꼬치"
        firstMenu="닭꼬치 세트 (5ea)"
        firstPrice="12,000"
        secondMenu="떡꼬치"
        secondPrice="5,000"
      />
    </div>
  );
}

export default App;
