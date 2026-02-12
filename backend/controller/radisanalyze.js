const redisClient = require('../utils/redisClient');
// Assuming you have a service or helper for Gemini/AI logic
// const { generateAnalysis } = require('../services/geminiService'); 

/**
 * Analyzes food images and caches results in Redis
 */
const analyzeImage = async (req, res) => {
    try {
        const { image, foodName } = req.body;

        if (!image && !foodName) {
            return res.status(400).json({ error: "Missing image or food name" });
        }

        // 1. Define a unique Cache Key
        // Tip: In the future, you could hash the 'image' string to make this 
        // truly image-consistent rather than just name-consistent.
        const cacheKey = `analysis:${foodName.toLowerCase().replace(/\s+/g, '_')}`;

        // 2. Try to fetch from Redis
        const cachedResult = await redisClient.get(cacheKey);

        if (cachedResult) {
            console.log(`Cache Hit for: ${cacheKey}`);
            return res.status(200).json({
                ...JSON.parse(cachedResult),
                fromCache: true // Required for frontend debugging
            });
        }

        console.log(`Cache Miss. Analyzing via Gemini...`);

        // 3. Perform the actual AI Analysis (Simulated here)
        // const analysisResult = await generateAnalysis(image);
        const analysisResult = {
            foodName: foodName,
            calories: "250 kcal",
            nutrients: { protein: "10g", carbs: "30g", fat: "5g" },
            confidence: 0.98,
            timestamp: new Date().toISOString()
        };

        // 4. Store in Redis with an Expiration (TTL)
        // EX: 86400 sets the expiration to 24 hours (in seconds)
        await redisClient.set(cacheKey, JSON.stringify(analysisResult), {
            EX: 86400 
        });

        // 5. Return response with fromCache: false
        return res.status(200).json({
            ...analysisResult,
            fromCache: false
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        });
    }
};

module.exports = { analyzeImage };