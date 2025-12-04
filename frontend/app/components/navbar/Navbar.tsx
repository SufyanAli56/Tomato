"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Crown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const accountStatus = localStorage.getItem('hasAccount');
    
    if (token) {
      setIsAuthenticated(true);
    }
    
    if (accountStatus === 'true') {
      setHasAccount(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/pages/recipes" },
    { label: "About", href: "/pages/about" },
    { label: "Contact", href: "/pages/contact" },
    { label: "Loyalty", href: "/loyalty", icon: Crown },
  ];

  return ( 
    <nav className="bg-white shadow-sm px-4">
      <div className="w-full px-4 lg:px-8 flex justify-center">
        <div className="flex justify-between items-center w-[1200px] max-w-7xl h-16 lg:h-20">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-5xl font-bold text-orange-600 tracking-tight">
              Tamato .
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex ml-12 flex-1 justify-center items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-gray-700 font-light tracking-wide px-1 transition-all duration-300 hover:text-orange-600"
              >
                {item.label === "Loyalty" ? (
                  <div className="flex items-center gap-1">
                    {item.icon && <item.icon className="w-4 h-4 text-yellow-500" />}
                    <span>{item.label}</span>
                  </div>
                ) : item.label}
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-orange-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>

          {/* Right Side: Search, Cart, Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700 hover:text-orange-600 transition cursor-pointer" />
            <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-orange-600 transition cursor-pointer" />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome!</span>
                <button
                  onClick={handleLogout}
                  className="bg-white border border-orange-500 text-orange-600 font-semibold px-6 py-2 rounded-full transition hover:bg-orange-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href={hasAccount ? "/auth/signIn" : "/auth/signup"}
                className="bg-white border border-orange-500 text-orange-600 font-semibold px-6 py-2 rounded-full transition hover:bg-orange-50"
              >
                {hasAccount ? "Sign In" : "Get Started"}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-orange-100 py-6">
          <div className="flex flex-col space-y-4 px-6">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-gray-700 text-lg py-2 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label === "Loyalty" && item.icon && (
                  <item.icon className="w-4 h-4 text-yellow-500" />
                )}
                {item.label}
              </Link>
            ))}
            
            <div className="flex flex-col space-y-4 pt-4 border-t">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white border border-orange-500 text-orange-600 font-semibold px-6 py-2 rounded-full transition hover:bg-orange-50 text-left"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href={hasAccount ? "/auth/signIn" : "/auth/signup"}
                  className="bg-white border border-orange-500 text-orange-600 font-semibold px-6 py-2 rounded-full transition hover:bg-orange-50 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {hasAccount ? "Sign In" : "Get Started"}
                </Link>
              )}
              
              <Link 
                href="/loyalty" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 transition-all text-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Loyalty Program</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;