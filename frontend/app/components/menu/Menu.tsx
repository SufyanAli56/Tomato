"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Star, Clock, Utensils } from "lucide-react";
import { getAllMenuItems, getMenuByCategory, MenuItem, getMenuCategories } from "../../lib/services/menuApi";

// Types
interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions: string;
  totalPrice: number;
}

interface MenuProps {
  onCategorySelect: (category: string) => void;
}

// Default categories in case API fails
const defaultCategories = [
  { name: "Salad", icon: "🥗", description: "Fresh & Healthy" },
  { name: "Rolls", icon: "🌯", description: "Quick & Tasty" },
  { name: "Desserts", icon: "🍰", description: "Sweet Treats" },
  { name: "Sandwich", icon: "🥪", description: "Hearty & Filling" },
  { name: "Cake", icon: "🎂", description: "Celebration Specials" },
  { name: "Pure Veg", icon: "🌱", description: "Plant Based" },
  { name: "Pasta", icon: "🍝", description: "Italian Favorites" },
  { name: "Noodles", icon: "🍜", description: "Asian Inspired" }
];

export default function EnhancedMenu({ onCategorySelect }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState(defaultCategories);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch categories from API on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch menu items when category changes
  useEffect(() => {
    if (activeCategory) {
      fetchMenuItems();
    } else {
      setMenuData([]);
    }
  }, [activeCategory]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('restaurantCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const fetchCategories = async () => {
    try {
      const result = await getMenuCategories();
      const apiCategories = result.categories;
      console.log("API Categories:", apiCategories);
      
      if (apiCategories && apiCategories.length > 0) {
        // Map API categories to our format
        const mappedCategories = apiCategories.map(categoryName => {
          const existing = defaultCategories.find(c => 
            c.name.toLowerCase() === categoryName.toLowerCase() ||
            (categoryName === "Desserts" && c.name === "Deserts")
          );
          
          if (existing) return existing;
          
          return {
            name: categoryName,
            icon: "🍽️",
            description: "Delicious dishes"
          };
        });
        setCategories(mappedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Keep default categories if API fails
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching items for category:", activeCategory);
      
      // IMPORTANT: Map frontend category name to backend category name
      const categoryMap: Record<string, string> = {
        "Deserts": "Desserts", // Your frontend has "Deserts", backend has "Desserts"
        "Pure Veg": "Pure Veg",
        // Add other mappings if needed
      };
      
      const apiCategory = categoryMap[activeCategory] || activeCategory;
      console.log("API Category:", apiCategory);
      
      const data = await getMenuByCategory(apiCategory);
      
      console.log("Fetched items:", data.length);
      setMenuData(data);
      
    } catch (err: any) {
      console.error("Error fetching menu items:", err);
      setError(`Failed to load ${activeCategory} items: ${err.message}`);
      setMenuData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log("Category clicked:", categoryName);
    
    const newCategory = activeCategory === categoryName ? "" : categoryName;
    console.log("Setting active category to:", newCategory);
    
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
  };

  const addToCart = (item: MenuItem) => {
    if (!item.available) {
      alert("This item is currently out of stock");
      return;
    }

    setIsProcessing(true);
    
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      menuItem: item,
      quantity: quantity,
      specialInstructions: specialInstructions,
      totalPrice: item.price * quantity
    };

    setCart(prev => {
      const existingItemIndex = prev.findIndex(cartItem => 
        cartItem.menuItem._id === item._id && 
        cartItem.specialInstructions === specialInstructions
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          totalPrice: existingItem.menuItem.price * (existingItem.quantity + quantity)
        };
        return updatedCart;
      } else {
        return [...prev, cartItem];
      }
    });

    setIsProcessing(false);
    setSelectedItem(null);
    setQuantity(1);
    setSpecialInstructions("");
    
    alert(`${item.name} added to cart!`);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === itemId
          ? { 
              ...item, 
              quantity: newQuantity,
              totalPrice: item.menuItem.price * newQuantity
            }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-8">
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Browse Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select a category to explore our delicious dishes
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`group p-4 rounded-2xl transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-800 hover:bg-orange-50 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className={`font-semibold text-lg mb-1 ${
                activeCategory === category.name ? 'text-white' : 'text-gray-800'
              }`}>
                {category.name}
              </h3>
              <p className={`text-sm ${
                activeCategory === category.name ? 'text-orange-100' : 'text-gray-500'
              }`}>
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* Category info and menu items */}
        {activeCategory && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {activeCategory} Selection
                </h3>
                <p className="text-gray-600">
                  Discover our exquisite {activeCategory.toLowerCase()} offerings
                </p>
              </div>
              <button
                onClick={() => handleCategoryClick(activeCategory)}
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                View All Categories
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-3xl h-48"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                  onClick={fetchMenuItems}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : menuData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found in {activeCategory} category.</p>
                <p className="text-gray-400 mt-2">Try selecting a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuData.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    <div className="relative overflow-hidden">
                      <div className="h-48 relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      {item.rating >= 4.5 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {item.isVegetarian && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                            🌱 Veg
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                            🌶️ Spicy
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.preparationTime} min</span>
                        </div>
                        <div className="flex gap-1">
  {/* FIXED: Added safety check for ingredients array */}
  {(item.ingredients || []).slice(0, 3).map((ingredient, idx) => (
    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
      {ingredient}
    </span>
  ))}
</div>
                      </div>

                      <button
                        onClick={() => setSelectedItem(item)}
                        disabled={!item.available || isProcessing}
                        className={`w-full ${
                          item.available 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-lg transform hover:scale-105' 
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white py-3 rounded-xl font-semibold transition-all duration-300`}
                      >
                        {item.available ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Debug info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            {activeCategory 
              ? `Showing dishes from: ${activeCategory}`
              : "Click a category to filter dishes"}
          </p>
          {activeCategory && (
            <button
              onClick={() => handleCategoryClick(activeCategory)}
              className="mt-2 text-orange-500 hover:text-orange-700 font-medium"
            >
              Clear filter
            </button>
          )}
        </div>
      </section>

      {/* Rest of your component remains the same (cart modals, etc.) */}
      {/* ... Keep all the cart modal code from your original ... */}
    </div>
  );
}