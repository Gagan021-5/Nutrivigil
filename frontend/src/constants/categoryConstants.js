/**
 * Centralized category definitions and counts.
 * Counts are computed from FOOD_ITEMS so the UI stays consistent with the data.
 */

import FOOD_ITEMS from '../data/foodItems';

// Category images (shared across BrowseFoods and CategoryDetail)
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

/** Base category metadata (no count). Slug must match FOOD_ITEMS keys. */
const CATEGORY_META = [
  { id: 1, name: 'Baby Food', slug: 'baby-food', description: 'Nutritious and safe food options specially formulated for infants and toddlers', gradient: 'from-pink-500 to-rose-500', image: babyFoodImg },
  { id: 2, name: 'Baking', slug: 'baking', description: 'Essential ingredients and mixes for all your baking needs', gradient: 'from-amber-500 to-orange-500', image: bakingImg },
  { id: 3, name: 'Bread', slug: 'bread', description: 'Fresh and packaged breads from artisan loaves to everyday sliced', gradient: 'from-yellow-500 to-amber-500', image: breadImg },
  { id: 4, name: 'Breakfast', slug: 'breakfast', description: 'Start your day right with nutritious breakfast options', gradient: 'from-orange-500 to-red-500', image: breakfastImg },
  { id: 5, name: 'Cakes', slug: 'cakes', description: 'Delicious cakes and cake mixes for every celebration', gradient: 'from-purple-500 to-pink-500', image: cakesImg },
  { id: 6, name: 'Canned Goods', slug: 'canned-goods', description: 'Preserved foods with long shelf life for convenient meal prep', gradient: 'from-gray-500 to-slate-500', image: cannedGoodsImg },
  { id: 7, name: 'Cereal', slug: 'cereal', description: 'Quick and nutritious breakfast cereals for the whole family', gradient: 'from-yellow-500 to-orange-500', image: cerealImg },
  { id: 8, name: 'Cheese', slug: 'cheese', description: 'Wide variety of natural and processed cheese products', gradient: 'from-yellow-400 to-yellow-600', image: cheeseImg },
  { id: 9, name: 'Coffee', slug: 'coffee', description: 'Premium coffee beans, grounds, and instant coffee options', gradient: 'from-brown-500 to-amber-700', image: coffeeImg },
  { id: 10, name: 'Cookies & Biscuits', slug: 'cookies-biscuits', description: 'Sweet and savory cookies, crackers, and biscuits', gradient: 'from-amber-500 to-brown-500', image: cookiesBiscuitImg },
  { id: 11, name: 'Beverages', slug: 'beverages', description: 'Refreshing drinks from juices to sodas and energy drinks', gradient: 'from-blue-500 to-cyan-500', image: beveragesImg },
  { id: 12, name: 'Pasta', slug: 'pasta', description: 'Italian pasta in various shapes, sizes, and flavors', gradient: 'from-red-500 to-orange-500', image: pastaImg },
  { id: 13, name: 'Snacks', slug: 'snacks', description: 'Tasty snacks from chips to healthy protein bars', gradient: 'from-indigo-500 to-purple-500', image: snacksImg },
  { id: 14, name: 'Produce', slug: 'produce', description: 'Fresh fruits and vegetables for a healthy lifestyle', gradient: 'from-green-500 to-emerald-500', image: produceImg },
  { id: 15, name: 'Ice Cream', slug: 'ice-cream', description: 'Frozen desserts and ice cream in delightful flavors', gradient: 'from-red-600 to-rose-700', image: icecreamImg },
  { id: 16, name: 'Frozen Foods', slug: 'frozen-foods', description: 'Convenient frozen meals, vegetables, and prepared foods', gradient: 'from-cyan-500 to-blue-500', image: frozenFoodsImg },
];

/**
 * Get the number of items for a category slug from FOOD_ITEMS.
 * @param {string} slug - Category slug (key in FOOD_ITEMS)
 * @returns {number}
 */
export const getCategoryCount = (slug) => {
  const items = FOOD_ITEMS[slug];
  return Array.isArray(items) ? items.length : 0;
};

/**
 * Categories with dynamic counts from FOOD_ITEMS. Use this in BrowseFoods and CategoryDetail.
 * Recomputes when module is evaluated (counts stay in sync with FOOD_ITEMS).
 */
export const CATEGORIES_WITH_COUNTS = CATEGORY_META.map((cat) => ({
  ...cat,
  count: getCategoryCount(cat.slug),
}));

export default CATEGORIES_WITH_COUNTS;
