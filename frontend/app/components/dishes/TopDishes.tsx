"use client";
import React, { useState, useEffect } from "react";
import { StarIcon, PlusIcon, MinusIcon, ShoppingCartIcon, CreditCardIcon, MapPinIcon, ChatBubbleBottomCenterTextIcon, BanknotesIcon, QrCodeIcon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { getAllMenuItems, getMenuByCategory, MenuItem } from "../../lib/services/menuApi";
import { createOrder } from "../../lib/services/orderApi";
import { createMockPayment, createCODPayment, createUPIPayment, completeUPIPayment } from "../../lib/services/paymentApi";

interface TopDishesProps {
  selectedCategory: string;
}

export default function TopDishes({ selectedCategory }: TopDishesProps) {
  const [dishes, setDishes] = useState<MenuItem[]>([]);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Array<{ item: MenuItem; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'payment'>('cart');
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'mock' | 'upi'>('mock');
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; paymentMethod: string } | null>(null);
  const [upiDetails, setUpiDetails] = useState<{ upiId: string; qrCode: string } | null>(null);

  // Fetch menu items based on selected category
  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: MenuItem[];
      if (selectedCategory) {
        const categoryMap: Record<string, string> = {
          "Deserts": "Desserts",
          "Pure Veg": "Pure Veg",
        };
        const apiCategory = categoryMap[selectedCategory] || selectedCategory;
        data = await getMenuByCategory(apiCategory);
      } else {
        data = await getAllMenuItems();
      }
      
      setDishes(data);
    } catch (err: any) {
      console.error("Error fetching menu items:", err);
      setError(err.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const increase = (dishId: string) => {
    const dish = dishes.find(d => d._id === dishId);
    if (!dish || !dish.available) return;
    
    setQty((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.item._id === dishId);
      if (existingItem) {
        return prevCart.map(item =>
          item.item._id === dishId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { item: dish, quantity: 1 }];
      }
    });
  };

  const decrease = (dishId: string) => {
    setQty((prev) => ({
      ...prev,
      [dishId]: Math.max((prev[dishId] || 0) - 1, 0),
    }));
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.item._id === dishId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.item._id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.item._id !== dishId);
      }
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.item.price * cartItem.quantity);
    }, 0);
  };

  const handleRemoveFromCart = (dishId: string) => {
    setQty(prev => ({ ...prev, [dishId]: 0 }));
    setCart(prevCart => prevCart.filter(item => item.item._id !== dishId));
  };

  const resetCheckout = () => {
    setCart([]);
    setQty({});
    setIsCartOpen(false);
    setCheckoutStep('cart');
    setDeliveryAddress("");
    setSpecialInstructions("");
    setPaymentMethod('mock');
    setUpiDetails(null);
    setOrderSuccess(null);
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Get auth token
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to place an order");
        return;
      }

      // Prepare order items
      const orderItems = cart.map(cartItem => ({
        menuItemId: cartItem.item._id,
        name: cartItem.item.name,
        quantity: cartItem.quantity,
        price: cartItem.item.price
      }));

      // Create order
      const orderData = {
        items: orderItems,
        totalAmount: getCartTotal(),
        deliveryAddress: deliveryAddress || "No address provided",
        specialInstructions: specialInstructions || "",
        paymentMethod: paymentMethod === 'cod' ? 'cod' : 'online'
      };

      const order = await createOrder(orderData, token);
      
      // Process payment based on selected method
      if (paymentMethod === 'cod') {
        await createCODPayment(order._id, order.totalAmount, token);
        setOrderSuccess({
          orderId: order._id,
          paymentMethod: 'Cash on Delivery'
        });
        
      } else if (paymentMethod === 'mock') {
        const payment = await createMockPayment(order._id, order.totalAmount, token);
        if (payment.status === 'completed') {
          setOrderSuccess({
            orderId: order._id,
            paymentMethod: 'Mock Payment'
          });
        }
        
      } else if (paymentMethod === 'upi') {
        const upiResponse = await createUPIPayment(order._id, order.totalAmount, token);
        setUpiDetails(upiResponse);
        return; // Don't reset yet, wait for UPI payment
      }

      // Reset after successful order (except for UPI)
      setTimeout(() => {
        resetCheckout();
        fetchMenuItems();
      }, 3000);

    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(`Checkout failed: ${error.message || "Please try again"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUPIPaymentComplete = async () => {
    try {
      setIsProcessing(true);
      const token = localStorage.getItem('token');
      
      if (!token || !upiDetails) return;
      
      // Complete UPI payment
      const payment = await completeUPIPayment(
        cart.reduce((total, item) => total + (item.item.price * item.quantity), 0).toString(),
        token
      );
      
      if (payment.status === 'completed') {
        setOrderSuccess({
          orderId: payment.orderId,
          paymentMethod: 'UPI Payment'
        });
        
        setTimeout(() => {
          resetCheckout();
          fetchMenuItems();
        }, 3000);
      }
    } catch (error: any) {
      console.error("UPI completion error:", error);
      alert(`UPI payment failed: ${error.message || "Please try again"}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredDishes = selectedCategory
    ? dishes.filter(dish => {
        const categoryMap: Record<string, string> = {
          "Deserts": "Desserts"
        };
        const mappedCategory = categoryMap[selectedCategory] || selectedCategory;
        return dish.category === mappedCategory;
      })
    : dishes;

  if (loading) {
    return (
      <div className="w-full bg-white px-6 lg:px-16 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Loading menu...
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl h-52"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white px-6 lg:px-16 py-10">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error: {error}</p>
          <button
            onClick={fetchMenuItems}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry Loading Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white px-6 lg:px-16 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory ? `${selectedCategory} Dishes` : "All Dishes"}
          </h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Cart ({cart.length})
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            
            {selectedCategory && (
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                {filteredDishes.length} {filteredDishes.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedCategory 
                ? `No dishes found in "${selectedCategory}" category.` 
                : "No dishes available."}
            </p>
            <p className="text-gray-400 mt-2">
              {selectedCategory ? "Try selecting a different category." : "Please try again later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredDishes.map((dish) => (
              <div key={dish._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
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

                  {/* Availability Badge */}
                  {!dish.available && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Add/Remove Buttons */}
                  {dish.available && (
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      {qty[dish._id] > 0 && (
                        <button
                          onClick={() => decrease(dish._id)}
                          className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={isProcessing}
                        >
                          <MinusIcon className="h-5 w-5 text-gray-700" />
                        </button>
                      )}

                      <button
                        onClick={() => increase(dish._id)}
                        className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={isProcessing}
                      >
                        <PlusIcon className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>

                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(dish.rating) ? "text-orange-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{dish.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-red-600 text-xl font-bold">${dish.price.toFixed(2)}</p>
                    
                    {dish.available && qty[dish._id] > 0 && (
                      <p className="text-sm font-semibold text-green-600">
                        In Cart: {qty[dish._id]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart & Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {checkoutStep === 'cart' ? 'Your Cart' : 
                   checkoutStep === 'address' ? 'Delivery Details' : 
                   'Payment Method'}
                </h3>
                <button
                  onClick={resetCheckout}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isProcessing}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Order Success Message */}
              {orderSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <div>
                      <h4 className="font-bold text-green-800">Order Placed Successfully!</h4>
                      <p className="text-sm text-green-700">Order ID: {orderSuccess.orderId}</p>
                      <p className="text-sm text-green-700">Payment: {orderSuccess.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment QR Code */}
              {upiDetails && checkoutStep === 'payment' && paymentMethod === 'upi' && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-3">Scan QR Code to Pay</h4>
                  <div className="flex flex-col items-center">
                    <img 
                      src={upiDetails.qrCode} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 mb-3"
                    />
                    <p className="text-sm text-blue-700 mb-2">UPI ID: {upiDetails.upiId}</p>
                    <button
                      onClick={handleUPIPaymentComplete}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {isProcessing ? 'Processing...' : 'I have Paid'}
                    </button>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <button
                        onClick={resetCheckout}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {cart.map((cartItem) => (
                          <div key={cartItem.item._id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-semibold text-gray-900">{cartItem.item.name}</h4>
                              <p className="text-sm text-gray-600">${cartItem.item.price.toFixed(2)} × {cartItem.quantity}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-900">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                              <button
                                onClick={() => handleRemoveFromCart(cartItem.item._id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                disabled={isProcessing}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-4">
                          <span className="text-lg font-semibold text-gray-900">Total:</span>
                          <span className="text-2xl font-bold text-green-600">${getCartTotal().toFixed(2)}</span>
                        </div>

                        <button
                          onClick={() => setCheckoutStep('address')}
                          disabled={isProcessing}
                          className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Address Step */}
              {checkoutStep === 'address' && (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPinIcon className="h-4 w-4 inline mr-2" />
                        Delivery Address
                      </label>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter your complete delivery address"
                        rows={3}
                        disabled={isProcessing}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <ChatBubbleBottomCenterTextIcon className="h-4 w-4 inline mr-2" />
                        Special Instructions
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Any special instructions for the order?"
                        rows={2}
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCheckoutStep('payment')}
                      disabled={!deliveryAddress || isProcessing}
                      className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </>
              )}

              {/* Payment Step */}
              {checkoutStep === 'payment' && !upiDetails && (
                <>
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Select Payment Method</h4>
                    
                    <button
                      onClick={() => setPaymentMethod('mock')}
                      className={`w-full p-4 border rounded-lg flex items-center gap-3 ${paymentMethod === 'mock' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      disabled={isProcessing}
                    >
                      <CreditCardIcon className={`h-6 w-6 ${paymentMethod === 'mock' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-medium">Mock Payment</div>
                        <div className="text-sm text-gray-600">Simulated payment for testing</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-4 border rounded-lg flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      disabled={isProcessing}
                    >
                      <BanknotesIcon className={`h-6 w-6 ${paymentMethod === 'cod' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-gray-600">Pay when you receive your order</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full p-4 border rounded-lg flex items-center gap-3 ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      disabled={isProcessing}
                    >
                      <QrCodeIcon className={`h-6 w-6 ${paymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-medium">Demo UPI Payment</div>
                        <div className="text-sm text-gray-600">Scan QR code to pay</div>
                      </div>
                    </button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold text-gray-900">Order Total:</span>
                      <span className="text-xl font-bold text-green-600">${getCartTotal().toFixed(2)}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setCheckoutStep('address')}
                        className="flex-1 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                        disabled={isProcessing}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {isProcessing ? 'Processing...' : 
                         paymentMethod === 'cod' ? 'Place COD Order' :
                         paymentMethod === 'mock' ? 'Pay with Mock' :
                         'Pay with UPI'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}