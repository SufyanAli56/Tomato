'use client';

import React from 'react';
import { Crown, Gift, Trophy, Star, Sparkles, Target, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import PointsDisplay from './PointsDisplay';
import TierProgress from './TierProgress';

interface LoyaltyCardProps {
  user?: {
    name: string;
    points: number;
    tier: 'Bronze' | 'Silver' | 'Gold';
    nextReward?: {
      pointsRequired: number;
      description: string;
    };
  };
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ user }) => {
  const userData = user || {
    name: 'Alex Johnson',
    points: 1250,
    tier: 'Silver' as const,
    nextReward: {
      pointsRequired: 1500,
      description: 'Gold Tier Unlock - Free Dessert & Priority Delivery'
    }
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Gold': return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg';
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white shadow-md';
      case 'Bronze': return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getTierIcon = (tier: string) => {
    switch(tier) {
      case 'Gold': return <Crown className="w-6 h-6" />;
      case 'Silver': return <Star className="w-6 h-6" />;
      case 'Bronze': return <Trophy className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Decorative Top Pattern */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 opacity-5"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur"></div>
                <div className="relative bg-white p-3.5 rounded-2xl shadow-xl border border-orange-100">
                  <Crown className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Loyalty Rewards</h1>
                <p className="text-gray-600">Welcome back, <span className="font-semibold text-orange-600">{userData.name}</span>!</p>
              </div>
            </div>
            
            {/* Tier Badge */}
            <div className={`px-5 py-3 rounded-2xl ${getTierColor(userData.tier)} flex items-center gap-3 transition-transform hover:scale-105`}>
              {getTierIcon(userData.tier)}
              <div>
                <div className="text-xs font-medium opacity-90">CURRENT TIER</div>
                <div className="text-lg font-bold">{userData.tier}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg">
              <PointsDisplay points={userData.points} />
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg">
              <TierProgress tier={userData.tier} points={userData.points} />
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                  <Target className="w-5 h-5 text-orange-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{userData.points.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            
            <div className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">+450</h3>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
            
            <div className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">5</h3>
              <p className="text-sm text-gray-600">Active Rewards</p>
            </div>
          </div>

          {/* Next Reward Card */}
          {userData.nextReward && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Next Reward Unlock!</h3>
                      <p className="text-white/90">{userData.nextReward.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span className="font-medium">Progress to {userData.tier === 'Silver' ? 'Gold' : 'Silver'}</span>
                      <span className="font-bold">{userData.points}/{userData.nextReward.pointsRequired}</span>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full relative transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${Math.min((userData.points / userData.nextReward.pointsRequired) * 100, 100)}%` 
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-amber-100 animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/80 text-sm">
                        {userData.nextReward.pointsRequired - userData.points} points to go
                      </span>
                      <button className="px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Earn Faster
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="group flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5" />
              <span>Explore Rewards</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group flex-1 min-w-[200px] px-6 py-4 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-xl hover:border-orange-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
              <Target className="w-5 h-5" />
              <span>Set Monthly Goal</span>
            </button>
            
            <button className="group flex-1 min-w-[200px] px-6 py-4 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-xl hover:border-green-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span>View History</span>
            </button>
          </div>
        </div>

        {/* Footer Status */}
        <div className="border-t border-gray-100 px-8 py-5 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Active Member</p>
                <p className="text-sm text-gray-600">Since January 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Orders</p>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">$280</p>
                <p className="text-sm text-gray-600">Saved</p>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;