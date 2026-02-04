import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Shield, BarChart3, Settings, Globe, CheckCircle, XCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
    const cookieTypes = [
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Essential Cookies",
            color: "from-green-500 to-emerald-500",
            required: true,
            description: "Necessary for the website to function properly. These cannot be disabled.",
            examples: [
                "Authentication and login sessions",
                "Security and fraud prevention",
                "Load balancing and performance",
                "User preferences and settings"
            ]
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Analytics Cookies",
            color: "from-blue-500 to-cyan-500",
            required: false,
            description: "Help us understand how visitors use our website to improve user experience.",
            examples: [
                "Page views and navigation patterns",
                "Time spent on pages",
                "Device and browser information",
                "Error tracking and performance metrics"
            ]
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: "Preference Cookies",
            color: "from-purple-500 to-pink-500",
            required: false,
            description: "Remember your choices and personalize your experience.",
            examples: [
                "Language preferences",
                "Theme settings (dark/light mode)",
                "Food diary preferences",
                "Health condition selections"
            ]
        }
    ];

    const thirdPartyCookies = [
        {
            name: "Google Analytics",
            purpose: "Website traffic analysis and user behavior tracking",
            moreInfo: "https://policies.google.com/technologies/cookies"
        },
        {
            name: "Google Gemini AI",
            purpose: "AI-powered food recognition and analysis",
            moreInfo: "https://policies.google.com/privacy"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Hero Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
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
                                <Cookie className="w-12 h-12 text-purple-400" />
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Cookie Policy
                            </h1>
                            <p className="text-gray-400 text-lg mb-2">
                                Last Updated: February 4, 2026
                            </p>
                            <p className="text-gray-300 max-w-3xl mx-auto">
                                Learn how NutriVigil uses cookies to improve your experience
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-12">
                    
                    {/* What Are Cookies */}
                    <div className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800">
                        <div className="flex items-start gap-4 mb-6">
                            <Info className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">What Are Cookies?</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) 
                                        when you visit a website. They help websites remember your preferences, improve functionality, 
                                        and provide a better user experience.
                                    </p>
                                    <p>
                                        Cookies can be "session cookies" (temporary, deleted when you close your browser) or 
                                        "persistent cookies" (remain on your device for a set period or until manually deleted).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Types of Cookies We Use */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Cookies We Use</h2>
                        <div className="space-y-6">
                            {cookieTypes.map((cookie, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-[#1a1f2e] p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all"
                                >
                                    <div className="flex items-start gap-6">
                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cookie.color} flex items-center justify-center text-white flex-shrink-0`}>
                                            {cookie.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-xl font-bold">{cookie.title}</h3>
                                                {cookie.required ? (
                                                    <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Required
                                                    </span>
                                                ) : (
                                                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" />
                                                        Optional
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <p className="text-gray-400 mb-4">{cookie.description}</p>
                                            
                                            <div className="bg-[#0a0e1a] p-4 rounded-lg border border-gray-700">
                                                <p className="text-sm font-semibold text-gray-300 mb-2">Examples:</p>
                                                <ul className="space-y-2">
                                                    {cookie.examples.map((example, idx) => (
                                                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                            <span className="text-purple-400 mt-1">•</span>
                                                            <span>{example}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Third-Party Cookies */}
                    <div className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800">
                        <div className="flex items-start gap-4 mb-6">
                            <Globe className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">Third-Party Cookies</h2>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    We use some third-party services that may place cookies on your device. 
                                    These services help us provide better functionality and analyze usage patterns.
                                </p>
                                
                                <div className="space-y-4">
                                    {thirdPartyCookies.map((service, index) => (
                                        <div key={index} className="bg-[#0a0e1a] p-5 rounded-lg border border-gray-700">
                                            <h3 className="font-bold text-white mb-2">{service.name}</h3>
                                            <p className="text-sm text-gray-400 mb-3">{service.purpose}</p>
                                            <a 
                                                href={service.moreInfo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1"
                                            >
                                                Learn more about their privacy policy
                                                <ArrowLeft className="w-3 h-3 rotate-180" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Control Cookies */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/20">
                        <div className="flex items-start gap-4">
                            <Settings className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">How to Control Cookies</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        You have the right to decide whether to accept or reject cookies. You can control and 
                                        manage cookies in several ways:
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-400 font-bold text-sm">1</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">Browser Settings</h3>
                                                <p className="text-sm text-gray-400">
                                                    Most browsers allow you to refuse cookies or delete specific cookies through 
                                                    their settings menu. Check your browser's help section for instructions.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-400 font-bold text-sm">2</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">Cookie Preferences</h3>
                                                <p className="text-sm text-gray-400">
                                                    You can manage your cookie preferences in your NutriVigil account settings. 
                                                    Essential cookies cannot be disabled as they're necessary for the site to function.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-purple-400 font-bold text-sm">3</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white mb-1">Third-Party Opt-Out</h3>
                                                <p className="text-sm text-gray-400">
                                                    For third-party cookies (like Google Analytics), you can opt out through 
                                                    their respective privacy settings or use browser extensions like Privacy Badger.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-6">
                                        <p className="text-sm text-yellow-200">
                                            <strong>Note:</strong> Disabling certain cookies may affect the functionality 
                                            of NutriVigil and limit your ability to use some features.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Updates to Policy */}
                    <div className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Updates to This Policy</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                We may update this Cookie Policy from time to time to reflect changes in our practices 
                                or for legal, regulatory, or operational reasons.
                            </p>
                            <p>
                                When we make changes, we will update the "Last Updated" date at the top of this page 
                                and notify users through email or a prominent notice on our website.
                            </p>
                            <p>
                                We encourage you to review this Cookie Policy periodically to stay informed about 
                                how we use cookies.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Questions About Cookies?</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            If you have questions about our use of cookies or this Cookie Policy, please contact us:
                        </p>
                        <div className="bg-[#0a0e1a] p-6 rounded-lg border border-gray-700">
                            <div className="space-y-2 text-gray-300">
                                <p><strong>Email:</strong> privacy@nutrivigil.com</p>
                                <p><strong>Support:</strong> support@nutrivigil.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="flex flex-wrap gap-4 justify-center pt-6">
                        <Link 
                            to="/privacy-policy"
                            className="px-6 py-3 bg-[#1a1f2e] hover:bg-[#252a3a] border border-gray-700 rounded-lg transition-all flex items-center gap-2"
                        >
                            <Shield className="w-4 h-4" />
                            Privacy Policy
                        </Link>
                        <Link 
                            to="/terms"
                            className="px-6 py-3 bg-[#1a1f2e] hover:bg-[#252a3a] border border-gray-700 rounded-lg transition-all flex items-center gap-2"
                        >
                            <Info className="w-4 h-4" />
                            Terms of Service
                        </Link>
                    </div>

                    {/* Back to Top */}
                    <div className="text-center pt-8">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2"
                        >
                            Back to Top
                            <ArrowLeft className="w-4 h-4 rotate-90" />
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default CookiePolicy;
