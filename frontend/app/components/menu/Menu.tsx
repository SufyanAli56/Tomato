"use client";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { name: "Salad", img: "/Salad.png" },
  { name: "Rolls", img: "/Rolls.png" },
  { name: "Deserts", img: "/Desrets.png" },
  { name: "Sandwich", img: "/Sandwich.png" },
  { name: "Cake", img: "/Cacke.png" },
  { name: "Pure Veg", img: "/Pure veg.png" },
  { name: "Pasta", img: "/Pasta.png" },
  { name: "Noodles", img: "/Noodels.png" },
];

// Add the prop interface
interface MenuProps {
  onCategorySelect: (category: string) => void;
}

export default function Menu({ onCategorySelect }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      // If clicking the same category again, clear the filter
      setActiveCategory(null);
      onCategorySelect(""); // Clear filter
    } else {
      // Set new active category
      setActiveCategory(categoryName);
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center mx-auto px-5 py-8">
      {/* Heading */}
      <h1 className="text-[32px] font-bold text-black">Explore Our Menu</h1>

      {/* Sub Text */}
      <p className="text-gray-600 max-w-3xl mx-auto mt-3 text-sm leading-6">
        Choose from a diverse and carefully curated menu featuring a delectable
        array of dishes, each thoughtfully crafted with love, passion, and the
        finest ingredients to delight your taste.
      </p>

      {/* Menu Items */}
      <div className="flex flex-wrap justify-center mt-4 gap-x-6 gap-y-2">
        {menuItems.map((item, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => handleCategoryClick(item.name)}
          >
            <div 
              className={`w-36 h-36 rounded-full flex items-center justify-center overflow-hidden border-4 transition-all duration-300 ${
                activeCategory === item.name 
                  ? 'border-orange-500 shadow-lg scale-110' 
                  : 'border-transparent hover:border-orange-200'
              }`}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <p 
              className={`mt-2 font-medium text-[15px] transition-colors duration-300 ${
                activeCategory === item.name 
                  ? 'text-orange-600 font-bold' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.name}
              {activeCategory === item.name && (
                <span className="ml-1 text-orange-500">✓</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Active Filter Display */}
      {activeCategory && (
        <div className="mt-6 flex items-center justify-center space-x-2">
          <span className="text-gray-600">Showing:</span>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            {activeCategory}
          </span>
          <button
            onClick={() => {
              setActiveCategory(null);
              onCategorySelect("");
            }}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
}