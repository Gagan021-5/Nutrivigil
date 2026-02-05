import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Brain, Target, CheckCircle, Scan, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            icon: <Upload className="w-8 h-8" />,
            title: "Upload Food Photo",
            description: "Take a picture of your food package, label, or meal. Our AI works with any food image - from restaurant dishes to grocery items.",
            color: "from-purple-500 to-indigo-500"
        },
        {
            number: "02",
            icon: <Scan className="w-8 h-8" />,
            title: "AI Identifies Food",
            description: "Powered by Gemini 2.5 AI, our system instantly recognizes the food item and extracts nutritional information from labels or databases.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            number: "03",
            icon: <Brain className="w-8 h-8" />,
            title: "Health Analysis",
            description: "Based on your health condition (diabetes, hypertension, etc.), our AI analyzes if the food is safe, providing a color-coded verdict.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            number: "04",
            icon: <Target className="w-8 h-8" />,
            title: "Get Recommendations",
            description: "Receive personalized suggestions, healthier alternatives, and detailed nutritional breakdowns tailored to your health goals.",
            color: "from-cyan-500 to-teal-500"
        }
    ];

    const features = [
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "Traffic Light System",
            description: "Quick visual indicators: Green (Safe), Yellow (Moderate), Red (Avoid)"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Privacy First",
            description: "All analysis happens securely. Your health data stays private."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Real-Time Results",
            description: "Get comprehensive analysis in under 3 seconds"
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
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            How It Works
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            From photo to personalized health insights in 4 simple steps. 
                            Let AI guide your nutrition journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Steps Section - Timeline Design */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Step Number & Icon */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center relative`}>
                                            <div className="text-white">
                                                {step.icon}
                                            </div>
                                            <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#1a1f2e] border-2 border-purple-500 rounded-full flex items-center justify-center font-bold text-purple-400">
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    <div className={`flex-1 bg-white/5 border-white/10 p-8 rounded-3xl border backdrop-blur-xl transition-all hover:-translate-y-2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={`hidden md:block absolute top-24 w-0.5 h-16 bg-gradient-to-b from-purple-500/50 to-transparent transform translate-y-4 ${
                                            index % 2 === 1 ? 'right-12' : 'left-12'
                                        }`}
                                    ></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        What Makes It Special
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl transition-all hover:-translate-y-2"
                            >
                                <div className="text-purple-400 mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-12 border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Ready to Try It?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users making smarter food choices with AI-powered nutrition analysis.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/scan" 
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                            >
                                <Scan className="w-5 h-5" />
                                Start Scanning Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link 
                                to="/about" 
                                className="inline-flex items-center justify-center gap-2 bg-[#1a1f2e] hover:bg-[#252a3a] text-white font-semibold px-8 py-4 rounded-lg border border-gray-700 transition-all"
                            >
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
