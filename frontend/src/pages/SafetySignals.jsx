import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, ArrowLeft, Apple, Coffee, Pizza, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SafetySignals = () => {
    const { theme } = useTheme();
    
    const signals = [
        {
            key: 'green',
            title: 'Green — Safe to eat',
            color: 'bg-green-600/90',
            meaning: 'Low risk for most people. Recommended as part of a healthy diet.',
            examples: ['Fresh fruits', 'Steamed vegetables', 'Grilled fish', 'Whole grains (in moderation)'],
            icon: <CheckCircle className="w-6 h-6 text-white" />
        },
        {
            key: 'yellow',
            title: 'Yellow — Consume in moderation',
            color: 'bg-yellow-500/90',
            meaning: 'May be okay in measured amounts; pay attention to portion size and frequency.',
            examples: ['Fried foods', 'Creamy sauces', 'Sweetened yogurt', 'Fruit juices'],
            icon: <AlertTriangle className="w-6 h-6 text-white" />
        },
        {
            key: 'red',
            title: 'Red — Avoid or limit',
            color: 'bg-red-600/90',
            meaning: 'High risk for many health conditions — limit or avoid where possible.',
            examples: ['Sugary drinks', 'Processed meats', 'Deep-fried snacks', 'High-sugar desserts'],
            icon: <XCircle className="w-6 h-6 text-white" />
        }
    ];

    const conditionExamples = [
        {
            condition: 'Diabetes',
            notes: 'Focus on low-sugar, low-glycemic choices. Watch portion sizes for carbs.',
            example: 'Berries (Green) • White bread (Red)'
        },
        {
            condition: 'Hypertension',
            notes: 'Limit sodium and processed foods. Prefer whole, low-sodium options.',
            example: 'Fresh salad (Green) • Canned soup (Red)'
        },
        {
            condition: 'Heart Disease',
            notes: 'Reduce saturated fats and processed meats. Choose lean proteins and veggies.',
            example: 'Grilled salmon (Green) • Bacon (Red)'
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#0a0e1a] text-white' : 'bg-white text-gray-900'
        }`}>
            {/* Hero */}
            <section className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]' : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className={`inline-flex items-center gap-2 transition-colors mb-8 ${
                        theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                    }`}>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Safety Signals</h1>
                            <p className={`max-w-3xl mx-auto mb-8 transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>Traffic Light System to help you quickly assess food safety for your health</p>

                            {/* Traffic Light Visual */}
                            <div className="mx-auto max-w-md">
                                <div className="flex items-center justify-center gap-8">
                                    <div className={`w-24 rounded-3xl p-4 flex flex-col items-center gap-4 backdrop-blur-xl transition-colors duration-300 ${
                                        theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                                    }`}>
                                        <div className="w-14 h-14 rounded-full bg-green-600/90 flex items-center justify-center shadow-lg">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="w-14 h-14 rounded-full bg-yellow-500/90 flex items-center justify-center shadow-lg">
                                            <AlertTriangle className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                                            <XCircle className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-lg transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>Quick guide: Green = safe, Yellow = moderate caution, Red = avoid or limit.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">How the Traffic Light Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {signals.map((s, idx) => (
                            <motion.div key={s.key} className={`p-6 rounded-3xl backdrop-blur-xl transition-all hover:-translate-y-2 ${
                                theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                            }`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.08 }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>{s.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-lg">{s.title}</h3>
                                        <p className={`text-sm transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>{s.meaning}</p>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <p className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Example Foods</p>
                                    <ul className="space-y-2 mb-3">
                                        {s.examples.map((e, i) => (
                                            <li key={i} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                <span className={theme === 'dark' ? 'text-white/80' : 'text-gray-700'}>•</span>
                                                <span>{e}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className={`text-sm transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}><strong>Portion guidance:</strong> Follow moderation and check portion sizes for yellow items; avoid frequent red items.</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Based On Your Health */}
            <section className={`py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]/30' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Based on Your Health</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {conditionExamples.map((c, idx) => (
                            <motion.div key={idx} className={`p-6 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${
                                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                            }`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.06 }}>
                                <h3 className="font-bold text-lg mb-2">{c.condition}</h3>
                                <p className={`text-sm mb-3 transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>{c.notes}</p>
                                <p className={`text-sm transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}><strong>Example:</strong> {c.example}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Real Food Examples</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Example Cards */}
                        <motion.div className={`p-4 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-green-600/90 flex items-center justify-center"> <Apple className="w-6 h-6 text-white" /> </div>
                                <div>
                                    <h4 className="font-semibold">Fresh Apple</h4>
                                    <p className={`text-sm transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Signal: <span className="text-green-400 font-semibold">Green</span></p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={`p-4 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-yellow-500/90 flex items-center justify-center"> <Coffee className="w-6 h-6 text-white" /> </div>
                                <div>
                                    <h4 className="font-semibold">Café Latte</h4>
                                    <p className={`text-sm transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Signal: <span className="text-yellow-300 font-semibold">Yellow</span></p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={`p-4 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-red-600/90 flex items-center justify-center"> <Pizza className="w-6 h-6 text-white" /> </div>
                                <div>
                                    <h4 className="font-semibold">Pepperoni Pizza</h4>
                                    <p className={`text-sm transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Signal: <span className="text-red-400 font-semibold">Red</span></p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={`p-4 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${
                            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                        }`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-green-600/90 flex items-center justify-center"> <Heart className="w-6 h-6 text-white" /> </div>
                                <div>
                                    <h4 className="font-semibold">Grilled Salmon</h4>
                                    <p className={`text-sm transition-colors duration-300 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Signal: <span className="text-green-400 font-semibold">Green</span></p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 transition-colors duration-300">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try the Safety Scanner</h2>
                    <p className={`mb-6 max-w-2xl mx-auto transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                    }`}>Scan your food to see instant safety signals tailored for you.</p>
                    <Link to="/scan" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition-transform">Try Scanner</Link>
                </div>
            </section>
        </div>
    );
};

export default SafetySignals;
