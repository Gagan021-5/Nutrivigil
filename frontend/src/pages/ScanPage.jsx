import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Volume2,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import VoiceQuery from "../components/VoiceQuery";
import { LANGUAGE_MAP } from "../utils/languageMap";

const STORAGE_KEY = "nutriguard_v2";

function ScanPage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [conditions, setConditions] = useState([]); 
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [voiceAnswer, setVoiceAnswer] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setConditions(Array.isArray(saved) ? saved : []);
  }, []);

  const getConditionString = () => {
    return conditions.map(c => t(`conditions.${c}`)).join(", ");
  };

  const handleVoiceSubmit = async () => {
    if (!followUpQuestion || !result) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("https://nutb.onrender.com/analyze", {
        condition: getConditionString(),
        query: followUpQuestion,
        foodName: result.food_name
      });

      setVoiceAnswer(res.data);
      setFollowUpQuestion("");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (err) => {
    let errorMessage = t("errors.analysisFailed");
    if (err.response?.status === 429) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    } else if (err.response?.data) {
      const backendError = err.response.data;
      errorMessage = typeof backendError === "string" ? backendError : (backendError.error || backendError.message || errorMessage);
    } else if (err.message) {
      errorMessage = err.message;
    }
    setError(errorMessage);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!selectedFile) return setError(t("errors.noImage"));
    if (conditions.length === 0) return setError(t("errors.noCondition")); 

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("condition", getConditionString()); 
      formData.append("language", LANGUAGE_MAP[i18n.language] || "English");

      const res = await axios.post("https://nutb.onrender.com/analyze", formData);
      setResult(res.data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const TrafficIcon = {
    green: <CheckCircle className="w-8 h-8 text-green-400" />,
    yellow: <AlertCircle className="w-8 h-8 text-yellow-400" />,
    red: <XCircle className="w-8 h-8 text-red-400" />,
  };

  const TrafficTitle = {
    green: t('safety.safe'),
    yellow: t('safety.moderate'),
    red: t('safety.unsafe'),
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-5 relative">
      <div className="absolute inset-0 -z-10 pointer-events-none blur-3xl"></div>

      <motion.div
        className={`w-full max-w-[600px] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-12 transition-colors ${
          theme === 'dark' ? "bg-black/40" : "bg-white/90 border border-gray-200"
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header className="text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h1 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 transition-colors ${
            theme === 'dark' ? "from-purple-500 to-blue-500 drop-shadow-[0_0_20px_rgba(0,150,255,0.5)]" : "from-purple-600 to-blue-600"
          }`}>
            {t("scan.title")}
          </h1>

          <p className={`text-sm mb-4 transition-colors ${theme === 'dark' ? "text-gray-300" : "text-gray-600"}`}>
            {t("scan.subtitle")}
          </p>

          <AnimatePresence mode="wait">
            {conditions.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {conditions.map(c => (
                  <motion.div
                    key={c}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                      theme === 'dark' ? "bg-blue-400/10 text-blue-300 border-blue-400/20" : "bg-blue-100 text-blue-700 border-blue-300"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {t(`conditions.${c}`)}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                key="warning"
                className={`inline-block px-5 py-2 rounded-full text-xs backdrop-blur-xl border transition-colors ${
                  theme === 'dark' ? "bg-yellow-400/10 text-yellow-300 border-yellow-300/20" : "bg-yellow-100 text-yellow-700 border-blue-300"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {t("scan.setCondition")}{" "}
                <Link to="/health-profile" className={`underline font-semibold transition-colors ${theme === 'dark' ? "text-blue-300" : "text-blue-600"}`}>
                  {t("nav.profile")}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Link to="/scanner" className={`w-full flex items-center justify-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all transform active:scale-95 ${
            theme === 'dark' ? "border-purple-500/30 bg-purple-500/5 hover:border-purple-400 hover:bg-purple-500/10 text-purple-300" : "border-purple-300 bg-purple-50 hover:border-purple-400 hover:bg-purple-100 text-purple-700"
          }`}>
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <Camera size={24} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm leading-tight">Try Live AI Scanner</p>
              <p className="text-[10px] opacity-70">Real-time food detection & validation</p>
            </div>
          </Link>
        </motion.div>

        <motion.div className="flex flex-col gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex flex-col gap-2">
            <label className={`font-semibold text-sm transition-colors ${theme === 'dark' ? "text-gray-200" : "text-gray-700"}`}>
              {t("scan.foodPhoto")}
            </label>

            <motion.div
              className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 md:p-10 text-center backdrop-blur-xl cursor-pointer overflow-hidden transition-all ${
                theme === 'dark' ? "border-blue-500/30 bg-blue-500/5 hover:border-cyan-400" : "border-blue-300 bg-blue-50/50 hover:border-blue-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div key="preview" className="flex flex-col items-center gap-3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <img src={preview} className="max-w-full max-h-[250px] rounded-2xl object-contain shadow-xl" />
                    <p className={`text-xs font-medium ${theme === 'dark' ? "text-gray-300" : "text-gray-600"}`}>{selectedFile?.name}</p>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" className="flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Upload className={`w-12 h-12 ${theme === 'dark' ? "text-blue-300" : "text-blue-500"}`} />
                    <p className="text-sm font-medium">{t("scan.uploadHint")} or an ingredient label</p>
                    <p className="text-[10px] opacity-60 mt-1">Clear photos of nutrition facts work best for packaged foods.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.button
            onClick={handleScan}
            disabled={loading || !selectedFile || conditions.length === 0}
            className={`w-full py-4 rounded-2xl text-base font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 ${
              theme === 'dark' ? "bg-gradient-to-r from-purple-800 to-indigo-500" : "bg-gradient-to-r from-purple-600 to-indigo-600"
            }`}
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: !loading ? 0.95 : 1 }}
          >
            {loading ? (
              <><Loader2 className="w-6 h-6 animate-spin" /><span>{t("scan.scanning")}</span></>
            ) : (
              <span>{t("scan.scanButton")}</span>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div className={`mt-6 p-4 border rounded-2xl flex items-center gap-3 ${theme === 'dark' ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-red-50 border-red-200 text-red-700"}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <AlertCircle className="w-5 h-5" /><p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div className={`mt-6 p-7 rounded-2xl shadow-xl backdrop-blur-xl border ${theme === 'dark' ? "bg-blue-500/5 border-blue-400/10" : "bg-blue-50 border-blue-200"}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`flex items-center gap-3 mb-5 pb-4 border-b ${theme === 'dark' ? "border-blue-400/10" : "border-blue-200"}`}>
                {TrafficIcon[result.traffic_light]}
                <h2 className={`text-xl font-bold ${theme === 'dark' ? "text-white" : "text-gray-900"}`}>{TrafficTitle[result.traffic_light]}</h2>
              </div>

              <div className={`flex flex-col gap-4 break-words ${theme === 'dark' ? "text-gray-200" : "text-gray-700"}`}>
                <div><strong className="block mb-1">{t("scan.labels.food")}:</strong>{result.food_name}</div>
                <div className="pt-4 border-t"><strong className="block mb-1">{t("scan.labels.reason")}:</strong>{result.reason}</div>
                {result.suggestion && <div className="pt-4 border-t"><strong className="block mb-1">{t("scan.labels.suggestion")}:</strong>{result.suggestion}</div>}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-s font-bold text-blue-400 uppercase mb-3">{t("scan.labels.askFood")}</h3>
                <VoiceQuery onTranscriptChange={(text) => setFollowUpQuestion(text)} />
                <motion.button
                  onClick={handleVoiceSubmit}
                  disabled={loading || !followUpQuestion}
                  className={`w-full py-4 rounded-2xl text-base font-semibold text-white shadow-lg ${theme === 'dark' ? "bg-gradient-to-r from-purple-800 to-indigo-500" : "bg-gradient-to-r from-purple-600 to-indigo-600"}`}
                >
                  {loading ? <><Loader2 className="w-6 h-6 animate-spin" /><span>{t("scan.thinking")}</span></> : <span>{t("scan.submitQuery")}</span>}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ScanPage;
