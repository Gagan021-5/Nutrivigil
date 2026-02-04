import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        { id: 'acceptance', title: 'Acceptance of Terms' },
        { id: 'service', title: 'Service Description' },
        { id: 'medical', title: 'Medical Disclaimer' },
        { id: 'responsibilities', title: 'User Responsibilities' },
        { id: 'intellectual', title: 'Intellectual Property' },
        { id: 'liability', title: 'Limitation of Liability' },
        { id: 'account', title: 'Account Terms' },
        { id: 'termination', title: 'Termination' },
        { id: 'changes', title: 'Changes to Terms' },
        { id: 'contact', title: 'Contact Information' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

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
                                <FileText className="w-12 h-12 text-purple-400" />
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Terms of Service
                            </h1>
                            <p className="text-gray-400 text-lg mb-2">
                                Last Updated: February 4, 2026
                            </p>
                            <p className="text-gray-300 max-w-3xl mx-auto">
                                Please read these terms carefully before using NutriVigil
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Table of Contents - Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-8 bg-[#1a1f2e] p-6 rounded-xl border border-gray-800">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-purple-400" />
                                    Table of Contents
                                </h3>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
                                                activeSection === section.id
                                                    ? 'bg-purple-500/20 text-purple-400'
                                                    : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
                                            }`}
                                        >
                                            <span>{section.title}</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Important Notice */}
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-yellow-400 font-bold mb-2">Important Notice</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            By accessing or using NutriVigil, you agree to be bound by these Terms of Service. 
                                            If you do not agree to these terms, please do not use our service.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 1. Acceptance of Terms */}
                            <div id="acceptance" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">1. Acceptance of Terms</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        These Terms of Service ("Terms") govern your access to and use of NutriVigil's website, 
                                        mobile applications, and services (collectively, the "Service"). By accessing or using 
                                        the Service, you agree to comply with and be bound by these Terms.
                                    </p>
                                    <p>
                                        If you are using the Service on behalf of an organization, you represent and warrant 
                                        that you have the authority to bind that organization to these Terms.
                                    </p>
                                </div>
                            </div>

                            {/* 2. Service Description */}
                            <div id="service" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">2. Service Description</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        NutriVigil is an AI-powered nutrition analysis platform that provides:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Food identification and nutritional information extraction from images</li>
                                        <li>Personalized health analysis based on user-provided health conditions</li>
                                        <li>Dietary recommendations and alternatives</li>
                                        <li>Nutritional data visualization and tracking</li>
                                    </ul>
                                    <p>
                                        We reserve the right to modify, suspend, or discontinue any aspect of the Service 
                                        at any time without prior notice.
                                    </p>
                                </div>
                            </div>

                            {/* 3. Medical Disclaimer - CRITICAL */}
                            <div id="medical" className="bg-red-500/10 border-2 border-red-500/30 p-8 rounded-xl scroll-mt-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                                    <h2 className="text-2xl font-bold text-red-400">3. Medical Disclaimer</h2>
                                </div>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p className="font-semibold text-red-300">
                                        IMPORTANT: NutriVigil is NOT a substitute for professional medical advice, diagnosis, or treatment.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>
                                            <strong>Always consult your healthcare provider</strong> before making any changes to your diet, 
                                            especially if you have diabetes, hypertension, heart disease, allergies, or any other medical condition.
                                        </li>
                                        <li>
                                            <strong>AI-generated results are not 100% accurate.</strong> While we use advanced AI technology 
                                            (Google Gemini 2.5), nutritional analysis may contain errors or inaccuracies.
                                        </li>
                                        <li>
                                            <strong>Do not rely solely on NutriVigil</strong> for critical health decisions. Cross-reference 
                                            information with healthcare professionals and official sources.
                                        </li>
                                        <li>
                                            <strong>Food allergies and intolerances:</strong> We cannot guarantee detection of all allergens. 
                                            Always check ingredient labels yourself if you have allergies.
                                        </li>
                                        <li>
                                            <strong>Emergency situations:</strong> If you experience a medical emergency, call your local 
                                            emergency services immediately. Do not use NutriVigil for urgent medical situations.
                                        </li>
                                    </ul>
                                    <p className="font-semibold text-red-300">
                                        By using NutriVigil, you acknowledge that you understand these limitations and accept full 
                                        responsibility for your health decisions.
                                    </p>
                                </div>
                            </div>

                            {/* 4. User Responsibilities */}
                            <div id="responsibilities" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">4. User Responsibilities</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>As a user of NutriVigil, you agree to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Provide accurate health information when creating your profile</li>
                                        <li>Use the Service only for lawful purposes</li>
                                        <li>Not attempt to reverse engineer, hack, or compromise the Service</li>
                                        <li>Not upload inappropriate, offensive, or harmful content</li>
                                        <li>Not violate any applicable laws or regulations</li>
                                        <li>Maintain the confidentiality of your account credentials</li>
                                        <li>Not share your account with others</li>
                                        <li>Not use the Service to harm or harass others</li>
                                    </ul>
                                    <p>
                                        Violation of these responsibilities may result in suspension or termination of your account.
                                    </p>
                                </div>
                            </div>

                            {/* 5. Intellectual Property */}
                            <div id="intellectual" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">5. Intellectual Property</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        <strong>Our Content:</strong> All content, features, and functionality of the Service, 
                                        including but not limited to text, graphics, logos, icons, images, audio clips, video clips, 
                                        data compilations, and software, are the exclusive property of NutriVigil and are protected 
                                        by copyright, trademark, and other intellectual property laws.
                                    </p>
                                    <p>
                                        <strong>Your Content:</strong> You retain ownership of any images or data you upload to the Service. 
                                        By uploading content, you grant NutriVigil a non-exclusive, worldwide, royalty-free license to use, 
                                        store, and process your content solely for the purpose of providing the Service.
                                    </p>
                                    <p>
                                        <strong>Third-Party Content:</strong> Nutritional data may be sourced from third-party databases 
                                        and APIs. We do not claim ownership of third-party data.
                                    </p>
                                </div>
                            </div>

                            {/* 6. Limitation of Liability */}
                            <div id="liability" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">6. Limitation of Liability</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p className="font-semibold">
                                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, NUTRIVIGIL SHALL NOT BE LIABLE FOR:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Any health-related damages resulting from use of the Service</li>
                                        <li>Errors or inaccuracies in nutritional data or AI analysis</li>
                                        <li>Allergic reactions, adverse health effects, or medical complications</li>
                                        <li>Loss of data, interruption of service, or technical failures</li>
                                        <li>Indirect, incidental, special, consequential, or punitive damages</li>
                                        <li>Any damages arising from reliance on information provided by the Service</li>
                                    </ul>
                                    <p>
                                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                                        WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                                        FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                                    </p>
                                    <p>
                                        Some jurisdictions do not allow the exclusion of certain warranties or limitation of 
                                        liability, so some of the above limitations may not apply to you.
                                    </p>
                                </div>
                            </div>

                            {/* 7. Account Terms */}
                            <div id="account" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">7. Account Terms</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        <strong>Account Creation:</strong> You may need to create an account to access certain 
                                        features. You must be at least 13 years old to create an account.
                                    </p>
                                    <p>
                                        <strong>Account Security:</strong> You are responsible for maintaining the security of 
                                        your account and password. NutriVigil cannot and will not be liable for any loss or damage 
                                        from your failure to maintain security.
                                    </p>
                                    <p>
                                        <strong>Account Suspension:</strong> We reserve the right to suspend or terminate accounts 
                                        that violate these Terms or engage in fraudulent, abusive, or illegal activity.
                                    </p>
                                </div>
                            </div>

                            {/* 8. Termination */}
                            <div id="termination" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">8. Termination</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        <strong>By You:</strong> You may delete your account at any time through your account settings.
                                    </p>
                                    <p>
                                        <strong>By Us:</strong> We reserve the right to suspend or terminate your access to the Service 
                                        at any time, with or without cause, with or without notice, for any reason including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Violation of these Terms</li>
                                        <li>Fraudulent, abusive, or illegal activity</li>
                                        <li>Extended periods of inactivity</li>
                                        <li>Requests by law enforcement or government agencies</li>
                                    </ul>
                                    <p>
                                        Upon termination, your right to use the Service will immediately cease, and we may delete 
                                        your account and associated data.
                                    </p>
                                </div>
                            </div>

                            {/* 9. Changes to Terms */}
                            <div id="changes" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">9. Changes to Terms</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        We reserve the right to modify these Terms at any time. We will notify users of material 
                                        changes by:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Updating the "Last Updated" date at the top of this page</li>
                                        <li>Sending an email notification to registered users</li>
                                        <li>Displaying a prominent notice on the Service</li>
                                    </ul>
                                    <p>
                                        Your continued use of the Service after changes to the Terms constitutes your acceptance 
                                        of the revised Terms. If you do not agree to the changes, you must stop using the Service.
                                    </p>
                                </div>
                            </div>

                            {/* 10. Contact Information */}
                            <div id="contact" className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 scroll-mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">10. Contact Information</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        If you have questions, concerns, or complaints about these Terms of Service, please contact us:
                                    </p>
                                    <div className="bg-[#0a0e1a] p-6 rounded-lg border border-gray-700">
                                        <p><strong>Email:</strong> legal@nutrivigil.com</p>
                                        <p><strong>Support:</strong> support@nutrivigil.com</p>
                                        <p><strong>Website:</strong> www.nutrivigil.com</p>
                                    </div>
                                </div>
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
                    </div>
                </div>
            </section>
        </div>
    );
};

export const Terms = TermsOfService;
export default TermsOfService;
