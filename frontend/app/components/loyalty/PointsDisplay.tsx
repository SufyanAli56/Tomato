'use client';

import React, { useState, useEffect } from 'react';
import { 
  Coins, TrendingUp, Zap, Sparkles, Gem, Target, 
  Award, Rocket, Crown, Star, DollarSign, Clock 
} from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  monthlyEarned?: number;
  dailyAverage?: number;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ 
  points = 1850, 
  monthlyEarned = 450,
  dailyAverage = 15 
}) => {
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [animatedMonthly, setAnimatedMonthly] = useState(0);
  const [showEffects, setShowEffects] = useState(false);
  const [pointsPulse, setPointsPulse] = useState(false);
  const [valuePulse, setValuePulse] = useState(false);

  useEffect(() => {
    // Animate points counter
    const duration = 1500;
    const steps = 60;
    const increment = points / steps;
    let current = 0;
    
    const pointsTimer = setInterval(() => {
      current += increment;
      if (current >= points) {
        current = points;
        clearInterval(pointsTimer);
        setShowEffects(true);
        setPointsPulse(true);
        setTimeout(() => setPointsPulse(false), 1000);
        
        // Animate monthly earned
        const monthlyDuration = 800;
        const monthlySteps = 40;
        const monthlyIncrement = monthlyEarned / monthlySteps;
        let monthlyCurrent = 0;
        
        const monthlyTimer = setInterval(() => {
          monthlyCurrent += monthlyIncrement;
          if (monthlyCurrent >= monthlyEarned) {
            monthlyCurrent = monthlyEarned;
            clearInterval(monthlyTimer);
            setValuePulse(true);
            setTimeout(() => setValuePulse(false), 800);
          }
          setAnimatedMonthly(Math.floor(monthlyCurrent));
        }, monthlyDuration / monthlySteps);
      }
      setAnimatedPoints(Math.floor(current));
    }, duration / steps);

    return () => {
      clearInterval(pointsTimer);
    };
  }, [points, monthlyEarned]);

  const pointValue = (points * 0.1).toFixed(2);
  const monthlyValue = (monthlyEarned * 0.1).toFixed(2);
  const nextMilestone = Math.ceil((points + 1) / 250) * 250;
  const pointsToNext = nextMilestone - points;

  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-amber-50/10 to-yellow-50/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-orange-200/20 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-100/20 to-yellow-100/10 rounded-full translate-y-24 -translate-x-24"></div>
      
      {/* Animated Sparkles */}
      {showEffects && (
        <>
          <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-12 left-8 w-3 h-3 bg-amber-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-8 right-12 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-500"></div>
        </>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="p-6 border-b border-orange-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur-lg opacity-60"></div>
                <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-xl shadow-lg">
                  <Coins className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Points Balance</h2>
                <p className="text-sm text-gray-600">Real-time point tracking</p>
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border border-yellow-200 transition-all duration-300 ${
              pointsPulse ? 'scale-110 shadow-lg' : ''
            }`}>
              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-yellow-600" />
                <span className="font-bold text-yellow-700">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Points Display */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {pointsPulse && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-xl animate-pulse"></div>
              )}
              <div className={`relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-500 bg-clip-text text-transparent transition-all duration-500 ${
                pointsPulse ? 'scale-105' : ''
              }`}>
                {animatedPoints.toLocaleString()}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-medium text-gray-700">POINTS</span>
              </div>
              
              {/* Value Display */}
              <div className={`ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 transition-all duration-300 ${
                valuePulse ? 'scale-105 shadow-md' : ''
              }`}>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-700">${pointValue}</span>
                  <span className="text-sm text-green-600">value</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">10x</div>
                  <div className="text-xs text-blue-600">Rate</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Earn Rate</h3>
              <p className="text-sm text-gray-600">10 points per $1 spent</p>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 hover:shadow-lg hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold text-gray-900 transition-all duration-500 ${
                    animatedMonthly === monthlyEarned ? 'scale-110' : ''
                  }`}>
                    +{animatedMonthly}
                  </div>
                  <div className="text-xs text-green-600">This Month</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Monthly Earned</h3>
              <p className="text-sm text-gray-600">≈ ${monthlyValue} value</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{dailyAverage}</div>
                  <div className="text-xs text-purple-600">Daily</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Daily Average</h3>
              <p className="text-sm text-gray-600">Points earned per day</p>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Next Milestone
              </h3>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-medium">
                {pointsToNext} points to go
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current: {points} points</span>
                <span className="font-medium text-gray-900">Next: {nextMilestone} points</span>
              </div>
              
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(points / nextMilestone) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
                
                {/* Milestone marker */}
                <div 
                  className="absolute top-1/2 w-6 h-6 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full border-2 border-white shadow-lg"
                  style={{ left: `${(nextMilestone / (nextMilestone + 250)) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-gray-700">
                    {nextMilestone}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{nextMilestone}</span>
                <span>{nextMilestone + 250}</span>
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Points Insights</h4>
                <p className="text-sm text-gray-600">Based on your spending pattern</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.ceil(points / 10)}
                </div>
                <div className="text-sm text-gray-600">Estimated orders</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {Math.ceil(pointsToNext / dailyAverage)}
                </div>
                <div className="text-sm text-gray-600">Days to next milestone</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  ${(pointsToNext * 0.1).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Spend needed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">
                  Gold
                </div>
                <div className="text-sm text-gray-600">Next tier at 2000 pts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Points never expire</p>
                <p className="text-sm text-gray-600">As long as you're active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-xs text-gray-600">Months active</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-600">Total orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsDisplay;