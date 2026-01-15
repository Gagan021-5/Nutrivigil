import axios from "axios";
import fs from "fs";
import { geminiModel } from "../services/googleservices.js";
import imageToBase64 from "../utils/imgconversion.js";
import getMimeType from "../utils/getmemetype.js";
import { parseGeminiJson } from "../utils/parseGeminiJson.js";

export const analyzeFood = async (req, res) => {
  try {
    const condition = req.body.condition;
    const query = req.body.query;
    const existingFoodName = req.body.foodName;

    if (!req.file && query) {
      const followUpPrompt = `
        Context: The user is asking about ${existingFoodName || "this food"}.
        Health Condition: ${condition}
        User's Question: "${query}"
        
        Analyze if this is safe based on the condition. 
        Output ONLY JSON:
        {
          "traffic_light": "green", 
          "verdict_title": "Follow-up Answer",
          "answer": "Direct answer to the user's question and a add helpful tip.",
        }
      `;

      const result = await geminiModel.generateContent(followUpPrompt);
      const responseText = result.response.candidates[0].content.parts[0].text;
      
      try {
        const parsedData = parseGeminiJson(responseText);
        return res.json({ 
          food_name: existingFoodName, 
          ...parsedData 
        });
      } catch (parseError) {
        console.error("Follow-up query JSON parse error:", parseError);
        return res.status(500).json({
          error: "Failed to parse AI response",
          message: parseError.message,
          raw: responseText.substring(0, 200)
        });
      }
    }
    if (!req.file)
      return res.status(400).json({ error: "No image file provided" });

    if (!req.body.condition)
      return res.status(400).json({ error: "No condition provided" });

    const imagePath = req.file.path;
    
    const base64 = imageToBase64(imagePath);
    const mimeType = getMimeType(imagePath);

    const identify = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: base64, mimeType } },
            { text: "Identify the dish. Output ONLY the name." },
          ],
        },
      ],
    });

    const foodName =
      identify.response.candidates[0].content.parts[0].text.trim();

    // Nutrition API
     const nutrition = await axios.get(
      "https://api.api-ninjas.com/v1/nutrition",
      {
        params: { query: foodName },
        headers: { "X-Api-Key": process.env.NINJA_API_KEY },
      }
    );

    //check
    const nutritionData = nutrition.data && nutrition.data.length > 0 ? nutrition.data[0] : {};
   
    // Analysis Prompt
    const analysisPrompt = `
      Here is the nutritional data for ${foodName}: 
      ${JSON.stringify(nutritionData)}

      Analyze this food for someone with the condition: "${condition}"
      Output ONLY JSON in this exact format:
      {
        "traffic_light": "green" | "yellow" | "red",
        "verdict_title": "",
        "reason": "",
        "suggestion": ""
      }
    `;

    const analysis = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: analysisPrompt }] }],
    });

    const analysisText = analysis.response.candidates[0].content.parts[0].text || "";

    let cleanJson;

    try {
      cleanJson = parseGeminiJson(analysisText);
      
      res.json({
        food_name: foodName,
        nutrition: nutritionData,
        ...cleanJson,
      });
    } catch (parseError) {
      console.error("Analysis JSON parse error:", parseError);
      res.status(500).json({
        error: "Failed to parse AI response",
        message: parseError.message,
        raw: analysisText.substring(0, 200)
      });
    } finally {
      //delete upload
      fs.unlinkSync(imagePath);
    }
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Analysis failed",
      message: err.message,
    });
  }
};
