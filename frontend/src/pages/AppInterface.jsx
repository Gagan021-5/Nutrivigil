import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Layout, Palette, Zap, Eye, Moon, Accessibility, Gauge, Shield, Heart, Camera, BarChart3, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const AppInterface = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const keyScreens = [
        {
            title: t('appInterfacePage.keyScreens.scanner.title'),
            icon: <Camera className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            description: t('appInterfacePage.keyScreens.scanner.description'),
            features: t('appInterfacePage.keyScreens.scanner.features', { returnObjects: true }),
        },
        {
            title: t('appInterfacePage.keyScreens.results.title'),
            icon: <BarChart3 className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500',
            description: t('appInterfacePage.keyScreens.results.description'),
            features: t('appInterfacePage.keyScreens.results.features', { returnObjects: true }),
        },
        {
            title: t('appInterfacePage.keyScreens.profile.title'),
            icon: <User className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            description: t('appInterfacePage.keyScreens.profile.description'),
            features: t('appInterfacePage.keyScreens.profile.features', { returnObjects: true }),
        },
        {
            title: t('appInterfacePage.keyScreens.diary.title'),
            icon: <Heart className="w-8 h-8" />,
            color: 'from-red-500 to-pink-500',
            description: t('appInterfacePage.keyScreens.diary.description'),
            features: t('appInterfacePage.keyScreens.diary.features', { returnObjects: true }),
        }
    ];

    const features = [
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: t('appInterfacePage.features.mobile.title'),
            description: t('appInterfacePage.features.mobile.description'),
        },
        {
            icon: <Layout className="w-6 h-6" />,
            title: t('appInterfacePage.features.responsive.title'),
            description: t('appInterfacePage.features.responsive.description'),
        },
        {
            icon: <Moon className="w-6 h-6" />,
            title: t('appInterfacePage.features.darkMode.title'),
            description: t('appInterfacePage.features.darkMode.description'),
        },
        {
            icon: <Accessibility className="w-6 h-6" />,
            title: t('appInterfacePage.features.accessibility.title'),
            description: t('appInterfacePage.features.accessibility.description'),
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: t('appInterfacePage.features.fast.title'),
            description: t('appInterfacePage.features.fast.description'),
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: t('appInterfacePage.features.privacy.title'),
            description: t('appInterfacePage.features.privacy.description'),
        }
    ];

    const designPrinciples = [
        {
            icon: <Eye className="w-8 h-8" />,
            title: t('appInterfacePage.design.userFriendly.title'),
            color: 'from-purple-500 to-pink-500',
            points: t('appInterfacePage.design.userFriendly.points', { returnObjects: true }),
        },
        {
            icon: <Accessibility className="w-8 h-8" />,
            title: t('appInterfacePage.design.accessibilityFirst.title'),
            color: 'from-blue-500 to-cyan-500',
            points: t('appInterfacePage.design.accessibilityFirst.points', { returnObjects: true }),
        },
        {
            icon: <Gauge className="w-8 h-8" />,
            title: t('appInterfacePage.design.fastResponsive.title'),
            color: 'from-green-500 to-emerald-500',
            points: t('appInterfacePage.design.fastResponsive.points', { returnObjects: true }),
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: t('appInterfacePage.design.gradients.title'),
            color: 'from-orange-500 to-red-500',
            points: t('appInterfacePage.design.gradients.points', { returnObjects: true }),
        }
    ];

    const uiComponents = [
        { name: t('appInterfacePage.ui.colorSystem.name'), description: t('appInterfacePage.ui.colorSystem.description') },
        { name: t('appInterfacePage.ui.typography.name'), description: t('appInterfacePage.ui.typography.description') },
        { name: t('appInterfacePage.ui.cards.name'), description: t('appInterfacePage.ui.cards.description') },
        { name: t('appInterfacePage.ui.buttons.name'), description: t('appInterfacePage.ui.buttons.description') },
        { name: t('appInterfacePage.ui.icons.name'), description: t('appInterfacePage.ui.icons.description') },
        { name: t('appInterfacePage.ui.animations.name'), description: t('appInterfacePage.ui.animations.description') },
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
                    <Link
                        to="/"
                        className={`inline-flex items-center gap-2 transition-colors mb-8 ${
                            theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('appInterfacePage.backToHome')}
                    </Link>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <Smartphone className="w-12 h-12 text-purple-400" />
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {t('appInterfacePage.heroTitle')}
                            </h1>
                            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                {t('appInterfacePage.heroSubtitle')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Screens */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('appInterfacePage.keyScreensTitle')}</h2>
                    <p className={`text-center mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {t('appInterfacePage.keyScreensSubtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-6 rounded-2xl border transition-all hover:border-purple-500/50 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${screen.color} flex items-center justify-center text-white mb-4`}>
                                    {screen.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{screen.title}</h3>
                                <p className={`text-sm mb-4 transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>{screen.description}</p>
                                <ul className="space-y-2">
                                    {Array.isArray(screen.features) && screen.features.map((feature, idx) => (
                                        <li key={idx} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                        }`}>
                                            <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Showcase */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]/30' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('appInterfacePage.featuresTitle')}</h2>
                    <p className={`text-center mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {t('appInterfacePage.featuresSubtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className={`p-6 rounded-2xl border transition-all hover:border-purple-500/50 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-200'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className={`text-sm transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Principles */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('appInterfacePage.designTitle')}</h2>
                    <p className={`text-center mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {t('appInterfacePage.designSubtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {designPrinciples.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-8 rounded-2xl border transition-colors duration-300 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-gray-50 border-gray-200'
                                }`}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${principle.color} flex items-center justify-center text-white flex-shrink-0`}>
                                        {principle.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{principle.title}</h3>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {Array.isArray(principle.points) && principle.points.map((point, idx) => (
                                        <li key={idx} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* UI Components */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]/30' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('appInterfacePage.uiTitle')}</h2>
                    <p className={`text-center mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {t('appInterfacePage.uiSubtitle')}
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {uiComponents.map((component, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`p-5 rounded-xl border transition-all hover:border-purple-500/50 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-200'
                                }`}
                            >
                                <h4 className="font-bold mb-1">{component.name}</h4>
                                <p className={`text-sm transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>{component.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('appInterfacePage.techTitle')}</h2>
                    <p className={`mb-8 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {t('appInterfacePage.techSubtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'Google Gemini AI', 'Vite'].map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`px-6 py-3 border rounded-full transition-all hover:border-purple-500/50 ${
                                    theme === 'dark' ? 'bg-[#1a1f2e] border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
                                }`}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-500/20 transition-colors duration-300">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('appInterfacePage.ctaTitle')}</h2>
                        <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                        }`}>
                            {t('appInterfacePage.ctaSubtitle')}
                        </p>
                        <Link
                            to="/scan"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5" />
                            {t('appInterfacePage.ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AppInterface;
