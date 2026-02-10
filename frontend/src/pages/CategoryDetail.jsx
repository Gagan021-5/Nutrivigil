import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Home, ChevronRight, Package } from 'lucide-react';
import FoodItemCard, { FoodItemCardSkeleton } from '../components/FoodItemCard';

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

// Sample mock data for Phase 2-3 testing (will be replaced with full data in Phase 4)
const SAMPLE_FOOD_ITEMS = {
  'baby-food': [
    { id: 1, name: 'Organic Apple Sauce', brand: 'Gerber', servingSize: '113g', image: null, nutrition: { calories: 50, protein: 0, carbs: 13, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 11, fiber: 1 } },
    { id: 2, name: 'Banana Oatmeal Baby Cereal', brand: "Earth's Best", servingSize: '227g', image: null, nutrition: { calories: 60, protein: 2, carbs: 11, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 10, sugar: 2, fiber: 2 } },
    { id: 3, name: 'Sweet Potato Puree', brand: 'Beech-Nut', servingSize: '113g', image: null, nutrition: { calories: 60, protein: 1, carbs: 14, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 20, sugar: 5, fiber: 2 } },
    { id: 4, name: 'Mixed Vegetable Dinner', brand: 'Gerber', servingSize: '170g', image: null, nutrition: { calories: 70, protein: 2, carbs: 13, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 15, sugar: 3, fiber: 3 } },
  ],
  'baking': [
    { id: 1, name: 'Corn Muffin Mix', brand: 'Jiffy', servingSize: '226g', image: null, nutrition: { calories: 160, protein: 3, carbs: 27, totalFat: 5, saturatedFat: 1, transFat: 0, sodium: 480, sugar: 8, fiber: 1 } },
    { id: 2, name: 'All-Purpose Flour', brand: "Bob's Red Mill", servingSize: '30g', image: null, nutrition: { calories: 110, protein: 3, carbs: 23, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 1 } },
    { id: 3, name: 'Organic Whole Wheat Flour', brand: 'King Arthur', servingSize: '30g', image: null, nutrition: { calories: 100, protein: 4, carbs: 21, totalFat: 0.5, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 3 } },
    { id: 4, name: 'Baking Powder', brand: 'Clabber Girl', servingSize: '5g', image: null, nutrition: { calories: 0, protein: 0, carbs: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 480, sugar: 0, fiber: 0 } },
  ],
  'bread': [
    { id: 1, name: 'Honey Wheat Bread', brand: "Nature's Own", servingSize: '2 slices (52g)', image: null, nutrition: { calories: 130, protein: 5, carbs: 24, totalFat: 2, saturatedFat: 0, transFat: 0, sodium: 240, sugar: 4, fiber: 3 } },
    { id: 2, name: '21 Whole Grains Bread', brand: "Dave's Killer Bread", servingSize: '1 slice (38g)', image: null, nutrition: { calories: 110, protein: 5, carbs: 22, totalFat: 1.5, saturatedFat: 0, transFat: 0, sodium: 170, sugar: 5, fiber: 5 } },
    { id: 3, name: 'Sourdough Bread', brand: 'Boudin', servingSize: '1 slice (45g)', image: null, nutrition: { calories: 120, protein: 4, carbs: 23, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 260, sugar: 1, fiber: 1 } },
    { id: 4, name: 'Italian Bread', brand: 'Pepperidge Farm', servingSize: '1 slice (42g)', image: null, nutrition: { calories: 110, protein: 4, carbs: 21, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 230, sugar: 2, fiber: 1 } },
  ],
  'breakfast': [
    { id: 1, name: 'Instant Oatmeal Maple Brown Sugar', brand: 'Quaker', servingSize: '1 packet (43g)', image: null, nutrition: { calories: 160, protein: 4, carbs: 32, totalFat: 2, saturatedFat: 0, transFat: 0, sodium: 260, sugar: 12, fiber: 3 } },
    { id: 2, name: 'Eggo Waffles Homestyle', brand: "Kellogg's", servingSize: '2 waffles (70g)', image: null, nutrition: { calories: 190, protein: 5, carbs: 30, totalFat: 6, saturatedFat: 1.5, transFat: 0, sodium: 420, sugar: 3, fiber: 1 } },
    { id: 3, name: 'Toaster Strudel Strawberry', brand: 'Pillsbury', servingSize: '1 pastry (54g)', image: null, nutrition: { calories: 190, protein: 3, carbs: 25, totalFat: 9, saturatedFat: 3, transFat: 0, sodium: 190, sugar: 10, fiber: 0 } },
    { id: 4, name: 'Breakfast Burrito', brand: "Amy's Kitchen", servingSize: '1 burrito (170g)', image: null, nutrition: { calories: 270, protein: 9, carbs: 38, totalFat: 9, saturatedFat: 3.5, transFat: 0, sodium: 540, sugar: 2, fiber: 6 } },
  ],
  'cakes': [
    { id: 1, name: 'Yellow Cake Mix', brand: 'Duncan Hines', servingSize: '43g mix', image: null, nutrition: { calories: 170, protein: 2, carbs: 35, totalFat: 3.5, saturatedFat: 1.5, transFat: 0, sodium: 320, sugar: 19, fiber: 0 } },
    { id: 2, name: 'Chocolate Fudge Cake Mix', brand: 'Betty Crocker', servingSize: '43g mix', image: null, nutrition: { calories: 160, protein: 2, carbs: 33, totalFat: 3, saturatedFat: 1.5, transFat: 0, sodium: 440, sugar: 19, fiber: 1 } },
    { id: 3, name: 'Crumb Coffee Cake', brand: "Entenmann's", servingSize: '1/8 cake (57g)', image: null, nutrition: { calories: 250, protein: 3, carbs: 36, totalFat: 11, saturatedFat: 2.5, transFat: 0, sodium: 220, sugar: 19, fiber: 1 } },
    { id: 4, name: 'Angel Food Cake Mix', brand: 'Pillsbury', servingSize: '1/12 cake', image: null, nutrition: { calories: 140, protein: 3, carbs: 32, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 320, sugar: 21, fiber: 0 } },
  ],
  'canned-goods': [
    { id: 1, name: 'Tomato Soup', brand: "Campbell's", servingSize: '1 cup (245g)', image: null, nutrition: { calories: 90, protein: 2, carbs: 20, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 480, sugar: 12, fiber: 2 } },
    { id: 2, name: 'Chicken Noodle Soup', brand: 'Progresso', servingSize: '1 cup (245g)', image: null, nutrition: { calories: 100, protein: 7, carbs: 14, totalFat: 2, saturatedFat: 0.5, transFat: 0, sodium: 690, sugar: 2, fiber: 1 } },
    { id: 3, name: 'Sweet Corn', brand: 'Green Giant', servingSize: '1/2 cup (125g)', image: null, nutrition: { calories: 60, protein: 2, carbs: 11, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 10, sugar: 3, fiber: 2 } },
    { id: 4, name: 'Black Beans', brand: 'Bush\'s Best', servingSize: '1/2 cup (130g)', image: null, nutrition: { calories: 110, protein: 7, carbs: 20, totalFat: 0.5, saturatedFat: 0, transFat: 0, sodium: 460, sugar: 1, fiber: 7 } },
  ],
  'cereal': [
    { id: 1, name: 'Honey Nut Cheerios', brand: 'General Mills', servingSize: '3/4 cup (28g)', image: null, nutrition: { calories: 110, protein: 2, carbs: 22, totalFat: 1.5, saturatedFat: 0, transFat: 0, sodium: 170, sugar: 9, fiber: 2 } },
    { id: 2, name: 'Special K Original', brand: "Kellogg's", servingSize: '3/4 cup (31g)', image: null, nutrition: { calories: 120, protein: 7, carbs: 23, totalFat: 0.5, saturatedFat: 0, transFat: 0, sodium: 200, sugar: 4, fiber: 3 } },
    { id: 3, name: 'Organic Berry Cereal', brand: 'Kashi', servingSize: '1 cup (55g)', image: null, nutrition: { calories: 200, protein: 8, carbs: 43, totalFat: 1.5, saturatedFat: 0, transFat: 0, sodium: 125, sugar: 10, fiber: 11 } },
    { id: 4, name: 'Frosted Flakes', brand: "Kellogg's", servingSize: '3/4 cup (29g)', image: null, nutrition: { calories: 110, protein: 1, carbs: 27, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 150, sugar: 12, fiber: 1 } },
  ],
  'cheese': [
    { id: 1, name: 'Sharp Cheddar Cheese', brand: 'Kraft', servingSize: '1 oz (28g)', image: null, nutrition: { calories: 110, protein: 7, carbs: 0, totalFat: 9, saturatedFat: 6, transFat: 0, sodium: 180, sugar: 0, fiber: 0 } },
    { id: 2, name: 'Colby Jack Slices', brand: 'Sargento', servingSize: '1 slice (21g)', image: null, nutrition: { calories: 80, protein: 5, carbs: 0, totalFat: 7, saturatedFat: 4, transFat: 0, sodium: 140, sugar: 0, fiber: 0 } },
    { id: 3, name: 'Medium Cheddar Block', brand: 'Tillamook', servingSize: '1 oz (28g)', image: null, nutrition: { calories: 110, protein: 7, carbs: 1, totalFat: 9, saturatedFat: 6, transFat: 0, sodium: 180, sugar: 0, fiber: 0 } },
    { id: 4, name: 'Mozzarella String Cheese', brand: 'Kraft', servingSize: '1 stick (28g)', image: null, nutrition: { calories: 80, protein: 6, carbs: 1, totalFat: 6, saturatedFat: 3.5, transFat: 0, sodium: 200, sugar: 0, fiber: 0 } },
  ],
  'coffee': [
    { id: 1, name: 'Pike Place Roast Ground', brand: 'Starbucks', servingSize: '1 tbsp (5g)', image: null, nutrition: { calories: 0, protein: 0, carbs: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 0 } },
    { id: 2, name: 'Original Blend Medium Roast', brand: "Dunkin'", servingSize: '1 tbsp (5g)', image: null, nutrition: { calories: 0, protein: 0, carbs: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 0 } },
    { id: 3, name: 'Classic Roast Instant', brand: 'Folgers', servingSize: '1 tsp (2g)', image: null, nutrition: { calories: 0, protein: 0, carbs: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 0 } },
    { id: 4, name: 'French Roast Dark', brand: 'Peet\'s Coffee', servingSize: '1 tbsp (5g)', image: null, nutrition: { calories: 0, protein: 0, carbs: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 0, fiber: 0 } },
  ],
  'cookies-biscuits': [
    { id: 1, name: 'Oreo Chocolate Sandwich Cookies', brand: 'Nabisco', servingSize: '3 cookies (34g)', image: null, nutrition: { calories: 160, protein: 2, carbs: 25, totalFat: 7, saturatedFat: 2, transFat: 0, sodium: 135, sugar: 14, fiber: 1 } },
    { id: 2, name: 'Chips Ahoy! Original', brand: 'Nabisco', servingSize: '3 cookies (33g)', image: null, nutrition: { calories: 160, protein: 2, carbs: 22, totalFat: 8, saturatedFat: 2.5, transFat: 0, sodium: 105, sugar: 11, fiber: 1 } },
    { id: 3, name: 'Milano Cookies', brand: 'Pepperidge Farm', servingSize: '3 cookies (34g)', image: null, nutrition: { calories: 180, protein: 2, carbs: 21, totalFat: 10, saturatedFat: 5, transFat: 0, sodium: 60, sugar: 10, fiber: 1 } },
    { id: 4, name: 'Fig Newtons', brand: 'Nabisco', servingSize: '2 cookies (29g)', image: null, nutrition: { calories: 110, protein: 1, carbs: 22, totalFat: 2, saturatedFat: 0.5, transFat: 0, sodium: 100, sugar: 12, fiber: 1 } },
  ],
  'beverages': [
    { id: 1, name: 'Coca-Cola Classic', brand: 'Coca-Cola', servingSize: '12 fl oz (355ml)', image: null, nutrition: { calories: 140, protein: 0, carbs: 39, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 45, sugar: 39, fiber: 0 } },
    { id: 2, name: 'Orange Juice No Pulp', brand: 'Tropicana', servingSize: '8 fl oz (240ml)', image: null, nutrition: { calories: 110, protein: 2, carbs: 26, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 22, fiber: 0 } },
    { id: 3, name: 'Red Bull Energy Drink', brand: 'Red Bull', servingSize: '8.4 fl oz (248ml)', image: null, nutrition: { calories: 110, protein: 1, carbs: 28, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 105, sugar: 27, fiber: 0 } },
    { id: 4, name: 'Green Tea', brand: 'Arizona', servingSize: '8 fl oz (240ml)', image: null, nutrition: { calories: 70, protein: 0, carbs: 18, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 15, sugar: 17, fiber: 0 } },
  ],
  'pasta': [
    { id: 1, name: 'Spaghetti', brand: 'Barilla', servingSize: '2 oz (56g)', image: null, nutrition: { calories: 200, protein: 7, carbs: 42, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 2, fiber: 3 } },
    { id: 2, name: 'Penne Rigate', brand: 'De Cecco', servingSize: '2 oz (56g)', image: null, nutrition: { calories: 200, protein: 7, carbs: 41, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 1, fiber: 2 } },
    { id: 3, name: 'Fettuccine', brand: 'Buitoni', servingSize: '2 oz (56g)', image: null, nutrition: { calories: 200, protein: 8, carbs: 38, totalFat: 2, saturatedFat: 0.5, transFat: 0, sodium: 15, sugar: 1, fiber: 2 } },
    { id: 4, name: 'Elbow Macaroni', brand: 'Barilla', servingSize: '2 oz (56g)', image: null, nutrition: { calories: 200, protein: 7, carbs: 42, totalFat: 1, saturatedFat: 0, transFat: 0, sodium: 0, sugar: 2, fiber: 3 } },
  ],
  'snacks': [
    { id: 1, name: 'Classic Potato Chips', brand: "Lay's", servingSize: '1 oz (28g)', image: null, nutrition: { calories: 160, protein: 2, carbs: 15, totalFat: 10, saturatedFat: 1.5, transFat: 0, sodium: 170, sugar: 1, fiber: 1 } },
    { id: 2, name: 'Nacho Cheese Doritos', brand: 'Doritos', servingSize: '1 oz (28g)', image: null, nutrition: { calories: 150, protein: 2, carbs: 18, totalFat: 8, saturatedFat: 1, transFat: 0, sodium: 210, sugar: 0, fiber: 1 } },
    { id: 3, name: 'Dark Chocolate Almond Bar', brand: 'KIND', servingSize: '1 bar (40g)', image: null, nutrition: { calories: 200, protein: 6, carbs: 16, totalFat: 15, saturatedFat: 3.5, transFat: 0, sodium: 125, sugar: 8, fiber: 7 } },
    { id: 4, name: 'Pretzel Sticks', brand: 'Rold Gold', servingSize: '1 oz (28g)', image: null, nutrition: { calories: 110, protein: 3, carbs: 23, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 450, sugar: 1, fiber: 1 } },
  ],
  'produce': [
    { id: 1, name: 'Organic Bananas', brand: 'Fresh', servingSize: '1 medium (118g)', image: null, nutrition: { calories: 105, protein: 1, carbs: 27, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 1, sugar: 14, fiber: 3 } },
    { id: 2, name: 'Gala Apples', brand: 'Fresh', servingSize: '1 medium (182g)', image: null, nutrition: { calories: 95, protein: 0, carbs: 25, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 2, sugar: 19, fiber: 4 } },
    { id: 3, name: 'Baby Carrots', brand: 'Bolthouse Farms', servingSize: '3 oz (85g)', image: null, nutrition: { calories: 35, protein: 1, carbs: 8, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 75, sugar: 5, fiber: 2 } },
    { id: 4, name: 'Broccoli Florets', brand: 'Fresh', servingSize: '1 cup (91g)', image: null, nutrition: { calories: 31, protein: 3, carbs: 6, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 30, sugar: 1, fiber: 2 } },
  ],
  'ice-cream': [
    { id: 1, name: 'Cherry Garcia', brand: "Ben & Jerry's", servingSize: '1/2 cup (104g)', image: null, nutrition: { calories: 250, protein: 4, carbs: 30, totalFat: 13, saturatedFat: 8, transFat: 0, sodium: 45, sugar: 24, fiber: 1 } },
    { id: 2, name: 'Vanilla Bean Ice Cream', brand: 'Häagen-Dazs', servingSize: '1/2 cup (106g)', image: null, nutrition: { calories: 270, protein: 5, carbs: 26, totalFat: 17, saturatedFat: 10, transFat: 0, sodium: 70, sugar: 23, fiber: 0 } },
    { id: 3, name: 'Cookies & Cream', brand: 'Breyers', servingSize: '2/3 cup (66g)', image: null, nutrition: { calories: 140, protein: 2, carbs: 19, totalFat: 7, saturatedFat: 3, transFat: 0, sodium: 60, sugar: 13, fiber: 0 } },
    { id: 4, name: 'Mint Chocolate Chip', brand: 'Turkey Hill', servingSize: '1/2 cup (66g)', image: null, nutrition: { calories: 140, protein: 2, carbs: 18, totalFat: 7, saturatedFat: 4.5, transFat: 0, sodium: 40, sugar: 14, fiber: 1 } },
  ],
  'frozen-foods': [
    { id: 1, name: 'Lasagna with Meat Sauce', brand: "Stouffer's", servingSize: '1 cup (215g)', image: null, nutrition: { calories: 280, protein: 15, carbs: 29, totalFat: 10, saturatedFat: 4.5, transFat: 0, sodium: 850, sugar: 8, fiber: 3 } },
    { id: 2, name: 'Chicken Pot Pie', brand: "Marie Callender's", servingSize: '1 pie (425g)', image: null, nutrition: { calories: 520, protein: 14, carbs: 52, totalFat: 28, saturatedFat: 11, transFat: 0, sodium: 1020, sugar: 5, fiber: 3 } },
    { id: 3, name: 'Mixed Vegetables', brand: 'Birds Eye', servingSize: '2/3 cup (82g)', image: null, nutrition: { calories: 50, protein: 2, carbs: 11, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 35, sugar: 3, fiber: 3 } },
    { id: 4, name: 'Pizza Rolls', brand: "Totino's", servingSize: '6 rolls (85g)', image: null, nutrition: { calories: 220, protein: 7, carbs: 28, totalFat: 9, saturatedFat: 2.5, transFat: 0, sodium: 470, sugar: 3, fiber: 2 } },
  ],
};

const CategoryDetail = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  // Find category by slug
  useEffect(() => {
    const foundCategory = CATEGORIES_DATA.find(cat => cat.slug === categorySlug);

    if (foundCategory) {
      // Simulate loading state
      setIsLoading(true);
      setTimeout(() => {
        setCategory(foundCategory);
        // Load sample food items for this category
        const items = SAMPLE_FOOD_ITEMS[categorySlug];
        if ((!items || items.length === 0) && process.env.NODE_ENV === 'development') {
          console.warn(
            `[CategoryDetail] No mock data found for category slug "${categorySlug}". ` +
              'EmptyState will be shown. Ensure SAMPLE_FOOD_ITEMS contains data for this category.'
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
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8 text-sm"
        >
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-1 hover:underline transition-colors ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />

          <button
            onClick={() => navigate('/browse')}
            className={`hover:underline transition-colors ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Foods
          </button>
          <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />

          <span className={`font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
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

        {/* Food Items Grid - Phase 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {foodItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foodItems.map((item, index) => (
                <FoodItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryDetail;
