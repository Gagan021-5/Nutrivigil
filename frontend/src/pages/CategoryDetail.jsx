import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Home, ChevronRight, Package } from 'lucide-react';
import FoodItemCard, { FoodItemCardSkeleton } from '../components/FoodItemCard';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import FOOD_ITEMS from '../data/foodItems';

// Import category images
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

// Category data - synced with BrowseFoods.jsx
const CATEGORIES_DATA = [
  {
    id: 1,
    name: 'Baby Food',
    slug: 'baby-food',
    description: 'Nutritious and safe food options specially formulated for infants and toddlers',
    image: babyFoodImg,
    count: 124,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    name: 'Baking',
    slug: 'baking',
    description: 'Essential ingredients and mixes for all your baking needs',
    image: bakingImg,
    count: 234,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 3,
    name: 'Bread',
    slug: 'bread',
    description: 'Fresh and packaged breads from artisan loaves to everyday sliced',
    image: breadImg,
    count: 189,
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: 4,
    name: 'Breakfast',
    slug: 'breakfast',
    description: 'Start your day right with nutritious breakfast options',
    image: breakfastImg,
    count: 312,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    name: 'Cakes',
    slug: 'cakes',
    description: 'Delicious cakes and cake mixes for every celebration',
    image: cakesImg,
    count: 156,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 6,
    name: 'Canned Goods',
    slug: 'canned-goods',
    description: 'Preserved foods with long shelf life for convenient meal prep',
    image: cannedGoodsImg,
    count: 278,
    gradient: 'from-gray-500 to-slate-500'
  },
  {
    id: 7,
    name: 'Cereal',
    slug: 'cereal',
    description: 'Quick and nutritious breakfast cereals for the whole family',
    image: cerealImg,
    count: 198,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 8,
    name: 'Cheese',
    slug: 'cheese',
    description: 'Wide variety of natural and processed cheese products',
    image: cheeseImg,
    count: 167,
    gradient: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 9,
    name: 'Coffee',
    slug: 'coffee',
    description: 'Premium coffee beans, grounds, and instant coffee options',
    image: coffeeImg,
    count: 145,
    gradient: 'from-brown-500 to-amber-700'
  },
  {
    id: 10,
    name: 'Cookies & Biscuits',
    slug: 'cookies-biscuits',
    description: 'Sweet and savory cookies, crackers, and biscuits',
    image: cookiesBiscuitImg,
    count: 223,
    gradient: 'from-amber-500 to-brown-500'
  },
  {
    id: 11,
    name: 'Beverages',
    slug: 'beverages',
    description: 'Refreshing drinks from juices to sodas and energy drinks',
    image: beveragesImg,
    count: 345,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 12,
    name: 'Pasta',
    slug: 'pasta',
    description: 'Italian pasta in various shapes, sizes, and flavors',
    image: pastaImg,
    count: 187,
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 13,
    name: 'Snacks',
    slug: 'snacks',
    description: 'Tasty snacks from chips to healthy protein bars',
    image: snacksImg,
    count: 412,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 14,
    name: 'Produce',
    slug: 'produce',
    description: 'Fresh fruits and vegetables for a healthy lifestyle',
    image: produceImg,
    count: 289,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 15,
    name: 'Ice Cream',
    slug: 'ice-cream',
    description: 'Frozen desserts and ice cream in delightful flavors',
    image: icecreamImg,
    count: 256,
    gradient: 'from-red-600 to-rose-700'
  },
  {
    id: 16,
    name: 'Frozen Foods',
    slug: 'frozen-foods',
    description: 'Convenient frozen meals, vegetables, and prepared foods',
    image: frozenFoodsImg,
    count: 198,
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const CategoryDetail = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    // Load view preference from localStorage
    return localStorage.getItem('nutrivigil-view-mode') || 'grid';
  });

  // Handle view mode change and save to localStorage
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('nutrivigil-view-mode', mode);
  };

  // Filter food items by search query
  const searchedFoodItems = useMemo(() => {
    if (!foodItems || foodItems.length === 0) return [];
    if (!searchQuery.trim()) return foodItems;

    const query = searchQuery.toLowerCase().trim();
    return foodItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      );
    });
  }, [foodItems, searchQuery]);

  // Find category by slug
  useEffect(() => {
    const foundCategory = CATEGORIES_DATA.find(cat => cat.slug === categorySlug);

    if (foundCategory) {
      // Simulate loading state
      setIsLoading(true);
      // Smooth scroll to top when category changes
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setCategory(foundCategory);
        // Load sample food items for this category
        const items = FOOD_ITEMS[categorySlug];
        if ((!items || items.length === 0) && process.env.NODE_ENV === 'development') {
          console.warn(
            `[CategoryDetail] No mock data found for category slug "${categorySlug}". ` +
              'EmptyState will be shown. Ensure FOOD_ITEMS contains data for this category.'
          );
        }
        setFoodItems(items || []);
        setIsLoading(false);
      }, 500);
    } else {
      // Category not found, redirect to browse
      navigate('/browse');
    }
  }, [categorySlug, navigate]);

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className={`w-16 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className={`w-24 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className={`w-32 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
      </div>

      {/* Header Skeleton */}
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className={`w-32 h-32 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className="flex-1 space-y-4 w-full">
            <div className={`w-48 h-8 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`w-full h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`w-24 h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <FoodItemCardSkeleton key={item} />
        ))}
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center py-16 rounded-2xl border ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-200 shadow-lg'
      }`}
    >
      <Package
        className={`w-20 h-20 mx-auto mb-6 ${
          theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
        }`}
      />
      <h3 className={`text-2xl font-bold mb-3 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        No Products Found
      </h3>
      <p className={`text-lg mb-6 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        We're currently adding products to this category. Check back soon!
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/browse')}
        aria-label="Return to Browse Foods page"
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Categories
      </motion.button>
    </motion.div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  // Category not found (shouldn't happen due to redirect in useEffect)
  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" role="main">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8 text-sm"
          aria-label="Breadcrumb"
        >
          <button
            onClick={() => navigate('/')}
            aria-label="Go to Home"
            className={`flex items-center gap-1 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Home
          </button>
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true" />

          <button
            onClick={() => navigate('/browse')}
            aria-label="Go to Browse Foods"
            className={`hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Foods
          </button>
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden="true" />

          <span className={`font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`} aria-current="page">
            {category.name}
          </span>
        </motion.nav>

        {/* Category Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl border backdrop-blur-xl p-8 mb-8 ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
          role="region"
          aria-label="Category information"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Category Icon/Image */}
            <div className="relative">
              <div className={`w-32 h-32 rounded-xl overflow-hidden border-2 ${
                theme === 'dark' ? 'border-white/20' : 'border-gray-200'
              }`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20`} />
              </div>
            </div>

            {/* Category Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {category.name}
              </h1>
              <p className={`text-lg md:text-xl mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {category.description}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                theme === 'dark'
                  ? 'bg-white/10 text-gray-300'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <Package className="w-4 h-4" />
                <span className="font-semibold">{category.count} items</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and View Controls */}
        {foodItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 space-y-4"
          >
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by product name or brand..."
            />

            {/* View Toggle and Results Counter */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Results Counter */}
              <div className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Showing {searchedFoodItems.length} of {foodItems.length} item{foodItems.length !== 1 ? 's' : ''}
              </div>

              {/* View Toggle */}
              <ViewToggle currentView={viewMode} onViewChange={handleViewModeChange} />
            </div>
          </motion.div>
        )}

        {/* Food Items Grid - Phase 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="region"
          aria-label="Food products list"
        >
          {searchedFoodItems.length > 0 ? (
            <div
              className={`
                ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : ''}
                ${viewMode === 'list' ? 'grid grid-cols-1 gap-6' : ''}
                ${viewMode === 'compact' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4' : ''}
              `}
              role="list"
            >
              {searchedFoodItems.map((item, index) => (
                <div key={`${category.name}-${item.id}`} role="listitem">
                  <FoodItemCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-center py-16 rounded-2xl border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              <Package
                className={`w-20 h-20 mx-auto mb-6 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
              <h3 className={`text-2xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                No Products Found
              </h3>
              <p className={`text-lg mb-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No products match your search for "{searchQuery}"
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clear Search
              </motion.button>
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryDetail;
