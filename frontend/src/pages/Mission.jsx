import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, TrendingUp, Globe, Target, Zap, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Mission = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const stats = [
        {
            icon: <Users className="w-8 h-8" />,
            number: "50K+",
            label: t('missionPage.stats.activeUsers'),
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            number: "500K+",
            label: t('missionPage.stats.foodItemsAnalyzed'),
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            number: "20+",
            label: t('missionPage.stats.languagesSupported'),
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Award className="w-8 h-8" />,
            number: "99.2%",
            label: t('missionPage.stats.accuracyRate'),
            color: "from-cyan-500 to-teal-500"
        }
    ];

    const values = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: t('missionPage.values.health.title'),
            description: t('missionPage.values.health.description')
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: t('missionPage.values.privacy.title'),
            description: t('missionPage.values.privacy.description')
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: t('missionPage.values.accuracy.title'),
            description: t('missionPage.values.accuracy.description')
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: t('missionPage.values.accessibility.title'),
            description: t('missionPage.values.accessibility.description')
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
                        {t('missionPage.backToHome')}
                    </Link>

                    {/* Hero Content */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {t('missionPage.title')}
                            </h1>
                            <p className={`text-2xl sm:text-3xl max-w-4xl mx-auto leading-relaxed font-semibold mb-4 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                {t('missionPage.subtitle')}
                            </p>
                            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {t('missionPage.subtitle2')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#0a0e1a]' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('missionPage.impactTitle')}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-8 rounded-xl border text-center hover:border-purple-500 transition-all duration-300 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className={`text-sm ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className={`rounded-2xl p-8 sm:p-12 border transition-colors duration-300 ${
                        theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/20' : 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200'
                    }`}>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">{t('missionPage.whyTitle')}</h2>
                        <div className={`max-w-4xl mx-auto space-y-6 text-lg leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            <p>{t('missionPage.whyP1')}</p>
                            <p>
                                <span className="text-purple-400 font-semibold">{t('missionPage.whyP2Highlight')}</span>{' '}
                                {t('missionPage.whyP2')}
                            </p>
                            <p>
                                {t('missionPage.whyP3Before')} <span className="text-pink-400 font-semibold">{t('missionPage.whyP3Highlight')}</span>{t('missionPage.whyP3After')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('missionPage.valuesTitle')}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-8 rounded-xl border hover:border-purple-500/50 transition-all duration-300 ${
                                    theme === 'dark' ? 'bg-[#0a0e1a] border-gray-800' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-purple-400 mt-1">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                        <p className={`leading-relaxed ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>{value.description}</p>
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
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t('missionPage.ctaTitle')}</h2>
                    <p className={`text-xl mb-8 max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        {t('missionPage.ctaSubtitle')}
                    </p>
                    <Link
                        to="/scan"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                    >
                        <Zap className="w-5 h-5" />
                        {t('missionPage.ctaButton')}
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Mission;