import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Search } from 'lucide-react';

// Import images
import babyFoodImg from '../assets/baby-food.jpg';
import bakingImg from '../assets/baking.jpg';
import breadImg from '../assets/bread.jpg';
import breakfastImg from '../assets/breakfast.jpg';
import cakesImg from '../assets/cakes.jpg';
import cannedGoodsImg from '../assets/canned-goods.jpg';
import cerealImg from '../assets/cereal.jpg';
import cheeseImg from '../assets/chees.jpg';
import coffeeImg from '../assets/coffee.jpg';
import cookiesBiscuitImg from '../assets/cokies-biscuit.jpg';
import beveragesImg from '../assets/beverages.jpg';
import pastaImg from '../assets/pasta.jpg';
import snacksImg from '../assets/snacks.jpg';
import produceImg from '../assets/produce.jpg';
import icecreamImg from '../assets/icecream.jpg';
import frozenFoodsImg from '../assets/frozen-foods.jpg';

const BrowseFoods = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Baby Food',
      image: babyFoodImg,
      count: 124,
      slug: 'baby-food',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Baking',
      image: bakingImg,
      count: 234,
      slug: 'baking',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 3,
      name: 'Bread',
      image: breadImg,
      count: 189,
      slug: 'bread',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      id: 4,
      name: 'Breakfast',
      image: breakfastImg,
      count: 312,
      slug: 'breakfast',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Cakes',
      image: cakesImg,
      count: 156,
      slug: 'cakes',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 6,
      name: 'Canned Goods',
      image: cannedGoodsImg,
      count: 278,
      slug: 'canned-goods',
      gradient: 'from-gray-500 to-slate-500'
    },
    {
      id: 7,
      name: 'Cereal',
      image: cerealImg,
      count: 198,
      slug: 'cereal',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 8,
      name: 'Cheese',
      image: cheeseImg,
      count: 167,
      slug: 'cheese',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 9,
      name: 'Coffee',
      image: coffeeImg,
      count: 145,
      slug: 'coffee',
      gradient: 'from-brown-500 to-amber-700'
    },
    {
      id: 10,
      name: 'Cookies & Biscuits',
      image: cookiesBiscuitImg,
      count: 223,
      slug: 'cookies-biscuits',
      gradient: 'from-amber-500 to-brown-500'
    },
    {
      id: 11,
      name: 'Beverages',
      image: beveragesImg,
      count: 345,
      slug: 'beverages',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 12,
      name: 'Pasta',
      image: pastaImg,
      count: 187,
      slug: 'pasta',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 13,
      name: 'Snacks',
      image: snacksImg,
      count: 412,
      slug: 'snacks',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 14,
      name: 'Produce',
      image: produceImg,
      count: 289,
      slug: 'produce',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 15,
      name: 'Ice Cream',
      image: icecreamImg,
      count: 256,
      slug: 'ice-cream',
      gradient: 'from-red-600 to-rose-700'
    },
    {
      id: 16,
      name: 'Frozen Foods',
      image: frozenFoodsImg,
      count: 198,
      slug: 'frozen-foods',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  const handleCategoryClick = (slug) => {
    // Category detail pages are not yet implemented.
    // Keep users on /browse and show a "Coming soon" placeholder instead of navigating
    console.info(`Category detail for "${slug}" is coming soon.`);
    window.alert('Category detail pages are coming soon.');
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Browse Foods by{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Category
            </span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore nutrition across thousands of foods
          </p>

          {/* Search Bar (placeholder for future enhancement) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className={`relative rounded-2xl border backdrop-blur-xl p-4 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white border-gray-200 shadow-lg'
            }`}>
              <div className="flex items-center gap-3">
                <Search className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search for foods... (Coming Soon)"
                  disabled
                  className={`flex-1 bg-transparent outline-none text-lg ${
                    theme === 'dark' 
                      ? 'placeholder-gray-500 text-white' 
                      : 'placeholder-gray-400 text-gray-900'
                  } cursor-not-allowed`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`group relative rounded-2xl border backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="relative p-5">
                  <h3 className={`text-lg font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {category.count} items
                  </p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/20' : 'bg-white/80'
                  }`}>
                    <span className="text-lg">→</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-16 text-center p-8 rounded-2xl border backdrop-blur-xl ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Can't find what you're looking for?
          </h2>
          <p className={`text-lg mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Use our AI-powered scanner to analyze any food product instantly
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/scan')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Scan Food Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseFoods;
