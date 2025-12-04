'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, Gift, Star, Zap, TrendingUp, Calendar, 
  Coffee, Pizza, Filter, Download, ChevronDown, ChevronUp,
  Search, TrendingDown, TrendingUp as TrendingUpIcon, MoreVertical,
  Award, Users, Clock, Tag
} from 'lucide-react';

interface Transaction {
  id: number;
  type: 'purchase' | 'reward' | 'bonus' | 'birthday' | 'referral';
  points: number;
  description: string;
  date: string;
  orderId?: string;
  status?: 'completed' | 'pending' | 'expired';
  icon?: React.ReactNode;
}

const PointsHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'redeemed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'purchase',
      points: 250,
      description: 'Family Pizza Feast',
      date: 'Today, 2:30 PM',
      orderId: 'ORDER#12345',
      status: 'completed',
      icon: <Pizza className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'bonus',
      points: 150,
      description: 'Welcome Bonus',
      date: 'Jan 10, 2024',
      status: 'completed',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'reward',
      points: -300,
      description: 'Redeemed: $5 Off Coupon',
      date: 'Jan 5, 2024',
      status: 'completed',
      icon: <Tag className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'birthday',
      points: 500,
      description: 'Birthday Special Bonus',
      date: 'Jan 1, 2024',
      status: 'completed',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 5,
      type: 'purchase',
      points: 120,
      description: 'Morning Coffee & Pastry',
      date: 'Dec 28, 2023',
      orderId: 'ORDER#12344',
      status: 'completed',
      icon: <Coffee className="w-5 h-5" />
    },
    {
      id: 6,
      type: 'referral',
      points: 200,
      description: 'Friend Referral - Alex',
      date: 'Dec 25, 2023',
      status: 'completed',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 7,
      type: 'purchase',
      points: 180,
      description: 'Weekend Dinner Special',
      date: 'Dec 20, 2023',
      orderId: 'ORDER#12343',
      status: 'completed',
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      id: 8,
      type: 'bonus',
      points: 50,
      description: 'Weekend Double Points',
      date: 'Dec 15, 2023',
      status: 'completed',
      icon: <Zap className="w-5 h-5" />
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'earned' && transaction.points < 0) return false;
    if (filter === 'redeemed' && transaction.points > 0) return false;
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalPointsEarned = transactions
    .filter(t => t.points > 0)
    .reduce((sum, t) => sum + t.points, 0);

  const totalPointsRedeemed = Math.abs(transactions
    .filter(t => t.points < 0)
    .reduce((sum, t) => sum + t.points, 0));

  const netPoints = totalPointsEarned - totalPointsRedeemed;
  const monthlyAverage = Math.round(totalPointsEarned / 3); // Assuming 3 months

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'purchase': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'reward': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'bonus': return 'bg-gradient-to-r from-yellow-500 to-amber-500';
      case 'birthday': return 'bg-gradient-to-r from-pink-500 to-rose-500';
      case 'referral': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'purchase': return <ShoppingBag className="w-4 h-4" />;
      case 'reward': return <Gift className="w-4 h-4" />;
      case 'bonus': return <Star className="w-4 h-4" />;
      case 'birthday': return <Calendar className="w-4 h-4" />;
      case 'referral': return <TrendingUp className="w-4 h-4" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'purchase': return 'Order';
      case 'reward': return 'Redeemed';
      case 'bonus': return 'Bonus';
      case 'birthday': return 'Birthday';
      case 'referral': return 'Referral';
      default: return 'Other';
    }
  };

  const getStatusBadge = (status?: string) => {
    switch(status) {
      case 'completed': return <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Completed</span>;
      case 'pending': return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Pending</span>;
      case 'expired': return <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Expired</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Points History</h2>
            <p className="text-gray-300">Track your earnings and redemptions</p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Total Earned</span>
              <TrendingUpIcon className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold">{totalPointsEarned.toLocaleString()}</div>
            <div className="text-green-400 text-sm">+{monthlyAverage}/month</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Total Redeemed</span>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold">{totalPointsRedeemed.toLocaleString()}</div>
            <div className="text-gray-300 text-sm">Across {transactions.filter(t => t.points < 0).length} rewards</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Net Points</span>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold">{netPoints.toLocaleString()}</div>
            <div className="text-gray-300 text-sm">Available now</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {(['all', 'earned', 'redeemed'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === filterType
                      ? 'bg-white shadow text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
            <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-6">
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className={`group border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden ${
                expandedId === transaction.id ? 'ring-2 ring-orange-100' : ''
              }`}
            >
              {/* Main Transaction Row */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === transaction.id ? null : transaction.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`relative ${getTypeColor(transaction.type)} p-3 rounded-xl text-white shadow-lg`}>
                    {transaction.icon || getTypeIcon(transaction.type)}
                    {transaction.points > 0 ? (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">+</span>
                      </div>
                    ) : (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">-</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-md">
                        {getTypeLabel(transaction.type)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {transaction.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`text-xl font-bold ${
                    transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points}
                    <span className="text-gray-400 text-sm ml-1">pts</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    {expandedId === transaction.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === transaction.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Transaction Details</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transaction ID:</span>
                          <span className="font-medium">TRX#{transaction.id.toString().padStart(6, '0')}</span>
                        </div>
                        {transaction.orderId && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-medium">{transaction.orderId}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{transaction.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Type:</span>
                          <span className={`font-medium px-2 py-1 rounded-full ${
                            transaction.points > 0 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {getTypeLabel(transaction.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Points Summary</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Points:</span>
                          <span className={`font-bold ${
                            transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated Value:</span>
                          <span className="font-medium">${Math.abs(transaction.points * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-green-600">✓ Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    {transaction.orderId && (
                      <button className="px-3 py-1.5 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                        View Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">Try changing your filters or search term</p>
          </div>
        ) : (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Load More
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Points expire in</span>
                  <span className="font-semibold text-orange-600">365 days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Points Insights</h4>
              <p className="text-sm text-gray-600">Based on your last 3 months activity</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{transactions.filter(t => t.points > 0).length}</div>
              <div className="text-xs text-gray-600">Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{transactions.filter(t => t.points < 0).length}</div>
              <div className="text-xs text-gray-600">Redemptions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{monthlyAverage}</div>
              <div className="text-xs text-gray-600">Avg/month</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{netPoints}</div>
              <div className="text-xs text-gray-600">Net Points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsHistory;