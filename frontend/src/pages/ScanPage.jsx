import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import VoiceQuery from "../components/VoiceQuery";

const STORAGE_KEY = "nutriguard";

function ScanPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [voiceAnswer, setVoiceAnswer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCondition(saved);
  }, []);

  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   setSelectedFile(file);
  //   setError(null);
  //   setResult(null);

  //   const reader = new FileReader();
  //   reader.onloadend = () => setPreview(reader.result);
  //   reader.readAsDataURL(file);
  // };
  const handleVoiceSubmit = async () => {
    if (!followUpQuestion || !result) return;

    setLoading(true);
    setError(null);

    try {
      // send a JSON object, not FormData, because there is no NEW image
      const res = await axios.post("https://nutb.onrender.com/analyze", {
        condition: condition,
        query: followUpQuestion,
        foodName: result.food_name  
      });

      // Update the result state with the AI's answer to the voice query
      setVoiceAnswer(res.data);
      setFollowUpQuestion("");  
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Failed to get an answer from the assistant."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ 10MB client-side check
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
    if (!condition) return setError(t("errors.noCondition"));

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("condition", condition);

      const res = await axios.post("https://nutb.onrender.com/analyze", formData);
      
      setResult(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        "Failed to analyze food"
      );

    } finally {
      setLoading(false);
    }
  };

  const TrafficIcon = {
    green: <CheckCircle className="w-8 h-8 text-green-400" />,
    yellow: <AlertCircle className="w-8 h-8 text-yellow-400" />,
    red: <XCircle className="w-8 h-8 text-red-400" />,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-5 relative">
      <div className="absolute inset-0 -z-10 pointer-events-none  blur-3xl"></div>

      <motion.div
        className={`w-full max-w-[600px] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-12
 transition-colors ${theme === 'dark'
            ? "bg-black/40"
            : "bg-white/90 border border-gray-200"
          }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-2 transition-colors ${theme === 'dark'
              ? "from-purple-500 to-blue-500 drop-shadow-[0_0_20px_rgba(0,150,255,0.5)]"
              : "from-purple-600 to-blue-600"
              }`}
          >
            {t("scan.title")}
          </h1>

          <p className={`text-sm mb-4 transition-colors ${theme === 'dark' ? "text-gray-300" : "text-gray-600"
            }`}>
            Upload a photo to analyze nutritional safety
          </p>

          <AnimatePresence mode="wait">
            {condition ? (
              <motion.div
                key="badge"
                className={`inline-block px-5 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border transition-colors ${theme === 'dark'
                  ? "bg-blue-400/10 text-blue-300 border-blue-400/20"
                  : "bg-blue-100 text-blue-700 border-blue-300"
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {t("scan.condition")}: {t(`conditions.${condition}`)}
              </motion.div>
            ) : (
              <motion.div
                key="warning"
                className={`inline-block px-5 py-2 rounded-full text-xs backdrop-blur-xl border transition-colors ${theme === 'dark'
                  ? "bg-yellow-400/10 text-yellow-300 border-yellow-300/20"
                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {t("scan.setCondition")}{" "}
                <Link
                  to="/profile"
                  className={`underline font-semibold transition-colors ${theme === 'dark' ? "text-blue-300" : "text-blue-600"
                    }`}
                >
                  {t("nav.profile")}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col gap-2">
            <label className={`font-semibold text-sm transition-colors ${theme === 'dark' ? "text-gray-200" : "text-gray-700"
              }`}>
              Food Photo
            </label>

            <motion.div
              className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 md:p-10
 text-center backdrop-blur-xl cursor-pointer overflow-hidden transition-all ring-0 ${theme === 'dark'
                  ? "border-blue-500/30 bg-blue-500/5 hover:border-cyan-400 hover:bg-cyan-500/10"
                  : "border-blue-300 bg-blue-50/50 hover:border-blue-400 hover:bg-blue-100"
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div
                    key="preview"
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src={preview}
                      className="max-w-full max-h-[250px] rounded-2xl object-contain shadow-xl"
                    />
                    <p className={`text-xs font-medium transition-colors ${theme === 'dark' ? "text-gray-300" : "text-gray-600"
                      }`}>
                      {selectedFile?.name}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Upload className={`w-12 h-12 transition-colors ${theme === 'dark' ? "text-blue-300" : "text-blue-500"
                      }`} />
                    <p className={`text-sm font-medium transition-colors ${theme === 'dark' ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Click to upload or drag and drop
                    </p>
                    <p className={`text-xs transition-colors ${theme === 'dark' ? "text-gray-400" : "text-gray-500"
                      }`}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.button
            onClick={handleScan}
            disabled={loading || !selectedFile || !condition}
            className={`w-full py-4 rounded-2xl text-base font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 ${theme === 'dark'
              ? "bg-gradient-to-r from-purple-800 to-indigo-500"
              : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }`}
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: !loading ? 0.95 : 1 }}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>{t("scan.scanning")}</span>
              </>
            ) : (
              <span>{t("scan.scanButton")}</span>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className={`mt-6 p-4 border rounded-2xl flex items-center gap-3 backdrop-blur-xl transition-colors ${theme === 'dark'
                ? "bg-red-500/10 border-red-500/20 text-red-300"
                : "bg-red-50 border-red-200 text-red-700"
                }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle className="w-5 h-5 inline-flex my-auto" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              className={`mt-6 p-7 rounded-2xl shadow-xl backdrop-blur-xl border transition-colors ${theme === 'dark'
                ? "bg-blue-500/5 border-blue-400/10"
                : "bg-blue-50 border-blue-200"
                }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className={`flex items-center gap-3 mb-5 pb-4 border-b transition-colors ${theme === 'dark' ? "border-blue-400/10" : "border-blue-200"
                }`}>
                {TrafficIcon[result.traffic_light]}
                <h2 className={`text-xl font-bold transition-colors ${theme === 'dark' ? "text-white" : "text-gray-900"
                  }`}>
                  {result.verdict_title}
                </h2>
              </div>

              <div className={`flex flex-col gap-4 break-words transition-colors ${theme === 'dark' ? "text-gray-200" : "text-gray-700"
                }`}>
                <div>
                  <strong className={`block mb-1 transition-colors ${theme === 'dark' ? "text-white/80" : "text-gray-900"
                    }`}>Food:</strong>
                  {result.food_name}
                </div>

                <div className={`pt-4 border-t transition-colors ${theme === 'dark' ? "border-blue-400/10" : "border-blue-200"
                  }`}>
                  <strong className={`block mb-1 transition-colors ${theme === 'dark' ? "text-white/80" : "text-gray-900"
                    }`}>Reason:</strong>
                  {result.reason}
                </div>

                {result.suggestion && (
                  <div className={`pt-4 border-t transition-colors ${theme === 'dark' ? "border-blue-400/10" : "border-blue-200"
                    }`}>
                    <strong className={`block mb-1 transition-colors ${theme === 'dark' ? "text-white/80" : "text-gray-900"
                      }`}>
                      Suggestion:
                    </strong>
                    {result.suggestion}
                  </div>
                )}
              </div>
              <AnimatePresence>
                {voiceAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-7 p-6 rounded-2xl border-l-4 ${theme === 'dark' ? "bg-purple-500/10 border-purple-500" : "bg-purple-50 border-purple-500"}`}
                  >
                    <h3 className="text-s font-bold text-purple-400 uppercase mb-2">Here’s what we found</h3>
                    {voiceAnswer.answer && (
                      <p className="text-s italic opacity-70">{voiceAnswer.answer}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? "border-blue-400/10" : "border-blue-200"}`}>
                <h3 className="text-s font-bold text-blue-400 uppercase mb-3">Ask About This Food</h3>
                <VoiceQuery onTranscriptChange={(text) => setFollowUpQuestion(text)} />

                <motion.button
                  onClick={handleVoiceSubmit}
                  disabled={loading || !followUpQuestion}
                  className={`w-full py-4 rounded-2xl text-base font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2 ${theme === 'dark'
                    ? "bg-gradient-to-r from-purple-800 to-indigo-500"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600"
                    }`}
                  whileHover={{ scale: !loading ? 1.05 : 1 }}
                  whileTap={{ scale: !loading ? 0.95 : 1 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>{t("scan.thinking")}</span>
                    </>
                  ) : (
                    <span>{t("scan.submitQuery")}</span>
                  )}
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
