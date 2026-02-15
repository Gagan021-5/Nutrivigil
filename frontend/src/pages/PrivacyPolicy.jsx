import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Trash2, 
  ArrowLeft, 
  FileText, 
  ServerOff,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyPolicy = () => {
  const { theme } = useTheme();

  const policySections = [
    {
      id: "local-storage",
      title: "Local Data Storage",
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      summary: "Your data stays on your device.",
      content: "NutriVigil is designed with a 'privacy-first' architecture. Your health profile, dietary preferences, and history are encrypted and stored locally on your device. We do not maintain a central database of your personal health identifiers."
    },
    {
      id: "image-processing",
      title: "Image Processing & AI",
      icon: <EyeOff className="w-6 h-6 text-purple-500" />,
      summary: "Temporary analysis, no permanent storage.",
      content: "Food images are analyzed using Google Gemini AI. These images are transmitted via secure end-to-end encryption, processed for nutritional content, and automatically deleted from processing servers within 24 hours. We do not use your images for model training."
    },
    {
      id: "compliance",
      title: "Security & Compliance",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      summary: "HIPAA and SOC 2 aligned standards.",
      content: "Our system architecture follows HIPAA data privacy standards and SOC 2 Type II security principles. All data in transit is protected by industry-standard TLS encryption."
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: <Trash2 className="w-6 h-6 text-red-500" />,
      summary: "Total control over your data.",
      content: "You have the right to access, export, or delete your data at any time. Since data is stored locally, clearing your browser cache or deleting your profile via the app settings permanently removes all records."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      theme === 'dark' ? 'bg-[#0a0e1a] text-gray-200' : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Policy</span>
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Transparency is the core of NutriVigil. Learn how we handle and protect your personal health data.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Sections */}
          <motion.div 
            className="lg:col-span-8 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {policySections.map((section) => (
              <motion.section 
                key={section.id}
                variants={itemVariants}
                className={`p-8 rounded-3xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:border-indigo-500/50' 
                    : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                    {section.icon}
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                      <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-400 uppercase tracking-wider">
                        {section.summary}
                      </span>
                    </div>
                    <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.section>
            ))}
          </motion.div>

          {/* Quick Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className={`sticky top-8 p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-indigo-900/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'
            }`}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Quick Reference
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <ServerOff className="w-5 h-5 text-indigo-400 shrink-0" />
                  <p className="text-sm italic">No data is sold to third parties or used for targeted advertising.</p>
                </li>
                <li className="flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm italic">Secure end-to-end encryption for all nutrition analysis requests.</p>
                </li>
                <li className="flex gap-4">
                  <UserCheck className="w-5 h-5 text-purple-400 shrink-0" />
                  <p className="text-sm italic">You retain 100% ownership and control over your health profile.</p>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-indigo-500/20">
                <p className="text-xs text-gray-500">
                  Last Updated: February 2026
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;