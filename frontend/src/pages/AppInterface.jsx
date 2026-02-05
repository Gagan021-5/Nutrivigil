import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Layout, Palette, Zap, Eye, Moon, Sun, Accessibility, Gauge, Shield, Heart, Camera, BarChart3, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AppInterface = () => {
    const keyScreens = [
        {
            title: 'Smart Scanner',
            icon: <Camera className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            description: 'Upload or capture food images with AI-powered recognition',
            features: ['Instant capture', 'Image upload', 'Batch scanning', 'Camera integration']
        },
        {
            title: 'Analysis Results',
            icon: <BarChart3 className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500',
            description: 'Comprehensive nutrition breakdown with safety signals',
            features: ['Traffic light system', 'Nutrient details', 'Health alerts', 'Portion guidance']
        },
        {
            title: 'Health Profile',
            icon: <User className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            description: 'Personalized settings for your health conditions',
            features: ['Condition selection', 'Dietary preferences', 'Allergy tracking', 'Goal setting']
        },
        {
            title: 'Food Diary',
            icon: <Heart className="w-8 h-8" />,
            color: 'from-red-500 to-pink-500',
            description: 'Track your daily food intake and nutrition history',
            features: ['Daily logs', 'Meal tracking', 'Nutrition trends', 'Export data']
        }
    ];

    const features = [
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Mobile-First Design',
            description: 'Optimized for smartphones with touch-friendly interactions and responsive layouts'
        },
        {
            icon: <Layout className="w-6 h-6" />,
            title: 'Responsive Layout',
            description: 'Seamlessly adapts from mobile to tablet to desktop for consistent experience'
        },
        {
            icon: <Moon className="w-6 h-6" />,
            title: 'Dark Mode Support',
            description: 'Built-in dark theme reduces eye strain and saves battery on mobile devices'
        },
        {
            icon: <Accessibility className="w-6 h-6" />,
            title: 'Accessibility First',
            description: 'WCAG compliant with keyboard navigation, screen reader support, and high contrast'
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Fast & Responsive',
            description: 'Lightning-fast performance with optimized loading and smooth animations'
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Privacy Focused',
            description: 'Your data stays secure with encryption and no permanent image storage'
        }
    ];

    const designPrinciples = [
        {
            icon: <Eye className="w-8 h-8" />,
            title: 'User-Friendly',
            color: 'from-purple-500 to-pink-500',
            points: [
                'Intuitive navigation with clear visual hierarchy',
                'Simple, jargon-free language',
                'One-tap actions for common tasks',
                'Helpful tooltips and onboarding'
            ]
        },
        {
            icon: <Accessibility className="w-8 h-8" />,
            title: 'Accessibility-First',
            color: 'from-blue-500 to-cyan-500',
            points: [
                'WCAG 2.1 AA compliance',
                'Screen reader optimized',
                'Keyboard navigation support',
                'High contrast color ratios'
            ]
        },
        {
            icon: <Gauge className="w-8 h-8" />,
            title: 'Fast & Responsive',
            color: 'from-green-500 to-emerald-500',
            points: [
                'Sub-second page loads',
                'Optimized images and assets',
                'Progressive web app capabilities',
                'Smooth 60fps animations'
            ]
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: 'Beautiful Gradients',
            color: 'from-orange-500 to-red-500',
            points: [
                'Modern gradient color schemes',
                'Consistent design system',
                'Glassmorphism effects',
                'Smooth color transitions'
            ]
        }
    ];

    const uiComponents = [
        { name: 'Color System', description: 'Purple, pink, blue gradient palette' },
        { name: 'Typography', description: 'Clear, readable font hierarchy' },
        { name: 'Cards', description: 'Rounded corners with subtle shadows' },
        { name: 'Buttons', description: 'Gradient backgrounds with hover effects' },
        { name: 'Icons', description: 'Lucide React icon library' },
        { name: 'Animations', description: 'Framer Motion smooth transitions' }
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
                            <div className="inline-flex items-center gap-3 mb-6">
                                <Smartphone className="w-12 h-12 text-purple-400" />
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Beautiful & Intuitive Interface
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Designed for simplicity, built for performance, crafted for health
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Screens */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Key Screens</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Every screen is designed with your health journey in mind
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyScreens.map((screen, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${screen.color} flex items-center justify-center text-white mb-4`}>
                                    {screen.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{screen.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{screen.description}</p>
                                <ul className="space-y-2">
                                    {screen.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-gray-500 flex items-start gap-2">
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Platform Features</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Built with modern technologies for the best user experience
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Principles */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Design Principles</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Our core values that guide every design decision
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {designPrinciples.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800"
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
                                    {principle.points.map((point, idx) => (
                                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
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
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">UI Components</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Consistent design system across the entire platform
                    </p>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {uiComponents.map((component, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-[#1a1f2e] p-5 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all"
                            >
                                <h4 className="font-bold text-white mb-1">{component.name}</h4>
                                <p className="text-sm text-gray-400">{component.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built With Modern Technology</h2>
                    <p className="text-gray-400 mb-8">
                        Powered by cutting-edge frameworks and libraries
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'Google Gemini AI', 'Vite'].map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="px-6 py-3 bg-[#1a1f2e] border border-gray-800 rounded-full text-gray-300 hover:border-purple-500/50 transition-all"
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
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience It Yourself</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Try NutriVigil and discover how beautiful nutrition tracking can be
                        </p>
                        <Link 
                            to="/scanner" 
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5" />
                            Try the App
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AppInterface;
