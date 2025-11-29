'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showDelivery, setShowDelivery] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setShowDelivery(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Password strength calculation
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleInputFocus = (fieldName) => {
    const messages = {
      fullName: "What should we call you?",
      email: "We'll send your order confirmations here!",
      password: "Keep your recipes safe and secure",
      confirmPassword: "One more time for safety!"
    };
    setDeliveryMessage(messages[fieldName]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate delivery animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDeliveryMessage("Welcome to Tamato! Your first delivery is on the way! 🚚");
    setIsSubmitting(false);
    // Handle actual signup logic here
  };

  const getStrengthColor = (strength) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return colors[strength] || 'bg-gray-300';
  };

  const getStrengthText = (strength) => {
    const texts = ['Too Weak', 'Fair', 'Good', 'Strong'];
    return texts[strength] || 'None';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12  px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        
        {/* Animated Delivery Truck */}
        {showDelivery && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Delivery Truck */}
              <div className="relative w-24 h-16">
                {/* Truck Body */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
                {/* Truck Cabin */}
                <div className="absolute left-8 top-2 w-8 h-6 bg-orange-600 rounded-l-lg"></div>
                {/* Wheels */}
                <div className="absolute bottom-0 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                <div className="absolute bottom-0 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                {/* Window */}
                <div className="absolute left-9 top-3 w-4 h-3 bg-blue-200 rounded-sm"></div>
                {/* Light */}
                <div className="absolute right-0 top-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              </div>
              
              {/* Delivery Box */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white border-2 border-orange-300 rounded-lg shadow-lg animate-bounce">
                <div className="absolute inset-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-sm"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white"></div>
              </div>

              {/* Speech Bubble */}
              <div className="absolute -top-8 left-5/3 transform -translate-x-1/2 bg-white px-3 py-4 rounded-2xl shadow-lg max-w-xs border border-orange-200">
                <p className="text-sm text-gray-700 text-center font-medium">{deliveryMessage || "Ready to deliver deliciousness! 🚚"}</p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-4 h-4 bg-white border-b border-r border-orange-200 rotate-45"></div>
              </div>

              {/* Moving Road */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-400 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        )}

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-5xl font-bold text-orange-600 tracking-tight">
              Tamato .
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-light text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of food lovers
          </p>
        </div>

        {/* Delivery Progress Bar */}
        <div className="mb-8 bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Account Setup</span>
            <span className="text-orange-600 font-semibold">Step 1 of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '25%' }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Sign Up</span>
            <span>Preferences</span>
            <span>Payment</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-orange-100 relative overflow-hidden">
          
          {/* Floating Delivery Icons */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-4 left-4 animate-float">
              <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-4a1 1 0 00-.293-.707l-4-4A1 1 0 0016 4H3z"/>
              </svg>
            </div>
            <div className="absolute top-12 right-8 animate-float" style={{ animationDelay: '1s' }}>
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="absolute bottom-8 left-8 animate-float" style={{ animationDelay: '2s' }}>
              <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="absolute bottom-16 right-4 animate-float" style={{ animationDelay: '1.5s' }}>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            
            {/* Full Name with User Icon */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('fullName')}
                  className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {formData.fullName && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Email with Mail Icon */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('email')}
                  className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password with Lock Icon and Strength Meter */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('password')}
                  className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                  placeholder="Create a password"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Password Strength</span>
                    <span className={`font-semibold ${
                      passwordStrength === 0 ? 'text-red-500' :
                      passwordStrength === 1 ? 'text-orange-500' :
                      passwordStrength === 2 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {getStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                          item <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password with Check Icon */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleInputFocus('confirmPassword')}
                  className="w-full px-4 pl-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-400"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Animated Submit Button with Delivery Theme */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-4 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] group relative overflow-hidden ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-orange-600 hover:to-red-600'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing Your Order...
                </div>
              ) : (
                <>
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Food Journey
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </>
              )}
            </button>

            {/* Social Signup with Icons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition transform hover:scale-[1.02] group"
              >
                <svg className="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/auth/signIn" 
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Delivery Promise Footer */}
        <div className="text-center mt-8 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-center space-x-2 text-orange-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">30-minute delivery guarantee on your first order!</span>
          </div>
        </div>
      </div>

      {/* Add custom animations to tailwind config */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignupForm;