import { useState } from "react";
import FoodCard from "../components/FoodCard.jsx";
import foodData from "../data/mockFoodCard.js";
import OptionTag from "../components/OptionTag.jsx";

const categories = ["전체", "분식", "기타"];

function MainPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <main className="w-[1200px] flex flex-col gap-[72px]">
      <div className="flex gap-[24px] mb-6">
        {categories.map((cat) => (
          <div key={cat} onClick={() => setActiveCategory(cat)}>
            <OptionTag text={cat} isSelected={activeCategory === cat} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {foodData.map((food) => (
          <FoodCard
            key={food.id}
            image={food.image}
            name={food.name}
            rate={food.rate}
            caption={food.caption}
          />
        ))}
      </div>
    </main>
  );
}

export default MainPage;
