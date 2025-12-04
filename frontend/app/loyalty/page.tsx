'use client';

import React, { useState } from 'react';
import { Crown, Gift, Star, TrendingUp, Zap, Target, Gem, Sparkles, Trophy, Award, Flame } from 'lucide-react';
import LoyaltyCard from '../components/loyalty/LoyaltyCard';
import RewardsCatalog from '../components/loyalty/RewardsCatalog';
import PointsHistory from '../components/loyalty/PointsHistory';
import BirthdayOffer from '../components/loyalty/BirthdayOffer';

const LoyaltyPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userTier, setUserTier] = useState<'Bronze' | 'Silver' | 'Gold'>('Silver');

  const handleRedeem = (reward: any) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      alert(`🎉 Successfully redeemed "${reward.name}"!`);
    }
  };

  const mockUser = {
    name: 'John Doe',
    points: userPoints,
    tier: userTier,
    nextReward: {
      pointsRequired: 1500,
      description: 'Gold Tier Unlock - Free Dessert & Priority Delivery'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white py-12 md:py-16">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="font-semibold">Exclusive Rewards Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Earn <span className="text-yellow-300">Points</span>. Get <span className="text-yellow-300">Rewards</span>.
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of members earning points with every order. 
              Redeem for discounts, free items, and exclusive benefits.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">10x Points per $1</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Crown className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">3 Member Tiers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Gift className="w-5 h-5 text-yellow-300" />
                <span className="font-medium">50+ Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Birthday Offer */}
        <div className="mb-8">
          <BirthdayOffer />
        </div>
        
        {/* Main Loyalty Card */}
        <div className="mb-8">
          <LoyaltyCard user={mockUser} />
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">10x</div>
                <div className="text-sm opacity-90">Points per $1</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm opacity-90">Member Tiers</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Exclusive Rewards</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Rewards */}
          <div className="lg:col-span-2">
            <RewardsCatalog 
              userPoints={userPoints}
              onRedeem={handleRedeem}
            />
          </div>

          {/* Right Column - History */}
          <div>
            <PointsHistory />
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-12 bg-gradient-to-r from-white to-orange-50 rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full mb-4">
              <Target className="w-5 h-5" />
              <span className="font-semibold">HOW IT WORKS</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Start Earning in <span className="text-orange-600">3 Simple Steps</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our loyalty program is designed to reward you at every step of your journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-orange-300 to-amber-300 z-0"></div>
              
              <div className="relative z-10 text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-10 h-10 text-orange-500" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    1
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Earn Points</h4>
                <p className="text-gray-600">
                  Get 10 points for every $1 spent. Earn bonus points on weekends and special promotions.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <Flame className="w-4 h-4" />
                  <span>10x multiplier</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-amber-300 to-yellow-300 z-0"></div>
              
              <div className="relative z-10 text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-10 h-10 text-amber-500" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    2
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Level Up</h4>
                <p className="text-gray-600">
                  Progress through Bronze → Silver → Gold tiers and unlock exclusive member benefits.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  <Trophy className="w-4 h-4" />
                  <span>Exclusive benefits</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 text-center group">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Gift className="w-10 h-10 text-yellow-500" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    3
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Redeem Rewards</h4>
                <p className="text-gray-600">
                  Use your points for free items, discounts, and exclusive offers. New rewards added weekly!
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  <span>Instant redemption</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-orange-600">Questions</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our loyalty program
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">How do I earn points?</h4>
              <p className="text-gray-600">
                You earn 10 points for every $1 spent. Additional bonus points are awarded for weekend orders, referrals, and special promotions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Do points expire?</h4>
              <p className="text-gray-600">
                Points expire after 12 months of inactivity. Active members keep their points indefinitely.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">How do I redeem points?</h4>
              <p className="text-gray-600">
                Browse the rewards catalog, select a reward, and click "Redeem." The discount will be applied to your next order automatically.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3">What are the tier benefits?</h4>
              <p className="text-gray-600">
                Silver tier gets 20% more points, exclusive offers. Gold tier gets 50% more points, priority delivery, and birthday gifts.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Crown className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="font-semibold">START EARNING TODAY</span>
            </div>
            
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your <span className="text-yellow-300">Rewards Journey</span>?
            </h3>
            
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied members who are already enjoying exclusive rewards and benefits.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 flex items-center gap-3">
                <span>Order Now & Earn</span>
                <Sparkles className="w-5 h-5" />
              </button>
              
              <button className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-3">
                <span>Learn More</span>
                <Gem className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>Instant redemption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>Points never expire (active members)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;