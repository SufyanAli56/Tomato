"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Star, Clock, Utensils } from "lucide-react";

// Types
interface MenuItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  ingredients: string[];
  isVegetarian: boolean;
  isSpicy: boolean;
  preparationTime: number;
  popular?: boolean;
}

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

// Enhanced menu data
const menuData: MenuItem[] = [
  {
    id: "1",
    name: "Greek Salad",
    price: 12,
    rating: 4.5,
    description: "Fresh veggies with olives, feta cheese & herbs",
    category: "Salad",
    image: "/api/placeholder/300/200",
    ingredients: ["Lettuce", "Tomatoes", "Olives", "Feta Cheese", "Cucumber"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 15,
    popular: true
  },
  {
    id: "2",
    name: "Paneer Tikka Roll",
    price: 11,
    rating: 4.8,
    description: "Paneer tikka wrapped in soft roti with mint chutney",
    category: "Rolls",
    image: "/api/placeholder/300/200",
    ingredients: ["Paneer", "Bell Peppers", "Spices", "Roti", "Mint"],
    isVegetarian: true,
    isSpicy: true,
    preparationTime: 20,
    popular: true
  },
  {
    id: "3",
    name: "Chocolate Lava Cake",
    price: 9,
    rating: 4.9,
    description: "Warm chocolate cake with melting core, served with ice cream",
    category: "Deserts",
    image: "/api/placeholder/300/200",
    ingredients: ["Chocolate", "Flour", "Eggs", "Sugar", "Vanilla"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 10
  },
  {
    id: "4",
    name: "Grilled Cheese Sandwich",
    price: 8,
    rating: 4.6,
    description: "Three cheese blend between artisan bread, grilled to perfection",
    category: "Sandwich",
    image: "/api/placeholder/300/200",
    ingredients: ["Sourdough", "Cheddar", "Mozzarella", "Parmesan", "Butter"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 12
  },
  {
    id: "5",
    name: "Red Velvet Cake",
    price: 16,
    rating: 4.7,
    description: "Layered red velvet cake with cream cheese frosting",
    category: "Cake",
    image: "/api/placeholder/300/200",
    ingredients: ["Flour", "Cocoa", "Buttermilk", "Cream Cheese", "Vanilla"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 25
  },
  {
    id: "6",
    name: "Paneer Butter Masala",
    price: 18,
    rating: 4.8,
    description: "Cottage cheese in rich tomato butter gravy",
    category: "Pure Veg",
    image: "/api/placeholder/300/200",
    ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Spices"],
    isVegetarian: true,
    isSpicy: true,
    preparationTime: 30
  },
  {
    id: "7",
    name: "Truffle Mushroom Pasta",
    price: 22,
    rating: 4.9,
    description: "Creamy pasta with wild mushrooms and truffle oil",
    category: "Pasta",
    image: "/api/placeholder/300/200",
    ingredients: ["Pasta", "Mushrooms", "Truffle", "Cream", "Parmesan"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: 25
  },
  {
    id: "8",
    name: "Schezwan Noodles",
    price: 14,
    rating: 4.5,
    description: "Spicy schezwan noodles with fresh vegetables",
    category: "Noodles",
    image: "/api/placeholder/300/200",
    ingredients: ["Noodles", "Bell Peppers", "Carrots", "Schezwan Sauce", "Spring Onions"],
    isVegetarian: true,
    isSpicy: true,
    preparationTime: 20
  }
];

const categories = [
  { name: "Salad", icon: "🥗", description: "Fresh & Healthy" },
  { name: "Rolls", icon: "🌯", description: "Quick & Tasty" },
  { name: "Deserts", icon: "🍰", description: "Sweet Treats" },
  { name: "Sandwich", icon: "🥪", description: "Hearty & Filling" },
  { name: "Cake", icon: "🎂", description: "Celebration Specials" },
  { name: "Pure Veg", icon: "🌱", description: "Plant Based" },
  { name: "Pasta", icon: "🍝", description: "Italian Favorites" },
  { name: "Noodles", icon: "🍜", description: "Asian Inspired" }
];

export default function EnhancedMenu({ onCategorySelect }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
  }, [cart]);

  const handleCategoryClick = (categoryName: string) => {
    const newCategory = activeCategory === categoryName ? null : categoryName;
    setActiveCategory(newCategory);
    onCategorySelect(newCategory || "");
  };

  const addToCart = async (item: MenuItem) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      menuItem: item,
      quantity: quantity,
      specialInstructions: specialInstructions,
      totalPrice: item.price * quantity
    };

    setCart(prev => {
      const existingItemIndex = prev.findIndex(cartItem => 
        cartItem.menuItem.id === item.id && 
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

    setIsLoading(false);
    setSelectedItem(null);
    setQuantity(1);
    setSpecialInstructions("");
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

  const filteredItems = activeCategory 
    ? menuData.filter(item => item.category === activeCategory)
    : menuData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                FlavorFusion
              </h1>
              <p className="text-gray-600 text-sm">Exquisite Dining Experience</p>
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group bg-white border border-orange-200 px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-orange-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-orange-500" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">${getTotalPrice().toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{getTotalItems()} items</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Culinary Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Embark on a gastronomic journey with our carefully crafted menu, 
            where every dish tells a story of passion, quality, and unforgettable flavors.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group cursor-pointer transition-all duration-500 ${
                activeCategory === category.name ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className={`bg-white rounded-3xl p-6 text-center shadow-lg border-2 transition-all duration-300 ${
                activeCategory === category.name 
                  ? 'border-orange-500 shadow-orange-200' 
                  : 'border-white group-hover:border-orange-200 group-hover:shadow-xl'
              }`}>
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className={`font-semibold text-lg mb-1 transition-colors ${
                  activeCategory === category.name ? 'text-orange-600' : 'text-gray-800'
                }`}>
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
                {activeCategory === category.name && (
                  <div className="mt-2 w-4 h-1 bg-orange-500 rounded-full mx-auto animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Menu Items Section */}
        {activeCategory && (
          <section className="mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <Utensils className="w-16 h-16 text-orange-300" />
                    </div>
                    
                    {item.popular && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <span className="font-bold text-orange-600">${item.price}</span>
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
                        {item.ingredients.slice(0, 3).map((ingredient, idx) => (
                          <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Item Customization Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                  <p className="text-orange-600 font-semibold text-lg">${selectedItem.price}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    setQuantity(1);
                    setSpecialInstructions("");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-900">{quantity}</span>
                      <p className="text-sm text-gray-500">Total: ${(selectedItem.price * quantity).toFixed(2)}</p>
                    </div>
                    
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Special Instructions
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests, allergies, or preferences..."
                    className="w-full p-4 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setQuantity(1);
                      setSpecialInstructions("");
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addToCart(selectedItem)}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                      </div>
                    ) : (
                      `Add to Cart - $${(selectedItem.price * quantity).toFixed(2)}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>
                    <p className="text-gray-500 text-sm">{getTotalItems()} items in cart</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some delicious items to get started</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                            <Utensils className="w-6 h-6 text-orange-400" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{item.menuItem.name}</h4>
                              <p className="font-bold text-orange-600">${item.totalPrice.toFixed(2)}</p>
                            </div>
                            
                            {item.specialInstructions && (
                              <p className="text-sm text-blue-600 mb-2">Note: {item.specialInstructions}</p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-medium w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-orange-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={clearCart}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => {
                          alert(`Order placed successfully! Total: $${getTotalPrice().toFixed(2)}`);
                          clearCart();
                          setIsCartOpen(false);
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Checkout
                      </button>
                    </div>
                    
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center text-gray-500 hover:text-gray-700 py-2 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button for Mobile */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all z-40 md:hidden animate-bounce"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span>View Cart (${getTotalPrice().toFixed(2)})</span>
          </div>
        </button>
      )}
    </div>
  );
}