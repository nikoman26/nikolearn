import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Crown, Zap, Heart, Palette, Gift, Lock, Coins, Sparkles } from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'avatar' | 'privilege' | 'theme' | 'sticker' | 'reward';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  isUnlocked: boolean;
  effects?: {
    coinBonus?: number;
    streakBonus?: number;
    attentionBonus?: number;
  };
}

interface ShopProps {}

export const Shop: React.FC<ShopProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [walletBalance, setWalletBalance] = useState(450);
  const [ownedItems, setOwnedItems] = useState<string[]>(['basic_avatar', 'study_time']);

  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingBag },
    { id: 'avatar', name: 'Avatars', icon: Crown },
    { id: 'privilege', name: 'Privileges', icon: Zap },
    { id: 'theme', name: 'Themes', icon: Palette },
    { id: 'sticker', name: 'Stickers', icon: Star },
    { id: 'reward', name: 'Rewards', icon: Gift },
  ];

  const shopItems: ShopItem[] = [
    // Avatar Items
    {
      id: 'premium_avatar',
      name: 'Mwalimu Premium',
      description: 'A distinguished avatar with teaching robes and wisdom aura',
      price: 150,
      category: 'avatar',
      rarity: 'epic',
      image: '👨‍🏫',
      isUnlocked: false,
      effects: { coinBonus: 10 }
    },
    {
      id: 'scientist_avatar',
      name: 'Kenyan Scientist',
      description: 'Lab coat and safety goggles, perfect for science lessons',
      price: 100,
      category: 'avatar',
      rarity: 'rare',
      image: '🧑‍🔬',
      isUnlocked: false,
      effects: { attentionBonus: 5 }
    },
    {
      id: 'farmer_avatar',
      name: 'Shamba Farmer',
      description: 'Traditional farming gear representing Kenyan agriculture',
      price: 80,
      category: 'avatar',
      rarity: 'common',
      image: '👨‍🌾',
      isUnlocked: false,
      effects: { streakBonus: 2 }
    },

    // Privileges
    {
      id: 'extra_screen_time',
      name: 'Extra Screen Time',
      description: 'Additional 30 minutes of learning time today',
      price: 50,
      category: 'privilege',
      rarity: 'common',
      image: '⏰',
      isUnlocked: false,
    },
    {
      id: 'skip_homework',
      name: 'Homework Pass',
      description: 'Skip one homework assignment this week',
      price: 100,
      category: 'privilege',
      rarity: 'rare',
      image: '📚',
      isUnlocked: false,
    },
    {
      id: 'choose_lesson',
      name: 'Lesson Choice',
      description: 'Pick your favorite lesson topic for tomorrow',
      price: 75,
      category: 'privilege',
      rarity: 'common',
      image: '🎯',
      isUnlocked: false,
    },

    // Themes
    {
      id: 'space_theme',
      name: 'Space Explorer',
      description: 'Transform your interface with cosmic themes',
      price: 120,
      category: 'theme',
      rarity: 'epic',
      image: '🚀',
      isUnlocked: false,
      effects: { coinBonus: 15 }
    },
    {
      id: 'jungle_theme',
      name: 'African Safari',
      description: 'Rich green themes with wildlife animations',
      price: 90,
      category: 'theme',
      rarity: 'rare',
      image: '🦁',
      isUnlocked: false,
    },
    {
      id: 'ocean_theme',
      name: 'Coastal Waves',
      description: 'Calming blue themes with gentle wave animations',
      price: 80,
      category: 'theme',
      rarity: 'common',
      image: '🌊',
      isUnlocked: false,
    },

    // Stickers
    {
      id: 'celebration_stickers',
      name: 'Celebration Pack',
      description: '20 unique stickers for expressing achievements',
      price: 40,
      category: 'sticker',
      rarity: 'common',
      image: '🎉',
      isUnlocked: false,
    },
    {
      id: 'kenyan_culture',
      name: 'Kenyan Culture',
      description: 'Traditional patterns and cultural symbols',
      price: 60,
      category: 'sticker',
      rarity: 'rare',
      image: '🎭',
      isUnlocked: false,
    },

    // Rewards
    {
      id: 'family_dinner',
      name: 'Family Dinner Choice',
      description: 'Choose the family dinner menu tonight',
      price: 200,
      category: 'reward',
      rarity: 'legendary',
      image: '🍽️',
      isUnlocked: false,
    },
    {
      id: 'weekend_outing',
      name: 'Weekend Adventure',
      description: 'Plan a fun family activity for the weekend',
      price: 300,
      category: 'reward',
      rarity: 'legendary',
      image: '🎪',
      isUnlocked: false,
    },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-200';
      case 'rare': return 'shadow-blue-200';
      case 'epic': return 'shadow-purple-200';
      case 'legendary': return 'shadow-yellow-200';
      default: return 'shadow-gray-200';
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (walletBalance >= item.price && !ownedItems.includes(item.id)) {
      setWalletBalance(prev => prev - item.price);
      setOwnedItems(prev => [...prev, item.id]);
      
      // Show success animation or notification
      console.log(`Purchased ${item.name} for ${item.price} coins!`);
    }
  };

  return (
    <div className="p-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NIKO Shop</h1>
          <p className="text-gray-500">Spend your LearnCoins on awesome rewards!</p>
        </div>
        
        {/* Wallet Display */}
        <div className="bg-[#e0e5ec] p-4 rounded-2xl shadow-clay flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <Coins className="text-yellow-800" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{walletBalance}</div>
            <div className="text-xs text-gray-500">LearnCoins</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-[#e0e5ec] text-gray-600 hover:bg-primary/10'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isOwned = ownedItems.includes(item.id);
          const canAfford = walletBalance >= item.price;
          
          return (
            <div
              key={item.id}
              className={`bg-[#e0e5ec] rounded-3xl p-6 shadow-clay border-2 ${getRarityColor(item.rarity)} ${getRarityGlow(item.rarity)} hover:scale-105 transition-transform`}
            >
              
              {/* Item Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{item.image}</div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                    item.rarity === 'common' ? 'bg-gray-200 text-gray-700' :
                    item.rarity === 'rare' ? 'bg-blue-200 text-blue-700' :
                    item.rarity === 'epic' ? 'bg-purple-200 text-purple-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {item.rarity}
                  </span>
                  {isOwned && <Crown size={16} className="text-yellow-500" />}
                </div>
              </div>

              {/* Item Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                {/* Effects */}
                {item.effects && (
                  <div className="flex gap-2 mb-3">
                    {item.effects.coinBonus && (
                      <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                        <Coins size={12} />
                        <span>+{item.effects.coinBonus} coins</span>
                      </div>
                    )}
                    {item.effects.streakBonus && (
                      <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                        <Sparkles size={12} />
                        <span>+{item.effects.streakBonus} streak</span>
                      </div>
                    )}
                    {item.effects.attentionBonus && (
                      <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">
                        <Heart size={12} />
                        <span>+{item.effects.attentionBonus} focus</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Purchase Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-yellow-600" />
                  <span className="font-bold text-gray-800">{item.price}</span>
                </div>
                
                {isOwned ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Crown size={16} />
                    <span className="text-sm font-semibold">Owned</span>
                  </div>
                ) : canAfford ? (
                  <button
                    onClick={() => handlePurchase(item)}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Buy Now
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Lock size={16} />
                    <span className="text-sm">Need {item.price - walletBalance} more</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 bg-gradient-to-r from-primary/10 to-purple-100 rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">{ownedItems.length}</div>
            <div className="text-sm text-gray-600">Items Owned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{walletBalance}</div>
            <div className="text-sm text-gray-600">Current Balance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{Math.round((ownedItems.length / shopItems.length) * 100)}%</div>
            <div className="text-sm text-gray-600">Collection Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
