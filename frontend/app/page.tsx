'use client';
import React, { useState } from "react";
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import TopDishes from './components/dishes/TopDishes';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Home />
      <Menu onCategorySelect={handleCategorySelect} />
      <TopDishes selectedCategory={selectedCategory} />
    </>
  );
};

export default Page;