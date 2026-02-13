import DietPlan from "../models/DietPlan.js";
import { logError } from "../utils/apiErrorHandler.js"; // Using existing error utility

export const saveUserPlan = async (req, res) => {
  try {
    const { userId, healthCondition, dailyTargets, meal } = req.body;
    
    let plan = await DietPlan.findOne({ userId });
    
    if (!plan) {
      plan = new DietPlan({ userId, healthCondition, dailyTargets });
    } else {
      plan.healthCondition = healthCondition;
      plan.dailyTargets = dailyTargets;
    }

    if (meal) plan.meals.push(meal);
    
    await plan.save();
    res.json({ success: true, plan });
  } catch (error) {
    logError(error, "[Planner] Failed to save plan");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findOne({ userId: req.params.userId });
    res.json({ success: true, plan: plan || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};