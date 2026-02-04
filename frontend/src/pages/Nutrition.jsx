import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Database, Search, Zap, Apple, Heart, Droplet, Flame, Activity, Shield, Pill, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Nutrition = () => {
    const decodingSteps = [
        {
            number: "01",
            title: "Label Reading",
            description: "AI extracts nutrition facts from food labels and packages",
            icon: <Search className="w-6 h-6" />
        },
        {
            number: "02",
            title: "Database Matching",
            description: "Cross-reference with 500K+ food items in our comprehensive database",
            icon: <Database className="w-6 h-6" />
        },
        {
            number: "03",
            title: "AI Analysis",
            description: "Gemini AI processes and provides personalized health insights",
            icon: <Brain className="w-6 h-6" />
        }
    ];

    const databaseStats = [
        {
            value: "500K+",
            label: "Food Items",
            icon: <Apple className="w-8 h-8" />
        },
        {
            value: "Global",
            label: "Coverage",
            icon: <Database className="w-8 h-8" />
        },
        {
            value: "Daily",
            label: "Updates",
            icon: <Zap className="w-8 h-8" />
        }
    ];

    const nutrients = [
        {
            category: "Macronutrients",
            icon: <Flame className="w-6 h-6" />,
            color: "from-orange-500 to-red-500",
            items: ["Carbohydrates", "Proteins", "Fats", "Calories"]
        },
        {
            category: "Micronutrients",
            icon: <Pill className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
            items: ["Vitamins (A, B, C, D, E, K)", "Minerals (Iron, Calcium, Zinc)", "Antioxidants"]
        },
        {
            category: "Key Compounds",
            icon: <Droplet className="w-6 h-6" />,
            color: "from-purple-500 to-pink-500",
            items: ["Sodium", "Sugar", "Fiber", "Cholesterol"]
        },
        {
            category: "Safety Markers",
            icon: <AlertCircle className="w-6 h-6" />,
            color: "from-green-500 to-emerald-500",
            items: ["Additives", "Preservatives", "Allergens", "Trans Fats"]
        }
    ];

    const healthConditions = [
        {
            condition: "Diabetes-Friendly",
            icon: <Activity className="w-6 h-6" />,
            description: "Track sugar, carbs, and glycemic impact",
            color: "bg-blue-500/10 border-blue-500/30"
        },
        {
            condition: "Heart-Healthy",
            icon: <Heart className="w-6 h-6" />,
            description: "Monitor sodium, cholesterol, and saturated fats",
            color: "bg-red-500/10 border-red-500/30"
        },
        {
            condition: "Kidney-Safe",
            icon: <Shield className="w-6 h-6" />,
            description: "Control potassium, phosphorus, and protein intake",
            color: "bg-purple-500/10 border-purple-500/30"
        },
        {
            condition: "Allergy Tracking",
            icon: <AlertCircle className="w-6 h-6" />,
            description: "Identify common allergens and cross-contamination risks",
            color: "bg-yellow-500/10 border-yellow-500/30"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Nutrition Intelligence
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                AI-powered nutrition analysis backed by a comprehensive global food database
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How We Decode Nutrition */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How We Decode Nutrition</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {decodingSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-[#1a1f2e]/50 backdrop-blur-sm p-8 rounded-2xl">
                                    <div className="flex items-start gap-4 mb-4">
                                        <span className="text-5xl font-bold text-purple-400/20">{step.number}</span>
                                        <div className="text-purple-400 mt-2">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                                {index < decodingSteps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-400">
                                        <ChevronRight className="w-8 h-8" aria-hidden="true" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Food Database Stats */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprehensive Food Database</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Powered by an extensive, globally-sourced nutrition database that's updated daily
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {databaseStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-8 rounded-2xl text-center"
                            >
                                <div className="text-purple-400 mb-4 flex justify-center">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nutrients We Track */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Nutrients We Track</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {nutrients.map((nutrient, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1a1f2e]/50 backdrop-blur-sm p-6 rounded-2xl"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${nutrient.color} flex items-center justify-center text-white mb-4`}>
                                    {nutrient.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-3">{nutrient.category}</h3>
                                <ul className="space-y-2">
                                    {nutrient.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Health Condition Support */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Health Condition Support</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Personalized nutrition insights tailored to your specific health needs
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {healthConditions.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`${item.color} border backdrop-blur-sm p-6 rounded-2xl`}
                            >
                                <div className="mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.condition}</h3>
                                <p className="text-sm text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-12 text-center border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Analyze Your Food?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get instant nutrition insights powered by AI and our comprehensive food database
                        </p>
                        <Link 
                            to="/scan" 
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5" />
                            Start Scanning Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Nutrition;
