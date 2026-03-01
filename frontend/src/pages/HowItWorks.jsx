import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Brain, Target, CheckCircle, Scan, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const steps = [
        {
            number: "01",
            icon: <Upload className="w-8 h-8" />,
            title: t('howItWorks.steps.step1.title'),
            description: t('howItWorks.steps.step1.description'),
            color: "from-purple-500 to-indigo-500"
        },
        {
            number: "02",
            icon: <Scan className="w-8 h-8" />,
            title: t('howItWorks.steps.step2.title'),
            description: t('howItWorks.steps.step2.description'),
            color: "from-indigo-500 to-blue-500"
        },
        {
            number: "03",
            icon: <Brain className="w-8 h-8" />,
            title: t('howItWorks.steps.step3.title'),
            description: t('howItWorks.steps.step3.description'),
            color: "from-blue-500 to-cyan-500"
        },
        {
            number: "04",
            icon: <Target className="w-8 h-8" />,
            title: t('howItWorks.steps.step4.title'),
            description: t('howItWorks.steps.step4.description'),
            color: "from-cyan-500 to-teal-500"
        }
    ];

    const features = [
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: t('howItWorks.features.trafficLight.title'),
            description: t('howItWorks.features.trafficLight.description')
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: t('howItWorks.features.privacy.title'),
            description: t('howItWorks.features.privacy.description')
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: t('howItWorks.features.realTime.title'),
            description: t('howItWorks.features.realTime.description')
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#0a0e1a] text-white' : 'bg-white text-gray-900'
        }`}>
            {/* Hero Section */}
            <section className={`relative py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]' : 'bg-gradient-to-b from-gray-50 to-white'
            }`}>
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <Link 
                        to="/" 
                        className={`inline-flex items-center gap-2 transition-colors mb-8 ${
                            theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('howItWorks.backToHome')}
                    </Link>

                    {/* Hero Content */}
                    <div className="text-center">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t('howItWorks.title')}
                        </h1>
                        <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {t('howItWorks.subtitle')}
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
                                    <div className={`flex-1 p-8 rounded-xl border transition-colors duration-300 ${
                                        theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                    } ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className={`leading-relaxed ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>{step.description}</p>
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
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        {t('howItWorks.featuresTitle')}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex items-start gap-4 p-6 rounded-lg border transition-colors duration-300 ${
                                    theme === 'dark' ? 'bg-[#0a0e1a] border-gray-800' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="text-purple-400 mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className={`rounded-2xl p-12 border transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/20'
                            : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
                    }`}>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            {t('howItWorks.ctaTitle')}
                        </h2>
                        <p className={`text-xl mb-8 max-w-2xl mx-auto ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            {t('howItWorks.ctaDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/scan" 
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                            >
                                <Scan className="w-5 h-5" />
                                {t('howItWorks.startScanning')}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link 
                                to="/about" 
                                className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-lg border transition-all ${
                                    theme === 'dark'
                                        ? 'bg-[#1a1f2e] hover:bg-[#252a3a] text-white border-gray-700'
                                        : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300'
                                }`}
                            >
                                {t('howItWorks.learnMore')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
