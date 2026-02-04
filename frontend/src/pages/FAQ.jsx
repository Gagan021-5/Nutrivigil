import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronDown, HelpCircle, Camera, Shield, Heart, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openQuestion, setOpenQuestion] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'general', name: 'General', icon: <HelpCircle className="w-5 h-5" /> },
        { id: 'scanner', name: 'Using the Scanner', icon: <Camera className="w-5 h-5" /> },
        { id: 'health', name: 'Health Conditions', icon: <Heart className="w-5 h-5" /> },
        { id: 'privacy', name: 'Privacy & Security', icon: <Shield className="w-5 h-5" /> },
        { id: 'technical', name: 'Technical', icon: <Smartphone className="w-5 h-5" /> }
    ];

    const faqs = {
        general: [
            {
                question: "What is NutriVigil?",
                answer: "NutriVigil is an AI-powered nutrition analysis platform that helps you understand the nutritional content of your food. Simply upload an image of your meal, and our advanced AI technology will analyze it and provide detailed nutritional information tailored to your health conditions."
            },
            {
                question: "How does NutriVigil work?",
                answer: "NutriVigil uses Google Gemini AI for food recognition and analysis. When you upload a food image, our AI identifies the food items, estimates portions, calculates nutritional values, and provides personalized recommendations based on your health profile. We also integrate with API Ninjas for comprehensive nutritional data."
            },
            {
                question: "Is NutriVigil free to use?",
                answer: "Yes! NutriVigil is completely free and open-source. We believe everyone should have access to quality nutrition information to make healthier food choices."
            },
            {
                question: "Do I need to create an account?",
                answer: "No account is required for basic food analysis. However, creating a profile allows you to save your health conditions, track your food history, and get personalized recommendations."
            }
        ],
        scanner: [
            {
                question: "How do I upload images for analysis?",
                answer: "Click on the 'Scan Food' button on the homepage, then either drag and drop your food image or click to browse your files. You can upload images in JPG, PNG, or WEBP format up to 10MB."
            },
            {
                question: "What types of food can I scan?",
                answer: "You can scan almost any food! Our AI recognizes fruits, vegetables, cooked meals, packaged foods, beverages, snacks, and more. For best results, ensure the food is clearly visible and well-lit in the image."
            },
            {
                question: "How accurate is the nutritional analysis?",
                answer: "Our AI provides highly accurate results, typically within 10-15% of actual values. However, accuracy depends on image quality, lighting, and portion visibility. For critical dietary needs, we recommend consulting with a healthcare professional."
            },
            {
                question: "Can I scan multiple food items at once?",
                answer: "Yes! Our AI can recognize and analyze multiple food items in a single image. It will provide nutritional information for each identified item as well as combined totals."
            },
            {
                question: "What if the AI doesn't recognize my food?",
                answer: "If the AI has trouble identifying your food, try taking a clearer photo with better lighting. You can also try different angles or separating mixed items. Our system is constantly learning and improving!"
            }
        ],
        health: [
            {
                question: "What health conditions are supported?",
                answer: "NutriVigil currently supports analysis for diabetes, hypertension, heart disease, kidney disease, and general wellness. We provide tailored nutritional advice based on your selected conditions."
            },
            {
                question: "Can I track multiple health conditions?",
                answer: "Yes! You can select multiple health conditions in your profile, and our system will provide recommendations that consider all of them together."
            },
            {
                question: "How are recommendations personalized?",
                answer: "Based on your health conditions, our AI adjusts recommendations for sugar, sodium, saturated fat, and other nutrients. For example, users with diabetes receive alerts about high-sugar foods and carbohydrate content."
            },
            {
                question: "Should I follow NutriVigil's advice for medical decisions?",
                answer: "NutriVigil provides educational information and general guidance. While our recommendations are evidence-based, they should not replace professional medical advice. Always consult your healthcare provider for medical decisions."
            }
        ],
        privacy: [
            {
                question: "Is my data safe and secure?",
                answer: "Absolutely! We take your privacy seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and regularly audit our systems for vulnerabilities."
            },
            {
                question: "Do you store my food images?",
                answer: "No, we do not permanently store your uploaded food images. Images are temporarily processed for analysis and then automatically deleted from our servers within 24 hours."
            },
            {
                question: "Who has access to my health information?",
                answer: "Only you have access to your health profile. We never share, sell, or use your personal health data for any purpose other than providing you with personalized nutrition recommendations."
            },
            {
                question: "Can I delete my data?",
                answer: "Yes! You have full control over your data. You can delete your profile and all associated data at any time from your account settings. The deletion is permanent and irreversible."
            }
        ],
        technical: [
            {
                question: "What are the browser requirements?",
                answer: "NutriVigil works best on modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. We recommend keeping your browser updated for the best experience."
            },
            {
                question: "Is there a mobile app available?",
                answer: "Currently, NutriVigil is a web application optimized for both desktop and mobile browsers. A native mobile app is in our roadmap for future development!"
            },
            {
                question: "What image formats are supported?",
                answer: "We support JPG, PNG, and WEBP image formats. Maximum file size is 10MB. For best results, use high-resolution images with good lighting."
            },
            {
                question: "Why is my analysis taking so long?",
                answer: "Analysis typically takes 3-10 seconds. Longer times may occur due to large image sizes, complex meals with many items, or high server load. If it takes more than 30 seconds, try refreshing and uploading again."
            },
            {
                question: "Does NutriVigil work offline?",
                answer: "No, NutriVigil requires an internet connection to process images using our AI servers. However, we're exploring offline capabilities for future versions."
            }
        ]
    };

    // Filter FAQs based on search query
    const getFilteredFAQs = () => {
        if (!searchQuery.trim()) {
            return faqs[activeCategory];
        }

        const query = searchQuery.toLowerCase();
        return faqs[activeCategory].filter(faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        );
    };

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const filteredFAQs = getFilteredFAQs();

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
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                                Find answers to common questions about NutriVigil
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search questions..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-[#1a1f2e] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="sticky top-0 z-10 bg-[#0a0e1a]/95 backdrop-blur-sm border-b border-gray-800 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-scrollbar]:hidden [scrollbar-width:none]">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setOpenQuestion(null);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                                    activeCategory === category.id
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                        : 'bg-[#1a1f2e] text-gray-400 hover:text-white hover:bg-[#252a3a]'
                                }`}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-[#1a1f2e] rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500/50 transition-all"
                                >
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#252a3a] transition-colors"
                                    >
                                        <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${
                                                openQuestion === index ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    
                                    <AnimatePresence>
                                        {openQuestion === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-gray-800 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search query</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Still Have Questions Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 sm:p-12 border border-purple-500/20 text-center">
                        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Can't find the answer you're looking for? Our support team is here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://github.com/Gagan021-5/Nutrivigil/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                            >
                                Contact Support
                            </a>
                            <a 
                                href="https://github.com/Gagan021-5/Nutrivigil/discussions" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1a1f2e] hover:bg-[#252a3a] text-white font-semibold px-8 py-4 rounded-lg border border-gray-700 transition-all"
                            >
                                Community Discussions
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
