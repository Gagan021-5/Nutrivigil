import React from 'react';
import { motion } from 'framer-motion';
import { Scan, QrCode, Barcode, Camera, Zap, Shield } from 'lucide-react';

const Scanner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950 dark:via-slate-900 dark:to-violet-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <Scan size={16} className="animate-pulse" />
            <span>AI Scanner</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">Scanner</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Advanced AI-powered scanning technology that identifies food products instantly with 99.2% accuracy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { icon: Camera, title: 'Image Recognition', desc: 'Scan any food label with your camera' },
            { icon: Barcode, title: 'Barcode Scanner', desc: 'Quick lookup via barcode scanning' },
            { icon: QrCode, title: 'QR Code Support', desc: 'Scan QR codes for instant info' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Results in under 2 seconds' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-center text-white"
        >
          <div className="relative z-10">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Privacy Protected Scanning</h2>
            <p className="text-lg opacity-90 mb-6">All scanning happens on your device. No images are ever uploaded or stored.</p>
            <button className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
              Try Scanner Now
            </button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Scanner;
