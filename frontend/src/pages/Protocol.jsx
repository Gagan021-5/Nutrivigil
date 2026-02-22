import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, Heart, Droplet, Shield, Scale, AlertCircle, ChevronDown, CheckCircle, XCircle, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Protocol = () => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [expandedProtocol, setExpandedProtocol] = useState(null);

const protocols = [
    {
        id: 'diabetes',
        icon: <Activity className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        title: t('protocolPage.protocols.diabetes.title'),
        description: t('protocolPage.protocols.diabetes.description'),
        dos: t('protocolPage.protocols.diabetes.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.diabetes.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.diabetes.nutrients', { returnObjects: true }),
    },
    {
        id: 'hypertension',
        icon: <Heart className="w-6 h-6" />,
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        title: t('protocolPage.protocols.hypertension.title'),
        description: t('protocolPage.protocols.hypertension.description'),
        dos: t('protocolPage.protocols.hypertension.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.hypertension.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.hypertension.nutrients', { returnObjects: true }),
    },
    {
        id: 'heart',
        icon: <Heart className="w-6 h-6" />,
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        title: t('protocolPage.protocols.heart.title'),
        description: t('protocolPage.protocols.heart.description'),
        dos: t('protocolPage.protocols.heart.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.heart.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.heart.nutrients', { returnObjects: true }),
    },
    {
        id: 'kidney',
        icon: <Droplet className="w-6 h-6" />,
        color: 'from-teal-500 to-cyan-500',
        bgColor: 'bg-teal-500/10',
        borderColor: 'border-teal-500/30',
        title: t('protocolPage.protocols.kidney.title'),
        description: t('protocolPage.protocols.kidney.description'),
        dos: t('protocolPage.protocols.kidney.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.kidney.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.kidney.nutrients', { returnObjects: true }),
    },
    {
        id: 'obesity',
        icon: <Scale className="w-6 h-6" />,
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        title: t('protocolPage.protocols.obesity.title'),
        description: t('protocolPage.protocols.obesity.description'),
        dos: t('protocolPage.protocols.obesity.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.obesity.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.obesity.nutrients', { returnObjects: true }),
    },
    {
        id: 'allergies',
        icon: <Shield className="w-6 h-6" />,
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        title: t('protocolPage.protocols.allergies.title'),
        description: t('protocolPage.protocols.allergies.description'),
        dos: t('protocolPage.protocols.allergies.dos', { returnObjects: true }),
        donts: t('protocolPage.protocols.allergies.donts', { returnObjects: true }),
        nutrients: t('protocolPage.protocols.allergies.nutrients', { returnObjects: true }),
    },
];

    const toggleProtocol = (id) => {
        setExpandedProtocol(expandedProtocol === id ? null : id);
    };

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
                        {t('protocolPage.backToHome')}
                    </Link>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {t('protocolPage.heroTitle')}
                            </h1>
                            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                {t('protocolPage.heroSubtitle')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Supported Conditions */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('protocolPage.conditionsTitle')}</h2>

                    <div className="space-y-4">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`${protocol.bgColor} border ${protocol.borderColor} rounded-3xl overflow-hidden backdrop-blur-xl transition-all hover:-translate-y-2`}
                            >
                                {/* Protocol Header */}
                                <button
                                    onClick={() => toggleProtocol(protocol.id)}
                                    className="w-full px-6 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${protocol.color} flex items-center justify-center text-white`}>
                                            {protocol.icon}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold">{protocol.title}</h3>
                                            <p className={`text-sm transition-colors duration-300 ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>{protocol.description}</p>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 transition-all duration-300 flex-shrink-0 ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        } ${
                                            expandedProtocol === protocol.id ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Protocol Content */}
                                <AnimatePresence>
                                    {expandedProtocol === protocol.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`px-6 pb-6 space-y-6 border-t transition-colors duration-300 ${
                                                theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
                                            }`}>
                                                {/* Do's and Don'ts */}
                                                <div className="grid md:grid-cols-2 gap-6 pt-6">
                                                    {/* Do's */}
                                                    <div className={`p-5 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${
                                                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-green-50 border-green-200'
                                                    }`}>
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                                            <h4 className="font-bold text-green-400">{t('protocolPage.dosLabel')}</h4>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {Array.isArray(protocol.dos) && protocol.dos.map((item, idx) => (
                                                                <li key={idx} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                                }`}>
                                                                    <span className="text-green-400 mt-1">✓</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Don'ts */}
                                                    <div className={`p-5 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${
                                                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-red-50 border-red-200'
                                                    }`}>
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <XCircle className="w-5 h-5 text-red-400" />
                                                            <h4 className="font-bold text-red-400">{t('protocolPage.dontsLabel')}</h4>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {Array.isArray(protocol.donts) && protocol.donts.map((item, idx) => (
                                                                <li key={idx} className={`text-sm flex items-start gap-2 transition-colors duration-300 ${
                                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                                }`}>
                                                                    <span className="text-red-400 mt-1">✗</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Key Nutrients */}
                                                <div className={`p-5 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${
                                                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-purple-50 border-purple-200'
                                                }`}>
                                                    <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                                                        <AlertCircle className="w-5 h-5" />
                                                        {t('protocolPage.nutrientsLabel')}
                                                    </h4>
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {Array.isArray(protocol.nutrients) && protocol.nutrients.map((nutrient, idx) => (
                                                            <div key={idx} className="text-sm">
                                                                <span className={`font-semibold transition-colors duration-300 ${
                                                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                                }`}>{nutrient.name}:</span>
                                                                <span className={`ml-1 transition-colors duration-300 ${
                                                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                                }`}>{nutrient.note}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Help */}
            <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#1a1f2e]/30' : 'bg-gray-50'
            }`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('protocolPage.howHelpTitle')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`p-6 rounded-3xl border backdrop-blur-xl text-center transition-all hover:-translate-y-2 ${
                                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('protocolPage.help.ai.title')}</h3>
                            <p className={`transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {t('protocolPage.help.ai.desc')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={`p-6 rounded-3xl border backdrop-blur-xl text-center transition-all hover:-translate-y-2 ${
                                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('protocolPage.help.personalized.title')}</h3>
                            <p className={`transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {t('protocolPage.help.personalized.desc')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`p-6 rounded-3xl border backdrop-blur-xl text-center transition-all hover:-translate-y-2 ${
                                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                            }`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('protocolPage.help.safety.title')}</h3>
                            <p className={`transition-colors duration-300 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                                {t('protocolPage.help.safety.desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Medical Disclaimer */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-2xl p-8 transition-colors duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold text-yellow-400 mb-3">{t('protocolPage.disclaimerTitle')}</h3>
                                <div className={`space-y-3 transition-colors duration-300 ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <p>
                                        <strong>{t('protocolPage.disclaimerP1Bold')}</strong>{t('protocolPage.disclaimerP1Rest')}
                                    </p>
                                    <p>
                                        {t('protocolPage.disclaimerP2')}
                                    </p>
                                    <p>
                                        {t('protocolPage.disclaimerP3')}
                                    </p>
                                    <p className="font-semibold text-yellow-400">
                                        {t('protocolPage.disclaimerP4')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-500/20 transition-colors duration-300">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('protocolPage.ctaTitle')}</h2>
                        <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                        }`}>
                            {t('protocolPage.ctaSubtitle')}
                        </p>
                        <Link
                            to="/scan"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5" />
                            {t('protocolPage.ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Protocol;
