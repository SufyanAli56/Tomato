"use client";

import React, { useEffect, useState } from "react";
import { StarIcon, ClockIcon, FireIcon } from "@heroicons/react/24/solid";
import { getAllRecipes, Recipe } from "../../lib/services/recipesApi";


export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching recipes from backend...');
      
      const data = await getAllRecipes();
      console.log('Recipes fetched successfully:', data);
      
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load recipes from server";
      setError(errorMessage);
      
      // Fallback to sample data if backend is not available
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network')) {
        setRecipes(sampleRecipes);
        setError('Backend server not reachable. Showing sample recipes.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Sample data for fallback
  const sampleRecipes: Recipe[] = [
    {
      _id: "1",
      title: "Creamy Tomato Pasta",
      ingredients: ["Pasta", "Fresh Tomatoes", "Cream", "Basil", "Garlic", "Parmesan"],
      instructions: "Cook pasta al dente. Sauté garlic, add tomatoes and cream. Mix with pasta and garnish with basil.",
      category: "Pasta",
      cookingTime: 25,
      difficulty: "Easy",
      rating: 4.5
    },
    {
      _id: "2",
      title: "Margherita Pizza",
      ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"],
      instructions: "Spread sauce on dough, add cheese and basil. Bake at 475°F for 12-15 minutes.",
      category: "Pizza",
      cookingTime: 30,
      difficulty: "Medium",
      rating: 4.8
    },
    {
      _id: "3",
      title: "Greek Salad",
      ingredients: ["Tomatoes", "Cucumber", "Feta Cheese", "Olives", "Red Onion", "Olive Oil"],
      instructions: "Chop vegetables, mix with feta and olives, drizzle with olive oil and oregano.",
      category: "Salad",
      cookingTime: 15,
      difficulty: "Easy",
      rating: 4.3
    },
    {
      _id: "4",
      title: "Chocolate Lava Cake",
      ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Cocoa Powder"],
      instructions: "Melt chocolate and butter, mix with eggs and sugar, bake until edges are set.",
      category: "Dessert",
      cookingTime: 20,
      difficulty: "Medium",
      rating: 4.7
    },
    {
      _id: "5",
      title: "Chicken Stir Fry",
      ingredients: ["Chicken Breast", "Bell Peppers", "Broccoli", "Soy Sauce", "Ginger", "Garlic"],
      instructions: "Stir fry chicken and vegetables with ginger and garlic, add soy sauce.",
      category: "Stir Fry",
      cookingTime: 20,
      difficulty: "Easy",
      rating: 4.4
    },
    {
      _id: "6",
      title: "Beef Tacos",
      ingredients: ["Ground Beef", "Taco Shells", "Lettuce", "Tomato", "Cheese", "Sour Cream"],
      instructions: "Cook beef with taco seasoning, fill shells with toppings and serve hot.",
      category: "Mexican",
      cookingTime: 25,
      difficulty: "Easy",
      rating: 4.6
    }
  ];

  const foodImages = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-orange-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
   
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {loading ? "Loading delicious recipes..." : `Explore ${recipes.length} chef-curated recipes for every occasion`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-orange-600 font-semibold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Explore Recipes
            </button>
            <button className="border-2 border-white text-white font-semibold text-lg py-4 px-8 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300">
              Watch Tutorials
            </button>
          </div>
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="w-full px-6 lg:px-16 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Recipes</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked recipes that will transform your cooking experience
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center mb-8">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-orange-700 text-lg font-medium">{error}</p>
              </div>
              <p className="text-orange-600 text-sm mb-4">
                {recipes.length > 0 ? "Showing sample recipes for demonstration" : "Please check if your backend server is running on port 4000"}
              </p>
              <button 
                onClick={fetchRecipes}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading delicious recipes...</p>
              </div>
            </div>
          ) : (
            /* Recipes Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <div 
                  key={recipe._id} 
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative w-full h-52 overflow-hidden">
                    <img
                      src={foodImages[index % foodImages.length]}
                      alt={recipe.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Category Badge */}
                    {recipe.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                          {recipe.category}
                        </span>
                      </div>
                    )}

                    {/* Cooking Time */}
                    {recipe.cookingTime && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {recipe.cookingTime}min
                      </div>
                    )}

                    {/* Difficulty */}
                    {recipe.difficulty && (
                      <div className="absolute bottom-4 left-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                          {recipe.difficulty}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 flex-1 mr-2">
                        {recipe.title}
                      </h3>
                      {recipe.rating && renderStars(recipe.rating)}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {recipe.instructions}
                    </p>

                    {/* Ingredients */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span
                            key={idx}
                            className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{recipe.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <span className="flex items-center justify-center">
                        View Full Recipe
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          {!loading && recipes.length > 0 && (
            <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Why Cook With Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <FireIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">{recipes.length}+</div>
                  <div className="text-gray-700 font-medium">Tested Recipes</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <ClockIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {Math.round(recipes.reduce((acc, r) => acc + (r.cookingTime || 0), 0) / recipes.length)}min
                  </div>
                  <div className="text-gray-700 font-medium">Average Time</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <StarIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {(recipes.reduce((acc, r) => acc + (r.rating || 0), 0) / recipes.length).toFixed(1)}+
                  </div>
                  <div className="text-gray-700 font-medium">Average Rating</div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          {!loading && recipes.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Explore All Recipes
              </button>
            </div>
          )}
        </div>
      </div>

   
    </div>
  );
}