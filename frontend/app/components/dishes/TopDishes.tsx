"use client";
import React, { useState } from "react";
import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

// ------------------ 32 DISHES ------------------
const dishes = [
  // SALAD
  {
    id: 1,
    title: "Greek Salad",
    category: "Salad",
    price: 12,
    rating: 4,
    description: "Fresh veggies with olives, feta & herbs.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Veggie Garden Salad",
    category: "Salad",
    price: 10,
    rating: 5,
    description: "Colorful greens with lemon dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Caesar Crunch Salad",
    category: "Salad",
    price: 14,
    rating: 4,
    description: "Classic Caesar with crunchy toppings.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Avocado Fresh Salad",
    category: "Salad",
    price: 13,
    rating: 5,
    description: "Creamy avocado mixed with veggies.",
    image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&h=300&fit=crop",
  },

  // ROLLS
  {
    id: 5,
    title: "Veg Spring Roll",
    category: "Rolls",
    price: 8,
    rating: 4,
    description: "Crispy fried rolls with veggies.",
    image: "https://images.unsplash.com/photo-1589606665149-2c8f6d1d6f0c?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Paneer Tikka Roll",
    category: "Rolls",
    price: 11,
    rating: 5,
    description: "Paneer tikka wrapped in soft roti.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Chicken Shawarma Roll",
    category: "Rolls",
    price: 12,
    rating: 4,
    description: "Middle-eastern style juicy chicken roll.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Egg Masala Roll",
    category: "Rolls",
    price: 10,
    rating: 4,
    description: "Egg masala wrapped in rumali roti.",
    image: "https://images.unsplash.com/photo-1586197136192-4d5dfe5f4f8e?w=400&h=300&fit=crop",
  },

  // DESERT
  {
    id: 9,
    title: "Chocolate Lava Cake",
    category: "Deserts",
    price: 9,
    rating: 5,
    description: "Hot lava cake with melting core.",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    title: "Strawberry Cheesecake",
    category: "Deserts",
    price: 11,
    rating: 5,
    description: "Creamy cheesecake with strawberry syrup.",
    image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    title: "Blueberry Mousse",
    category: "Deserts",
    price: 10,
    rating: 4,
    description: "Soft mousse with blueberry flavor.",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    title: "Vanilla Pudding Delight",
    category: "Deserts",
    price: 7,
    rating: 4,
    description: "Classic vanilla pudding served chilled.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
  },

  // SANDWICH
  {
    id: 13,
    title: "Grilled Cheese Sandwich",
    category: "Sandwich",
    price: 8,
    rating: 5,
    description: "Melty cheese between toasted bread.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    title: "Chicken Mayo Sandwich",
    category: "Sandwich",
    price: 12,
    rating: 4,
    description: "Chicken chunks mixed with mayo.",
    image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    title: "Veggie Club Sandwich",
    category: "Sandwich",
    price: 10,
    rating: 4,
    description: "Triple-layered sandwich loaded with veggies.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop",
  },
  {
    id: 16,
    title: "Paneer Cheese Grill Sandwich",
    category: "Sandwich",
    price: 11,
    rating: 5,
    description: "Paneer with cheese grilled to perfection.",
    image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop",
  },

  // CAKE
  {
    id: 17,
    title: "Chocolate Fudge Cake",
    category: "Cake",
    price: 14,
    rating: 5,
    description: "Rich chocolate fudge layered cake.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
  },
  {
    id: 18,
    title: "Red Velvet Cake",
    category: "Cake",
    price: 15,
    rating: 5,
    description: "Soft red velvet topped with cream cheese.",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    title: "Black Forest Cake",
    category: "Cake",
    price: 16,
    rating: 4,
    description: "Chocolate cake with cherries.",
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    title: "Pineapple Cream Cake",
    category: "Cake",
    price: 13,
    rating: 4,
    description: "Light pineapple cake with fresh cream.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop",
  },

  // PURE VEG
  {
    id: 21,
    title: "Paneer Butter Masala",
    category: "Pure Veg",
    price: 18,
    rating: 5,
    description: "Classic Indian curry with paneer.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop",
  },
  {
    id: 22,
    title: "Mix Veg Curry",
    category: "Pure Veg",
    price: 14,
    rating: 4,
    description: "Healthy mixed vegetable curry.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
  },
  {
    id: 23,
    title: "Dal Tadka Special",
    category: "Pure Veg",
    price: 12,
    rating: 4,
    description: "Authentic Indian lentil tadka.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
  },
  {
    id: 24,
    title: "Veg Kofta Curry",
    category: "Pure Veg",
    price: 16,
    rating: 5,
    description: "Soft veg koftas in rich gravy.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop",
  },

  // PASTA
  {
    id: 25,
    title: "White Sauce Pasta",
    category: "Pasta",
    price: 13,
    rating: 5,
    description: "Creamy white sauce pasta.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
  },
  {
    id: 26,
    title: "Red Sauce Pasta",
    category: "Pasta",
    price: 12,
    rating: 4,
    description: "Tomato-rich tangy red sauce pasta.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
  },
  {
    id: 27,
    title: "Pesto Basil Pasta",
    category: "Pasta",
    price: 15,
    rating: 5,
    description: "Italian pesto with basil & olive oil.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
  },
  {
    id: 28,
    title: "Creamy Mushroom Pasta",
    category: "Pasta",
    price: 16,
    rating: 5,
    description: "Mushrooms cooked in creamy sauce.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop",
  },

  // NOODLES
  {
    id: 29,
    title: "Veg Hakka Noodles",
    category: "Noodles",
    price: 10,
    rating: 4,
    description: "Chinese-style stir-fried noodles.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop",
  },
  {
    id: 30,
    title: "Chicken Chow Mein",
    category: "Noodles",
    price: 12,
    rating: 5,
    description: "Stir-fried noodles with chicken.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
  },
  {
    id: 31,
    title: "Schezwan Spicy Noodles",
    category: "Noodles",
    price: 11,
    rating: 4,
    description: "Hot & spicy Indo-Chinese noodles.",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
  },
  {
    id: 32,
    title: "Garlic Butter Noodles",
    category: "Noodles",
    price: 13,
    rating: 5,
    description: "Garlic flavored buttery noodles.",
    image: "https://images.unsplash.com/photo-1634034395072-7c8f1627c01c?w=400&h=300&fit=crop",
  },
];

// ------------------ COMPONENT ------------------

interface TopDishesProps {
  selectedCategory: string;
}

export default function TopDishes({ selectedCategory }: TopDishesProps) {
  const [qty, setQty] = useState({});

  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // Filter dishes based on selected category
  const filteredDishes = selectedCategory
    ? dishes.filter(dish => dish.category === selectedCategory)
    : dishes;

  return (
    <div className="w-full bg-white px-6 lg:px-16 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {selectedCategory ? `${selectedCategory} Dishes` : "Top Dishes Near You"}
        </h2>
        
        {selectedCategory && (
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
            {filteredDishes.length} {filteredDishes.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {filteredDishes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No dishes found in this category.</p>
          <p className="text-gray-400 mt-2">Try selecting a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                    {dish.category}
                  </span>
                </div>

                {/* Add/Remove Buttons */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {qty[dish.id] > 0 && (
                    <button
                      onClick={() => decrease(dish.id)}
                      className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <MinusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  )}

                  <button
                    onClick={() => increase(dish.id)}
                    className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{dish.title}</h3>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < dish.rating ? "text-orange-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-1">{dish.description}</p>

                <p className="text-red-600 text-xl font-bold mt-3">${dish.price}</p>

                {/* Quantity Display */}
                {qty[dish.id] > 0 && (
                  <p className="text-sm font-semibold mt-1 text-green-600">
                    Added: {qty[dish.id]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}