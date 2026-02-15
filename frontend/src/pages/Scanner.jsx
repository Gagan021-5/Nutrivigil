import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Camera, 
    RefreshCcw, 
    Loader2, 
    AlertCircle, 
    CheckCircle2, 
    X,
    ArrowLeft
} from 'lucide-react';
import axios from 'axios';
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { LANGUAGE_MAP } from "../utils/languageMap";

const STORAGE_KEY = "nutriguard";

const Scanner = () => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Refs
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const requestRef = useRef(null);

    // State
    const [model, setModel] = useState(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [isFoodDetected, setIsFoodDetected] = useState(false);
    const [detectedObject, setDetectedObject] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = useState("environment");
    const [condition, setCondition] = useState("");

    // Expanded food classes to include common packaging
    const FOOD_CLASSES = [
        'apple', 'banana', 'sandwich', 'orange', 'broccoli', 
        'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'bowl',
        'bottle', 'cup', 'box'
    ];

    useEffect(() => {
        const savedCondition = localStorage.getItem(STORAGE_KEY);
        setCondition(savedCondition || "");

        const loadResources = async () => {
            try {
                await tf.ready();
                const loadedModel = await cocoSsd.load();
                setModel(loadedModel);
            } catch (err) {
                setError("Failed to load AI model. Please check your connection.");
            } finally {
                setIsModelLoading(false);
            }
        };
        loadResources();
    }, []);

    const detect = useCallback(async () => {
        if (
            !isAnalyzing &&
            model &&
            webcamRef.current &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const predictions = await model.detect(video);

            const foodMatch = predictions.find(p => 
                FOOD_CLASSES.includes(p.class) && p.score > 0.60
            );

            if (foodMatch) {
                setIsFoodDetected(true);
                setDetectedObject(foodMatch.class);
                drawBoundingBox(foodMatch, video.videoWidth, video.videoHeight);
            } else {
                setIsFoodDetected(false);
                setDetectedObject("");
                clearCanvas();
            }
        }
        requestRef.current = requestAnimationFrame(detect);
    }, [model, isAnalyzing]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(detect);
        return () => cancelAnimationFrame(requestRef.current);
    }, [detect]);

    const drawBoundingBox = (prediction, width, height) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        const [x, y, w, h] = prediction.bbox;
        ctx.strokeStyle = "#4ade80";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, w, h);
        
        ctx.fillStyle = "#4ade80";
        ctx.font = "18px sans-serif";
        ctx.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
            x, y > 20 ? y - 10 : 20
        );
    };

    const clearCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    };

    const handleCapture = async () => {
        if (!isFoodDetected || !condition) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const imageSrc = webcamRef.current.getScreenshot();
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            
            const formData = new FormData();
            formData.append("image", blob, "capture.webp");
            formData.append("condition", condition);
            formData.append("language", LANGUAGE_MAP[i18n.language] || "English");

            const res = await axios.post("https://nutb.onrender.com/analyze", formData);
            navigate('/nutrition', { state: { result: res.data } });
        } catch (err) {
            setError(err.response?.data?.message || "Analysis failed. Try again.");
            setIsAnalyzing(false);
        }
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === "user" ? "environment" : "user");
    };

    return (
        <div className={`min-h-screen flex flex-col transition-colors ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
            <header className="p-4 flex items-center justify-between backdrop-blur-md border-b border-white/10">
                <Link to="/" className="p-2 hover:bg-white/10 rounded-full">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    AI Scanner
                </h1>
                <div className="w-10" />
            </header>

            <main className="flex-1 relative flex flex-col items-center justify-center p-4">
                <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border-4 border-white/5">
                    {isModelLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mb-4" />
                            <p className="text-sm font-medium animate-pulse">Initializing AI...</p>
                        </div>
                    )}

                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/webp"
                        videoConstraints={{ facingMode }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onUserMediaError={() => setError("Camera access denied.")}
                    />

                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        width={640}
                        height={480}
                    />

                    {/* Label Alignment Guide Overlay */}
                    {(detectedObject === 'box' || detectedObject === 'bottle') && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 border-[4px] border-dashed border-purple-400/50 m-12 rounded-xl z-20 flex items-end justify-center pb-4"
                        >
                            <p className="bg-purple-500 text-white text-[10px] px-2 py-1 rounded">
                                Align Ingredient Label Here
                            </p>
                        </motion.div>
                    )}

                    <div className="absolute top-4 left-4 z-20">
                        <AnimatePresence>
                            {isFoodDetected ? (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold"
                                >
                                    <CheckCircle2 size={14} />
                                    Detected: {detectedObject.toUpperCase()}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium"
                                >
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    Scanning for food...
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-20 left-4 right-4 z-30 bg-red-500 text-white p-4 rounded-2xl flex items-center gap-3"
                            >
                                <AlertCircle size={20} />
                                <p className="text-sm flex-1">{error}</p>
                                <button onClick={() => setError(null)}><X size={20} /></button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center gap-8">
                    <button 
                        onClick={toggleCamera}
                        className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                        <RefreshCcw size={28} />
                    </button>

                    <button 
                        onClick={handleCapture}
                        disabled={!isFoodDetected || isAnalyzing || !condition}
                        className={`relative p-8 rounded-full transition-all transform active:scale-95 ${
                            isFoodDetected 
                            ? 'bg-gradient-to-tr from-purple-600 to-blue-500 shadow-[0_0_30px_rgba(124,58,237,0.5)]' 
                            : 'bg-gray-700 cursor-not-allowed'
                        }`}
                    >
                        {isAnalyzing ? (
                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                        ) : (
                            <Camera size={32} className="text-white" />
                        )}
                        {isFoodDetected && !isAnalyzing && (
                            <motion.div 
                                className="absolute -inset-2 border-2 border-purple-400 rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            />
                        )}
                    </button>

                    <div className="w-14" />
                </div>

                {!condition && (
                    <p className="mt-4 text-sm text-yellow-500 font-medium">
                        Please set your <Link to="/profile" className="underline">health condition</Link> first.
                    </p>
                )}
            </main>

            <footer className="p-6 text-center">
                <p className={`text-xs opacity-60 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI pre-validation helps ensure accurate results and reduces API overhead.
                </p>
            </footer>
        </div>
    );
};

export default Scanner;
