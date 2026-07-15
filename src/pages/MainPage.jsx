import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard.jsx";
// import foodData from "../data/mockFoodCard.js"; // 카테고리 "전체" 선택시
// import foodData2 from "../data/mockFoodCard2.js"; // 카테고리 "분식" 선택시
import OptionTag from "../components/OptionTag.jsx";
import NavBar from "../components/NavBar.jsx";
import ModalMenu from "../components/ModalMenu.jsx";
import axios from "axios";
import food1 from "../assets/images/foodCard_1.png";

const categories = ["전체", "분식", "기타"];

function MainPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [selectedMenu, setSelectedMenu] = useState();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/stores`
        );
        setMenus(response.data.result?.stores ?? []);
      } catch (error) {
        setMenus([]);
        if (error.response?.status === 404) {
          console.log("메뉴가 없습니다.");
        } else if (error.response?.status === 401) {
          console.log("인증이 필요합니다.");
        } else {
          console.error(error);
        }
      }
    };

    fetchMenus();
  }, []);

  const handleMenuClick = async (store) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/menu`,
        { params: { store_id: store.id } }
      );
      const storeMenus = (response.data.result?.menus ?? []).filter(
        (menu) => Number(menu.store_id) === Number(store.id)
      );
      const menuDetails = await Promise.all(
        storeMenus.map(async (menu) => {
          const detailResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/menu/${menu.id}`
          );

          return detailResponse.data.result;
        })
      );

      setSelectedMenu({
        name: store.name,
        items: menuDetails,
      });
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("메뉴가 없습니다");
      } else {
        console.error(error);
      }
    }
  };

  /* let displayData;
  if (activeCategory === "전체") {
    displayData = [...foodData, ...foodData2];
  } else if (activeCategory === "분식") {
    displayData = foodData2;
  } else {
    displayData = foodData;
  } */

  return (
    <div className="w-full min-h-screen bg-gray-1 flex flex-col items-center">
      <NavBar title="어쩌구 저쩌구" />
      <main className="w-full max-w-300 px-4 flex flex-col pt-22.5 pb-25 mt-[83px]">
        <div className="flex gap-6 mb-6 justify-center">
          {categories.map((cat) => (
            <OptionTag
              key={cat}
              text={cat}
              isSelected={activeCategory === cat}
              variant="main"
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* 음식 카드 리스트 */}
        <div className="grid w-full grid-cols-1 ph:grid-cols-4 gap-6 mt-18 justify-items-center">
          {menus.map((food) => (
            <div key={food.id} onClick={() => handleMenuClick(food)}>
              <FoodCard
                key={food.id}
                image={food1}
                name={food.name}
                rate={food.rating}
                caption={food.category}
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
