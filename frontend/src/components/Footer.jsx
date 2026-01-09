import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Zap,
  Scan,
  Heart,
  Shield,
  User,
  Info,
  Target,
  Briefcase,
  MessageCircle,
  FileText,
  Scale,
  Cookie,
  ArrowRight,
  Globe,
  ChevronUp,
  Github,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  // Footer navigation data with proper links and icons
  const footerLinks = {
    product: [
      { name: 'AI Scanner', icon: Scan , href: '#'},
      { name: 'Nutrition Decoded', icon: Heart , href: '#'},
      { name: 'Safety Signals', icon: Shield , href: '#'},
      { name: 'Health Profile', icon: User , href: '#'},
    ],
    company: [
      { name: 'About Us', icon: Info , href: '#'},
      { name: 'Our Mission', icon: Target , href: '#'},
      { name: 'Careers', icon: Briefcase , href: '#'},
      { name: 'Contact', icon: MessageCircle , href: '#'},
    ],
    legal: [
      { name: 'Privacy Policy', icon: ShieldCheck , href: '#'},
      { name: 'Terms of Service', icon: Scale , href: '#'},
      { name: 'Cookie Policy', icon: Cookie , href: '#'},
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter, color: 'hover:text-sky-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram, color: 'hover:text-pink-400' },
    { name: 'GitHub', href: 'https://github.com', icon: Github, color: 'hover:text-purple-400' },
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube, color: 'hover:text-red-400' },
  ];

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#05050A] via-[#0A0A14] to-black text-gray-300 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e2e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="absolute top-8 right-8 z-20 p-3 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 transition-all duration-300 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 z-10">
        {/* Main Footer Content */}
        <div className="flex flex-nowrap gap-12 mb-16 overflow-x-auto">
          {/* Brand Column */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/30 rounded-xl blur-lg group-hover:bg-indigo-500/50 transition-all" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                </div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  NutriVigil
                </span>
              </motion.div>
              
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Your Personal AI Health Scanner. Instantly analyze meals with cutting-edge Gemini v2.5 AI to keep your nutrition perfectly aligned with your health goals.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2">
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-xs font-medium text-indigo-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Gemini AI</span>
                </motion.div>
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 text-xs font-medium text-emerald-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Secure</span>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Connect With Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div 
            className="lg:col-span-2 lg:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-3 text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-3 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              Stay Healthy
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Join 50,000+ health enthusiasts receiving weekly AI-powered nutrition insights and tips.
            </p>
            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white/10"
                />
              </div>
              <motion.button 
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubscribed ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal Links Section */}
        <motion.div
          className="border-t border-white/5 pt-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-6 justify-center">
            {footerLinks.legal.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center text-xs text-gray-500">
            <p className="flex items-center gap-2">
              © {currentYear} NutriVigil. All rights reserved.
            </p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700" />
            <p className="flex items-center gap-2">
              <Heart className="w-3 h-3 fill-red-500 text-red-500" />
              Built with care for your health
            </p>
          </div>

          {/* Language & Region Selector */}
          <motion.button
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-3 h-3" />
            <span>English (US)</span>
          </motion.button>
        </motion.div>

        {/* Extra Branding */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-xs text-gray-600 leading-relaxed">
            Powered by Gemini 2.5 AI • HIPAA Compliant • SOC 2 Type II Certified • Real-time Analysis • 500K+ Food Database • 99.2% Accuracy • Multi-language Support • Offline Mode • End-to-End Encryption • FDA Guidelines Integration • Personalized Recommendations • Community Verified
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
