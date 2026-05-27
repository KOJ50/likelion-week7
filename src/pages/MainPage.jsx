import { useState } from "react";
import FoodCard from "../components/FoodCard.jsx";
import foodData from "../data/mockFoodCard.js";
import OptionTag from "../components/OptionTag.jsx";
import NavBar from "../components/NavBar.jsx";
import ModalMenu from "../components/ModalMenu.jsx";

const categories = ["전체", "분식", "기타"];

function MainPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-1 flex flex-col items-center">
      <NavBar title="어쩌구 저쩌구" />
      <main className="w-full max-w-[1200px] px-4 flex flex-col pt-[90px] pb-[100px]">
        <div className="flex gap-[24px] mb-6 justify-center">
          {categories.map((cat) => (
            <div key={cat} onClick={() => setActiveCategory(cat)}>
              <OptionTag text={cat} isSelected={activeCategory === cat} />
            </div>
          ))}
        </div>

        {/* 음식 카드 리스트 */}
        <div className="grid grid-cols-1 ph:grid-cols-4 gap-6 mt-[72px] justify-items-center">
          {foodData.map((food) => (
            <div key={food.id} onClick={() => setSelectedMenu(food)}>
              <FoodCard
                key={food.id}
                image={food.image}
                name={food.name}
                rate={food.rating}
                caption={food.caption}
              />
            </div>
          ))}
        </div>
      </main>
      {/* 모달 */}
      {selectedMenu && (
        <div className="fixed top-[83px] bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center z-50">
          <ModalMenu
            menu={selectedMenu}
            onClose={() => setSelectedMenu(null)}
          />
        </div>
      )}
    </div>
  );
}

export default MainPage;
