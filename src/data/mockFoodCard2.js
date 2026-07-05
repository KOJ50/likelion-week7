import food1 from "../assets/images/foodCard_1.png";

const skewerMenuItems = [
  {
    id: "1",
    name: "소고기 꼬치 세트 (5ea)",
    description: "양념 소고기 꼬치 5개 세트",
    price: 15000,
    options: [
      {
        id: 1,
        name: "꼬치 추가 (+3,000원)",
      },
    ],
  },
  {
    id: "2",
    name: "어묵 (5ea)",
    description: "어묵 5개 세트",
    price: 12000,
    options: [
      {
        id: 1,
        name: "꼬치 추가 (+3,000원)",
      },
      {
        id: 2,
        name: "떡사리 추가 (+2,000원)",
      },
    ],
  },
  {
    id: "3",
    name: "떡꼬치 (3ea)",
    description: "매콤달콤 떡꼬치",
    price: 5000,
    options: [
      {
        id: 1,
        name: "순한맛",
      },
      {
        id: 2,
        name: "중간맛",
      },
      {
        id: 3,
        name: "매운맛",
      },
    ],
  },
];

const foodData2 = [
  {
    id: 1,
    image: food1,
    name: "분식-1",
    rating: 4.6,
    caption: "떡볶이",
    items: skewerMenuItems,
  },
  {
    id: 2,
    image: food1,
    name: "분식-2",
    rating: 4.6,
    caption: "어묵",
    items: skewerMenuItems,
  },
  {
    id: 3,
    image: food1,
    name: "분식-3",
    rating: 4.6,
    caption: "순대",
    items: skewerMenuItems,
  },
];

export default foodData2;
