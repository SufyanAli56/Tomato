'use client';

import React, { useState } from 'react';
import { 
  Gift, Coffee, Pizza, Star, Tag, Utensils, Cake, Gem,
  Sparkles, Zap, Crown, Trophy, Flame, Filter, Search,
  TrendingUp, ChevronRight, Check, Lock, Target
} from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  color: string;
  category: string;
  popular?: boolean;
  limited?: boolean;
  expiration?: string;
  value?: number; // Dollar value
}

interface RewardsCatalogProps {
  userPoints?: number;
  onRedeem?: (reward: Reward) => void;
}

const RewardsCatalog: React.FC<RewardsCatalogProps> = ({ 
  userPoints = 1850, 
  onRedeem = (reward) => console.log('Redeeming:', reward) 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([3, 6]);
  const [sortBy, setSortBy] = useState<'points' | 'value' | 'popular'>('popular');
  const [searchTerm, setSearchTerm] = useState('');

  const rewards: Reward[] = [
    {
      id: 1,
      name: 'Premium Coffee',
      description: 'Artisanal coffee of your choice',
      points: 250,
      icon: <Coffee className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-amber-500 to-amber-700',
      category: 'drink',
      popular: true,
      limited: true,
      value: 6.99
    },
    {
      id: 2,
      name: '$10 Off',
      description: 'Discount on orders over $50',
      points: 450,
      icon: <Tag className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-green-500 to-emerald-700',
      category: 'discount',
      popular: true,
      value: 10
    },
    {
      id: 3,
      name: 'Signature Dessert',
      description: 'Chef\'s special dessert',
      points: 350,
      icon: <Cake className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-pink-500 to-rose-700',
      category: 'food',
      value: 12.99
    },
    {
      id: 4,
      name: 'Double Points',
      description: '2x points for 7 days',
      points: 600,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-700',
      category: 'boost',
      limited: true,
      value: 0
    },
    {
      id: 5,
      name: 'Gourmet Pizza',
      description: 'Large pizza with premium toppings',
      points: 750,
      icon: <Pizza className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      category: 'food',
      popular: true,
      value: 24.99
    },
    {
      id: 6,
      name: 'Birthday Feast',
      description: 'Complete meal on your birthday',
      points: 0,
      icon: <Gift className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-700',
      category: 'special',
      value: 35.00
    },
    {
      id: 7,
      name: 'Appetizer Combo',
      description: 'Three starter selection',
      points: 300,
      icon: <Utensils className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-lime-500 to-green-700',
      category: 'food',
      value: 18.99
    },
    {
      id: 8,
      name: 'VIP Experience',
      description: 'Priority service & exclusive offers',
      points: 1200,
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-violet-500 to-purple-700',
      category: 'premium',
      value: 50.00
    },
    {
      id: 9,
      name: 'Weekend Brunch',
      description: 'Special weekend menu for two',
      points: 550,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      category: 'food',
      limited: true,
      value: 32.99
    },
    {
      id: 10,
      name: '$5 Off Any Order',
      description: 'Instant discount on any purchase',
      points: 200,
      icon: <Tag className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      category: 'discount',
      popular: true,
      value: 5
    },
    {
      id: 11,
      name: 'Free Delivery',
      description: 'Complimentary delivery for a month',
      points: 400,
      icon: <Flame className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
      category: 'service',
      value: 24.99
    },
    {
      id: 12,
      name: 'Elite Status',
      description: 'Gold tier benefits for 3 months',
      points: 1500,
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      category: 'premium',
      value: 75.00
    },
  ];

  const categories = [
    { id: 'all', name: 'All Rewards', icon: <Sparkles className="w-4 h-4" />, count: rewards.length },
    { id: 'discount', name: 'Discounts', icon: <Tag className="w-4 h-4" />, count: rewards.filter(r => r.category === 'discount').length },
    { id: 'food', name: 'Food Items', icon: <Utensils className="w-4 h-4" />, count: rewards.filter(r => r.category === 'food').length },
    { id: 'drink', name: 'Drinks', icon: <Coffee className="w-4 h-4" />, count: rewards.filter(r => r.category === 'drink').length },
    { id: 'boost', name: 'Boosts', icon: <Zap className="w-4 h-4" />, count: rewards.filter(r => r.category === 'boost').length },
    { id: 'premium', name: 'Premium', icon: <Crown className="w-4 h-4" />, count: rewards.filter(r => r.category === 'premium').length },
    { id: 'special', name: 'Special', icon: <Gift className="w-4 h-4" />, count: rewards.filter(r => r.category === 'special').length },
    { id: 'service', name: 'Services', icon: <Flame className="w-4 h-4" />, count: rewards.filter(r => r.category === 'service').length },
  ];

  const canAfford = (points: number) => userPoints >= points;
  const isRedeemed = (id: number) => redeemedRewards.includes(id);

  const handleRedeemClick = (reward: Reward) => {
    if (canAfford(reward.points) && !isRedeemed(reward.id)) {
      setRedeemedRewards([...redeemedRewards, reward.id]);
      onRedeem(reward);
    }
  };

  const filteredRewards = rewards.filter(reward => {
    if (selectedCategory !== 'all' && reward.category !== selectedCategory) return false;
    if (searchTerm && !reward.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'points') return a.points - b.points;
    if (sortBy === 'value') return (b.value || 0) - (a.value || 0);
    if (sortBy === 'popular') {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    }
    return 0;
  });

  const bestValueReward = filteredRewards.reduce((best, current) => {
    if (current.points > 0 && current.value) {
      const valueRatio = current.value / current.points;
      return valueRatio > best.ratio ? { reward: current, ratio: valueRatio } : best;
    }
    return best;
  }, { reward: filteredRewards[0], ratio: 0 });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Rewards Catalog</h2>
                <p className="text-gray-600">Exchange your points for exclusive rewards</p>
              </div>
            </div>
            
            {/* Points Display */}
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{userPoints.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Available points</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${(userPoints * 0.1).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Total value</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Best Value Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Best Value</div>
                <div className="font-bold">{bestValueReward.reward?.name}</div>
                <div className="text-xs opacity-90">
                  ${bestValueReward.reward?.value} for {bestValueReward.reward?.points} pts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rewards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="points">Lowest Points</option>
                <option value="value">Best Value</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg'
                    : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <span className={selectedCategory === category.id ? 'text-white' : 'text-gray-600'}>
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => {
            const affordable = canAfford(reward.points);
            const redeemed = isRedeemed(reward.id);
            const valueRatio = reward.value ? (reward.value / reward.points).toFixed(3) : '0';
            
            return (
              <div
                key={reward.id}
                className={`group relative bg-white border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                  affordable && !redeemed ? 'cursor-pointer' : ''
                } ${
                  redeemed 
                    ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' 
                    : !affordable 
                    ? 'border-gray-200 bg-gray-50/50' 
                    : 'border-gray-100 hover:border-orange-200'
                }`}
                onClick={() => !redeemed && affordable && handleRedeemClick(reward)}
              >
                {/* Badges */}
                {reward.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                      <Flame className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                )}
                
                {reward.limited && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
                      Limited
                    </div>
                  </div>
                )}
                
                {redeemed && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                      <Check className="w-3 h-3" />
                      Redeemed
                    </div>
                  </div>
                )}

                {/* Reward Icon */}
                <div className={`${reward.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="relative z-10 p-6 bg-white/20 backdrop-blur-sm rounded-2xl">
                    {reward.icon}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                      {reward.points === 0 ? 'FREE' : `${reward.points} pts`}
                    </div>
                  </div>
                </div>

                {/* Reward Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{reward.name}</h3>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                    </div>
                    {reward.value && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">${reward.value}</div>
                        <div className="text-xs text-gray-500">Value</div>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">
                        {Math.min(Math.round((userPoints / reward.points) * 100), 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.min((userPoints / reward.points) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Value ratio</div>
                        <div className="font-semibold text-gray-900">
                          {valueRatio !== '0' ? `$${valueRatio} per point` : 'Boost'}
                        </div>
                      </div>
                    </div>
                    
                    {redeemed ? (
                      <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <Check className="w-5 h-5" />
                        Claimed
                      </div>
                    ) : affordable ? (
                      <button className="group/btn px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                        <span>Redeem Now</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Lock className="w-4 h-4" />
                        <span className="font-medium">
                          Need {reward.points - userPoints} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRewards.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No rewards found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">💡 Pro Tip</h4>
            <p className="text-gray-600 text-sm">
              Save points for higher-value rewards. The value ratio improves with more expensive rewards!
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredRewards.filter(r => r.points <= userPoints && !redeemedRewards.includes(r.id)).length}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {redeemedRewards.length}
              </div>
              <div className="text-sm text-gray-600">Claimed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredRewards.filter(r => r.popular).length}
              </div>
              <div className="text-sm text-gray-600">Popular</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCatalog;