import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Heart, Users, Globe, Code, Brain, Palette, TrendingUp, Coffee, Home, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Careers = () => {
    const openPositions = [
        {
            title: "Senior AI/ML Engineer",
            department: "Engineering",
            location: "Remote / Hybrid",
            type: "Full-time",
            icon: <Brain className="w-6 h-6" />,
            description: "Build and optimize AI models for food recognition and nutritional analysis using Gemini AI."
        },
        {
            title: "Product Designer",
            department: "Design",
            location: "Remote",
            type: "Full-time",
            icon: <Palette className="w-6 h-6" />,
            description: "Create intuitive, beautiful interfaces that help users make healthier food choices."
        },
        {
            title: "Full-Stack Developer",
            department: "Engineering",
            location: "Remote / Hybrid",
            type: "Full-time",
            icon: <Code className="w-6 h-6" />,
            description: "Develop scalable backend services and responsive frontend experiences."
        },
        {
            title: "Health Data Scientist",
            department: "Data Science",
            location: "Remote",
            type: "Full-time",
            icon: <TrendingUp className="w-6 h-6" />,
            description: "Analyze nutrition data and health patterns to improve recommendation algorithms."
        }
    ];

    const benefits = [
        {
            icon: <Home className="w-6 h-6" />,
            title: "Remote-First",
            description: "Work from anywhere in the world with flexible hours"
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Health & Wellness",
            description: "Comprehensive health insurance and wellness programs"
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Growth Opportunities",
            description: "Learning budget and career development programs"
        },
        {
            icon: <Coffee className="w-6 h-6" />,
            title: "Work-Life Balance",
            description: "Generous PTO, mental health days, and flexible schedules"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Collaborative Culture",
            description: "Inclusive team with quarterly offsites and team events"
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Competitive Compensation",
            description: "Top-tier salary, equity options, and performance bonuses"
        }
    ];

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Health First",
            description: "We're passionate about improving people's health through technology"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Diverse & Inclusive",
            description: "Building a team that represents the world we serve"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Move Fast",
            description: "Ship quickly, iterate often, and learn from every launch"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Global Impact",
            description: "Reaching millions of users across 20+ countries"
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
                                Careers at NutriVigil
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Join our mission to revolutionize nutrition and health technology. 
                                Build products that impact millions of lives worldwide.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Join NutriVigil?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1a1f2e] p-6 rounded-xl border border-gray-800 text-center hover:border-purple-500 transition-all"
                            >
                                <div className="text-purple-400 mb-4 flex justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-400">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Open Positions</h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        We're looking for talented individuals who are passionate about health tech and AI.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#0a0e1a] p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-purple-400 mt-1 group-hover:scale-110 transition-transform">
                                        {position.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                            {position.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                                {position.department}
                                            </span>
                                            <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                                                {position.location}
                                            </span>
                                            <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
                                                {position.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {position.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Benefits & Perks</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="bg-[#1a1f2e] p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all"
                            >
                                <div className="text-purple-400 mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                                <p className="text-sm text-gray-400">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 sm:p-12 border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Our Culture</h2>
                        <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                At NutriVigil, we believe in building more than just software—we're building a culture of innovation, 
                                collaboration, and impact. Our team is <span className="text-purple-400 font-semibold">diverse, curious, and driven</span> by 
                                the mission to improve global health through technology.
                            </p>
                            <p>
                                We embrace <span className="text-pink-400 font-semibold">remote-first work</span>, trust our team members to do their 
                                best work wherever they are, and foster an environment where everyone's voice is heard and valued.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Don't see a role that fits? We're always looking for exceptional talent. 
                        Send us your resume and let's talk!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="mailto:careers@nutrivigil.com" 
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 focus-visible:ring-offset-[#0a0e1a]"
                        >
                            <Rocket className="w-5 h-5" />
                            Apply Now
                        </a>
                        <Link 
                            to="/about" 
                            className="inline-flex items-center justify-center gap-2 bg-[#1a1f2e] hover:bg-[#252a3a] text-white font-semibold px-8 py-4 rounded-lg border border-gray-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 focus-visible:ring-offset-[#0a0e1a]"
                        >
                            Learn About Our Team
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;