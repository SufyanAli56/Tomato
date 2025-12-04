'use client';

import React from 'react';
import { Crown, Award, Target, Trophy, CheckCircle, Zap, Star, Gem, TrendingUp, ChevronRight } from 'lucide-react';

interface TierProgressProps {
  tier: 'Bronze' | 'Silver' | 'Gold';
  points: number;
}

const TierProgress: React.FC<TierProgressProps> = ({ tier, points }) => {
  const tiers = [
    { 
      name: 'Bronze', 
      minPoints: 0, 
      maxPoints: 499,
      color: 'bg-gradient-to-r from-amber-600 to-orange-600',
      lightColor: 'bg-amber-50',
      icon: <Award className="w-6 h-6" />,
      iconBg: 'bg-gradient-to-r from-amber-100 to-orange-100',
      iconColor: 'text-amber-600',
      benefits: [
        { icon: <Zap className="w-4 h-4" />, text: '10x points on orders' },
        { icon: <Star className="w-4 h-4" />, text: 'Basic rewards access' },
        { icon: <CheckCircle className="w-4 h-4" />, text: 'Weekly offers' }
      ],
      perks: ['Points tracking', 'Email updates']
    },
    { 
      name: 'Silver', 
      minPoints: 500, 
      maxPoints: 1499,
      color: 'bg-gradient-to-r from-gray-400 to-gray-600',
      lightColor: 'bg-gray-50',
      icon: <Target className="w-6 h-6" />,
      iconBg: 'bg-gradient-to-r from-gray-100 to-gray-200',
      iconColor: 'text-gray-600',
      benefits: [
        { icon: <Zap className="w-4 h-4" />, text: '12x points on orders (+20%)' },
        { icon: <Gem className="w-4 h-4" />, text: 'Exclusive offers' },
        { icon: <TrendingUp className="w-4 h-4" />, text: 'Priority support' }
      ],
      perks: ['All Bronze perks', 'Double birthday points']
    },
    { 
      name: 'Gold', 
      minPoints: 1500, 
      maxPoints: 10000,
      color: 'bg-gradient-to-r from-yellow-500 to-amber-500',
      lightColor: 'bg-yellow-50',
      icon: <Crown className="w-6 h-6" />,
      iconBg: 'bg-gradient-to-r from-yellow-100 to-amber-100',
      iconColor: 'text-yellow-600',
      benefits: [
        { icon: <Zap className="w-4 h-4" />, text: '15x points on orders (+50%)' },
        { icon: <Crown className="w-4 h-4" />, text: 'Priority delivery' },
        { icon: <Gem className="w-4 h-4" />, text: 'VIP birthday gift' }
      ],
      perks: ['All Silver perks', 'Free monthly dessert', 'Personal concierge']
    },
  ];

  const currentTier = tiers.find(t => t.name === tier)!;
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  
  const progress = nextTier 
    ? ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const pointsToNext = nextTier ? nextTier.minPoints - points : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${currentTier.iconBg} shadow-md`}>
              <Trophy className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tier Journey</h2>
              <p className="text-sm text-gray-600">Progress through levels</p>
            </div>
          </div>
          
          {/* Current Tier Badge */}
          <div className={`px-4 py-2 rounded-full ${currentTier.color} text-white font-semibold shadow-lg flex items-center gap-2`}>
            {currentTier.icon}
            <span>{tier}</span>
          </div>
        </div>

        {/* Current Tier Display */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Current Tier</h3>
              <p className="text-gray-600 text-sm">{points.toLocaleString()} points collected</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Total Points</div>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">
                {nextTier ? `Progress to ${nextTier.name}` : 'Max Tier Achieved!'}
              </span>
              <span className="font-bold text-gray-900">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
              <div 
                className={`h-full ${currentTier.color} rounded-full transition-all duration-1000 ease-out relative`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              {/* Progress Indicators */}
              {tiers.map((t, index) => (
                <div 
                  key={t.name}
                  className={`absolute top-1/2 w-4 h-4 -translate-y-1/2 rounded-full border-2 border-white shadow ${
                    points >= t.minPoints ? t.color : 'bg-gray-300'
                  }`}
                  style={{ left: `${((t.minPoints - currentTier.minPoints) / (nextTier?.minPoints || 1500 - currentTier.minPoints)) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold">
                    {t.minPoints}
                  </div>
                </div>
              ))}
            </div>
            
            {nextTier && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Bronze</span>
                <span className="text-gray-600">Silver</span>
                <span className="text-gray-600">Gold</span>
              </div>
            )}
          </div>
        </div>

        {/* Next Tier Info */}
        {nextTier ? (
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 ${nextTier.iconBg} rounded-lg`}>
                  <div className={nextTier.iconColor}>
                    {nextTier.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Next: {nextTier.name}</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-blue-600">{pointsToNext.toLocaleString()}</span> points to go
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 rounded-lg">
                <Crown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">🎉 You&apos;ve Reached Gold!</h4>
                <p className="text-sm text-gray-600">You&apos;re enjoying the highest benefits</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Benefits */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Your Current Benefits
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {currentTier.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-orange-200 hover:shadow-md transition-all duration-300"
              >
                <div className={`p-2 ${currentTier.iconBg} rounded-lg group-hover:scale-110 transition-transform`}>
                  <div className={currentTier.iconColor}>
                    {benefit.icon}
                  </div>
                </div>
                <span className="text-gray-700 group-hover:text-gray-900">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Comparison */}
        <div className="border-t border-gray-100 pt-6">
          <h4 className="font-bold text-gray-900 mb-4">Tier Comparison</h4>
          <div className="grid grid-cols-3 gap-3">
            {tiers.map((t) => (
              <div 
                key={t.name}
                className={`p-3 rounded-lg border text-center transition-all ${
                  t.name === tier 
                    ? `${t.color} text-white border-transparent shadow-lg scale-105` 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`inline-flex p-2 rounded-lg mb-2 ${
                  t.name === tier ? 'bg-white/20' : t.iconBg
                }`}>
                  <div className={t.name === tier ? 'text-white' : t.iconColor}>
                    {t.icon}
                  </div>
                </div>
                <div className={`font-bold ${t.name === tier ? 'text-white' : 'text-gray-900'}`}>
                  {t.name}
                </div>
                <div className={`text-xs mt-1 ${t.name === tier ? 'text-white/90' : 'text-gray-600'}`}>
                  {t.minPoints}+ pts
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Prediction */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-bold text-gray-900 mb-1">Estimated Time to Next Tier</h5>
              <p className="text-sm text-gray-600">
                Based on your monthly average of 450 points
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-purple-600">
                {pointsToNext > 0 ? Math.ceil(pointsToNext / 450) : 0}
              </div>
              <div className="text-xs text-gray-500">months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierProgress;