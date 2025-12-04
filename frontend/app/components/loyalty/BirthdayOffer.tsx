'use client';

import React, { useState, useEffect } from 'react';
import { Cake, Gift, Sparkles, PartyPopper, Calendar } from 'lucide-react';

interface BirthdayOfferProps {
  userBirthday?: string;
}

const BirthdayOffer: React.FC<BirthdayOfferProps> = ({ userBirthday = '1990-05-15' }) => {
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  useEffect(() => {
    // Calculate days until birthday
    const today = new Date();
    const birthday = new Date(userBirthday);
    const currentYear = today.getFullYear();
    
    // Set birthday to current year
    birthday.setFullYear(currentYear);
    
    // If birthday has passed this year, set to next year
    if (birthday < today) {
      birthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = birthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysUntilBirthday(diffDays);
    setIsBirthday(diffDays === 0);
  }, [userBirthday]);

  const handleClaimBirthdayGift = () => {
    if (!hasClaimed) {
      setHasClaimed(true);
      alert('🎉 Happy Birthday! 500 bonus points have been added to your account!');
    }
  };

  if (isBirthday) {
    return (
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden animate-pulse">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <PartyPopper className="w-6 h-6 mr-2" />
                <h3 className="text-2xl font-bold">🎂 Happy Birthday!</h3>
              </div>
              <p className="text-lg opacity-90 mb-4">
                It&apos;s your special day! Claim your birthday gift now.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    <span className="font-semibold">500 Bonus Points</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center">
                    <Cake className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Free Dessert</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleClaimBirthdayGift}
              disabled={hasClaimed}
              className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                hasClaimed
                  ? 'bg-white/30 cursor-not-allowed'
                  : 'bg-white text-pink-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {hasClaimed ? (
                <span className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gift Claimed!
                </span>
              ) : (
                'Claim Birthday Gift'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-6 mb-6">
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full mr-4">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Birthday Reward</h3>
          <p className="text-gray-600">
            {daysUntilBirthday === 1 ? (
              '🎉 Your birthday is tomorrow! Get ready for 500 bonus points!'
            ) : (
              `Your birthday is in ${daysUntilBirthday} days. Come back to claim 500 bonus points!`
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayOffer;