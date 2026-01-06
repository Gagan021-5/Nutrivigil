import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const VoiceQuery = ({ onTranscriptChange }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Detect unsupported browsers
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    // Support English and Indian languages via lang setting
    const langMap = { en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN' };
    recognition.lang = langMap[i18n.language] || 'en-US';
    
    recognition.interimResults = true; // Live transcription
    recognition.continuous = false;    // Auto-stop on silence

    recognition.onresult = (event) => {
      const current = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscript(current);
      if (onTranscriptChange) onTranscriptChange(current);
    };

    recognition.onend = () => setIsListening(false);
    
    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
    };
  }, [i18n.language, onTranscriptChange]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="relative">
        {/*Live transcript display & manual editing */}
        <textarea
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            onTranscriptChange(e.target.value);
          }}
          placeholder={isSupported ? "Ask: 'Is this high in sodium?'" : "Voice recognition not supported"}
          className={`w-full p-4 pr-12 rounded-2xl text-sm border focus:ring-2 outline-none transition-all h-24 ${
            theme === 'dark' 
            ? "bg-black/40 border-white/10 text-white focus:ring-purple-500/50" 
            : "bg-white border-gray-200 text-gray-900 focus:ring-blue-500/50"
          }`}
          disabled={!isSupported}
        />
        
        <button
          onClick={toggleListening}
          disabled={!isSupported}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          className={`absolute right-3 top-3 p-2 rounded-xl transition-all ${
            isListening 
            ? "bg-red-500 text-white animate-pulse shadow-lg" 
            : theme === 'dark' ? "bg-white/10 text-gray-400 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          } disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>

      {/* Fallback message */}
      {!isSupported && (
        <div className="flex items-center gap-2 mt-2 text-xs text-amber-500 font-medium">
          <AlertCircle size={14} />
          <span>Speech Recognition is not available in your browser. Please type manually.</span>
        </div>
      )}

      <AnimatePresence>
        {isListening && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="text-[10px] mt-2 text-blue-400 font-medium italic animate-pulse"
          >
            Listening... Speak clearly.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceQuery;