import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Scale,
  Cookie,
  ArrowRight,
  Globe,
  ChevronUp,
  Github,
  Youtube
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  // ✅ Footer navigation data (translated using keys)
  const footerLinks = {
    product: [
      { name: 'AI Scanner', key: 'aiScanner', icon: Scan , href: '/scanner'},
      { name: 'Nutrition Intelligence', key: 'nutritionDecoded', icon: Heart , href: '/nutrition'},
      { name: 'Safety Signals', key: 'safetySignals', icon: Shield , href: '/safety-signals'},
      { name: 'Health Profile', key: 'healthProfile', icon: User , href: '/health-profile'},
    ],
    company: [
      { name: 'About Us', key: 'aboutUs', icon: Info , href: '/about'},
      { name: 'Our Mission', key: 'ourMission', icon: Target , href: '/mission'},
      { name: 'Careers', key: 'careers', icon: Briefcase , href: '/careers'},
      { name: 'Contact', key: 'contact', icon: MessageCircle , href: '/contact'},
    ],
    legal: [
      { name: 'Privacy Policy', icon: ShieldCheck , href: '/privacy-policy'},
      { name: 'Terms of Service', icon: Scale , href: '/terms'},
      { name: 'Cookie Policy', icon: Cookie , href: '/cookies'},
      { name: 'FAQ', icon: Info , href: '/faq'},
    ]
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter, color: "hover:text-sky-400" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin, color: "hover:text-blue-400" },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram, color: "hover:text-pink-400" },
    { name: "GitHub", href: "https://github.com", icon: Github, color: "hover:text-purple-400" },
    { name: "YouTube", href: "https://youtube.com", icon: Youtube, color: "hover:text-red-400" }
  ];

  const handleSubscribe = () => {
    const error = validateEmail(email);

    if (error) {
      setEmailError(error);
      return;
    }

    setIsSubscribed(true);

    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
      setEmailError("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return t("footer.newsletter.errors.required");
    if (!emailRegex.test(value)) return t("footer.newsletter.errors.invalid");
    return "";
  };

  return (
    <footer className={`relative overflow-hidden border-t ${theme === 'dark' ? 'bg-gradient-to-b from-[#05050A] via-[#0A0A14] to-black text-gray-300 border-white/5' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      {/* Subtle gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#1e1e2e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]' : 'bg-[linear-gradient(to_right,#e9e9ee_1px,transparent_1px),linear-gradient(to_bottom,#e9e9ee_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30'}`} />

        <motion.div
          className={`${theme === 'dark' ? 'absolute top-4 left-4 w-48 h-48 bg-indigo-600/8 rounded-full blur-[80px]' : 'absolute top-4 left-4 w-40 h-40 bg-indigo-200/6 rounded-full blur-[40px] opacity-60'}`}
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${theme === 'dark' ? 'absolute bottom-4 right-4 w-48 h-48 bg-purple-600/8 rounded-full blur-[80px]' : 'absolute bottom-4 right-4 w-40 h-40 bg-purple-200/6 rounded-full blur-[40px] opacity-60'}`}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.35, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${theme === 'dark' ? 'absolute left-1/2 -translate-x-1/2 bottom-8 w-72 h-72 bg-cyan-600/6 rounded-full blur-[120px]' : 'absolute left-1/2 -translate-x-1/2 bottom-6 w-56 h-56 bg-cyan-200/6 rounded-full blur-[60px] opacity-50'}`}
          animate={{ scale: [1, 1.18, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        aria-label={t("footer.scrollTop")}
        className={`absolute top-8 right-8 z-20 p-3 rounded-full transition-all duration-300 group ${theme === 'dark' ? 'bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40' : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'}`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className={`${theme === 'dark' ? 'w-5 h-5 text-indigo-400 group-hover:text-indigo-300' : 'w-5 h-5 text-gray-600 group-hover:text-gray-800'}`} />
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
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

              <p className={`${theme === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-gray-600'} leading-relaxed max-w-sm`}>
                {t("footer.brandDesc")}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-xs font-medium text-indigo-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{t("footer.badges.gemini")}</span>
                </motion.div>

                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 text-xs font-medium text-emerald-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>{t("footer.badges.secure")}</span>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className={`text-xs uppercase tracking-wider mb-3 font-semibold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {t("footer.connect")}
              </p>

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
                      className={`${theme === 'dark' ? 'p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-current/20' : 'p-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 hover:border-gray-300 hover:shadow-sm'} ${social.color} transition-all duration-300`}
                      whileHover={{ y: -5, scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
              {t("footer.sections.product")}
            </h3>

            <ul className="space-y-2.5">
              {footerLinks.product.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={item.href} 
                      className={`group flex items-center gap-3 text-sm transition-colors duration-200 ${theme === 'dark' ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {t(`footer.links.product.${item.key}`)}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
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
            <h3 className={`font-bold mb-5 text-sm uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              {t("footer.sections.company")}
            </h3>

            <ul className="space-y-2.5">
              {footerLinks.company.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={item.href} 
                      className={`group flex items-center gap-3 text-sm transition-colors duration-200 ${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {t(`footer.links.company.${item.key}`)}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            className={`lg:col-span-4 rounded-2xl p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20' : 'bg-white border border-gray-200 shadow-sm'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className={`font-bold mb-3 text-base uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              {t("footer.sections.newsletter")}
            </h3>

            <p className={`${theme === 'dark' ? 'text-sm text-gray-300' : 'text-sm text-gray-600'} mb-4 leading-relaxed`}>
              {t("footer.newsletter.desc")}
            </p>

            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    setEmailError(validateEmail(value));
                  }}
                  placeholder={t("footer.newsletter.placeholder")}
                  className={`w-full rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:bg-white/10' : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'}`}
                />
              </div>

              {emailError && (
                <motion.p
                  className="text-xs text-red-400 mt-1 ml-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {emailError}
                </motion.p>
              )}

              <motion.button
                onClick={handleSubscribe}
                disabled={!!emailError || !email}
                className={`w-full px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg ${emailError || !email ? 'bg-gray-600 cursor-not-allowed' : (theme === 'dark' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/50' : 'bg-blue-600 text-white hover:bg-blue-700')}`}
                whileHover={!emailError && email ? { scale: 1.03, y: -2 } : {}}
                whileTap={!emailError && email ? { scale: 0.97 } : {}}
              >
                {isSubscribed ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    {t("footer.newsletter.subscribed")}
                  </>
                ) : (
                  <>
                    {t("footer.newsletter.subscribe")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>

            <div className={`mt-4 flex items-center gap-4 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{t("footer.newsletter.trust.noSpam")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{t("footer.newsletter.trust.unsubscribe")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal Links */}
        <motion.div
          className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'} pt-6 mb-6`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {footerLinks.legal.map((item, index) => {
              return (
                <React.Fragment key={item.name}>
                  <Link
                    to={item.href}
                    className={`text-sm transition-colors duration-200 ${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'}`}
                  >
                    {item.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-gray-500 mx-2">•</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className={`pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center gap-3`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={`flex flex-col md:flex-row gap-3 items-center text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            <p className="flex items-center gap-2">
              © {currentYear} NutriVigil. {t("footer.bottom.rights")}
            </p>

            <div className={`${theme === 'dark' ? 'hidden md:block w-1 h-1 rounded-full bg-gray-700' : 'hidden md:block w-1 h-1 rounded-full bg-gray-300'}`} />

            <p className="flex items-center gap-2">
              <Heart className="w-3 h-3 fill-red-500 text-red-500" />
              {t("footer.bottom.builtWithCare")}
            </p>
          </div>

          <motion.button
            className={`flex items-center gap-2 text-xs transition-colors px-3 py-2 rounded-lg ${theme === 'dark' ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-3 h-3" />
            <span>{t("footer.bottom.language")}</span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
