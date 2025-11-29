"use client";
import Image from "next/image";

const menuItems = [
  { name: "Salad", img: "/Salad.png" },
  { name: "Rolls", img: "/Rolls.png" },
  { name: "Deserts", img: "/Desrets.png" },
  { name: "Sandwich", img: "/Sandwich.png" },
  { name: "Cake", img: "/Cacke.png" },
  { name: "Pure Veg", img: "/Pure veg.png" },
  { name: "Pasta", img: "/Pasta.png" },
  { name: "Noodles", img: "/Noodels.png" }, // highlighted item
];

export default function Menu() {
  return (
    <div className="bg-white flex flex-col items-center  mx-auto px-5 py-8">
        
      {/* Heading */}
      <h1 className="text-[32px] font-bold text-black">Explore Our Menu</h1>

      {/* Sub Text */}
      <p className="text-gray-600 max-w-3xl mx-auto mt-3 text-sm leading-6">
        Choose from a diverse and carefully curated menu featuring a delectable
        array of dishes, each thoughtfully crafted with love, passion, and the
        finest ingredients to delight your taste.
      </p>

      {/* Menu Items */}
      <div className="flex flex-wrap justify-center  mt-4 gap-x-6 gap-y-2">
        {menuItems.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <p className="mt-2 font-medium text-gray-500 text-[15px]">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
