import React, { useState } from "react";
import { motion } from "framer-motion";
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

const Footer = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  // ✅ Footer navigation data (translated using keys)
  const footerLinks = {
    product: [
      { key: "aiScanner", icon: Scan, href: "#" },
      { key: "nutritionDecoded", icon: Heart, href: "#" },
      { key: "safetySignals", icon: Shield, href: "#" },
      { key: "healthProfile", icon: User, href: "#" }
    ],
    company: [
      { key: "aboutUs", icon: Info, href: "#" },
      { key: "ourMission", icon: Target, href: "#" },
      { key: "careers", icon: Briefcase, href: "#" },
      { key: "contact", icon: MessageCircle, href: "#" }
    ],
    legal: [
      { key: "privacyPolicy", icon: ShieldCheck, href: "#" },
      { key: "termsOfService", icon: Scale, href: "#" },
      { key: "cookiePolicy", icon: Cookie, href: "#" }
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
    <footer className="relative bg-gradient-to-b from-[#05050A] via-[#0A0A14] to-black text-gray-300 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e2e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        aria-label={t("footer.scrollTop")}
        className="absolute top-8 right-8 z-20 p-3 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 transition-all duration-300 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 z-10">
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
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
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
              {t("footer.sections.product")}
            </h3>

            <ul className="space-y-3">
              {footerLinks.product.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li key={item.key} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {t(`footer.links.product.${item.key}`)}
                      </span>
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
              {t("footer.sections.company")}
            </h3>

            <ul className="space-y-3">
              {footerLinks.company.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li key={item.key} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {t(`footer.links.company.${item.key}`)}
                      </span>
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
              {t("footer.sections.newsletter")}
            </h3>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all hover:bg-white/10"
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
                className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group
                  ${
                    emailError || !email
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                  }
                `}
                whileHover={!emailError ? { scale: 1.02 } : {}}
                whileTap={!emailError ? { scale: 0.98 } : {}}
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

            <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
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
                  key={item.key}
                  href={item.href}
                  className="group flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {t(`footer.links.legal.${item.key}`)}
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
              © {currentYear} NutriVigil. {t("footer.bottom.rights")}
            </p>

            <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700" />

            <p className="flex items-center gap-2">
              <Heart className="w-3 h-3 fill-red-500 text-red-500" />
              {t("footer.bottom.builtWithCare")}
            </p>
          </div>

          <motion.button
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-3 h-3" />
            <span>{t("footer.bottom.language")}</span>
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
            {t("footer.extra")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
