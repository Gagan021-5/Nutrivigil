import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Carrot, Drumstick, Milk, Wheat, Leaf } from 'lucide-react';

const Nutrition = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-slate-900 dark:to-emerald-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Food & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Nutrition</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive nutrition database covering thousands of food items with detailed macro and micronutrient information.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Apple, title: 'Fruits & Vegetables', desc: 'Fresh produce nutrition data', color: 'text-red-500' },
            { icon: Drumstick, title: 'Proteins', desc: 'Meat, fish, and plant-based proteins', color: 'text-orange-600' },
            { icon: Wheat, title: 'Grains & Carbs', desc: 'Breads, pasta, rice, and cereals', color: 'text-amber-500' },
            { icon: Milk, title: 'Dairy Products', desc: 'Milk, cheese, yogurt, and alternatives', color: 'text-blue-500' },
            { icon: Leaf, title: 'Organic Foods', desc: 'Certified organic and natural foods', color: 'text-green-600' },
            { icon: Carrot, title: 'Snacks & Treats', desc: 'Healthy snack options and alternatives', color: 'text-purple-500' },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
            >
              <category.icon className={`w-12 h-12 ${category.color} mb-4`} />
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{category.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{category.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">500,000+ Food Items</h2>
          <p className="text-lg opacity-90">Constantly updated database with comprehensive nutritional information.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Nutrition;
