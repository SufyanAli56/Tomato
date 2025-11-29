'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookingAnimation, setCookingAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCookingAnimation(true);
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setCookingAnimation(false);
    // Handle actual sign-in logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        
        {/* Animated Cooking Scene */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Cooking Pot */}
            <div className="relative w-20 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-2xl rounded-t-lg border-2 border-gray-400">
              {/* Pot Lid */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gray-500 rounded-full"></div>
              {/* Steam Animation */}
              {cookingAnimation && (
                <>
                  <div className="absolute -top-8 left-1/4 w-2 h-6 bg-gray-200 rounded-full animate-steam1"></div>
                  <div className="absolute -top-10 left-1/2 w-3 h-8 bg-gray-200 rounded-full animate-steam2"></div>
                  <div className="absolute -top-7 left-3/4 w-2 h-5 bg-gray-200 rounded-full animate-steam3"></div>
                </>
              )}
              {/* Bubbles */}
              {cookingAnimation && (
                <>
                  <div className="absolute top-2 left-4 w-2 h-2 bg-orange-300 rounded-full animate-bubble1"></div>
                  <div className="absolute top-4 left-8 w-3 h-3 bg-red-400 rounded-full animate-bubble2"></div>
                  <div className="absolute top-1 left-12 w-2 h-2 bg-orange-200 rounded-full animate-bubble3"></div>
                </>
              )}
            </div>
            
            {/* Floating Ingredients */}
            <div className="absolute -top-4 -left-4 animate-float">
              <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg">
                <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-200">
            <span className="text-5xl font-bold text-orange-600 tracking-tight drop-shadow-sm">
              Tamato .
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-light text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ready to continue your culinary journey?
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-orange-100 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute top-4 left-4 text-6xl">🍅</div>
            <div className="absolute top-12 right-8 text-4xl">🧄</div>
            <div className="absolute bottom-8 left-8 text-5xl">🌿</div>
            <div className="absolute bottom-16 right-4 text-3xl">👨‍🍳</div>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 pl-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder-gray-400 group-hover:border-orange-300"
                  placeholder="your@email.com"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {formData.email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 pl-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder-gray-400 group-hover:border-orange-300"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                {formData.password && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Remember Me & Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              {/* Quick Demo Logins */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({ email: 'demo@tamato.com', password: 'demo123', rememberMe: false })}
                  className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  Demo User
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ email: 'admin@tamato.com', password: 'admin123', rememberMe: false })}
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-white focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-orange-200'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span className="animate-pulse">Cooking up your experience...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Sign In to Your Kitchen</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-2xl bg-white text-gray-700 font-medium hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5 mr-3 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-2xl bg-white text-gray-700 font-medium hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                New to Tamato?{' '}
                <Link 
                  href="/auth/signup" 
                  className="font-bold text-orange-600 hover:text-orange-500 transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Create your account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Features Footer */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-xs text-gray-600 font-medium">Secure</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p className="text-xs text-gray-600 font-medium">24/7 Support</p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes steam1 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
        }
        @keyframes steam2 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-25px) scale(1.8); opacity: 0; }
        }
        @keyframes steam3 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-18px) scale(1.3); opacity: 0; }
        }
        @keyframes bubble1 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-8px) scale(1.2); opacity: 0; }
        }
        @keyframes bubble2 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-10px) scale(1.3); opacity: 0; }
        }
        @keyframes bubble3 {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-6px) scale(1.1); opacity: 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-steam1 {
          animation: steam1 2s ease-out infinite;
        }
        .animate-steam2 {
          animation: steam2 2s ease-out infinite 0.5s;
        }
        .animate-steam3 {
          animation: steam3 2s ease-out infinite 1s;
        }
        .animate-bubble1 {
          animation: bubble1 1.5s ease-in-out infinite;
        }
        .animate-bubble2 {
          animation: bubble2 1.5s ease-in-out infinite 0.7s;
        }
        .animate-bubble3 {
          animation: bubble3 1.5s ease-in-out infinite 1.4s;
        }
      `}</style>
    </div>
  );
};

export default SignInPage;