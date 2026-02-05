import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, TrendingUp, Globe, Target, Zap, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission = () => {
    const stats = [
        {
            icon: <Users className="w-8 h-8" />,
            number: "50K+",
            label: "Active Users",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            number: "500K+",
            label: "Food Items Analyzed",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            number: "20+",
            label: "Languages Supported",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Award className="w-8 h-8" />,
            number: "99.2%",
            label: "Accuracy Rate",
            color: "from-cyan-500 to-teal-500"
        }
    ];

    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Health First",
            description: "We prioritize your health and well-being above everything. Every feature is designed with your safety in mind."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy & Security",
            description: "Your data is encrypted and never shared. All analysis happens securely on our HIPAA-compliant platform."
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Accuracy Matters",
            description: "Powered by Google's Gemini 2.5 AI, we deliver precise nutritional insights you can trust."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Accessibility for All",
            description: "Supporting 20+ languages and multiple health conditions to serve everyone, everywhere."
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Hero Content */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Our Mission
                            </h1>
                            <p className="text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-semibold mb-4">
                                Empowering everyone to make informed, healthier food choices through accessible AI-powered nutrition analysis.
                            </p>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                We believe that understanding what you eat should be simple, instant, and personalized to your unique health needs. 
                                NutriVigil bridges the gap between complex nutritional data and everyday food decisions.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Impact</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border-white/10 p-8 rounded-3xl border backdrop-blur-xl text-center transition-all hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 sm:p-12 border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Why We Built NutriVigil</h2>
                        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
                            <p>
                                Every year, millions struggle with diet-related health conditions like diabetes, hypertension, 
                                and heart disease. Yet understanding food labels and making safe dietary choices remains complex and time-consuming.
                            </p>
                            <p>
                                <span className="text-purple-400 font-semibold">We created NutriVigil to change that.</span> Using 
                                cutting-edge AI technology, we've made nutrition analysis instant, accurate, and personalized to your health needs.
                            </p>
                            <p>
                                Our mission goes beyond technology—it's about <span className="text-pink-400 font-semibold">democratizing health information</span>, 
                                supporting diverse communities worldwide, and helping you live your healthiest life, one meal at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl transition-all hover:-translate-y-2"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-purple-400 mt-1">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join Our Mission</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Be part of the movement towards healthier, more informed eating habits.
                    </p>
                    <Link 
                        to="/scan" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                    >
                        <Zap className="w-5 h-5" />
                        Start Your Journey Today
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Mission;