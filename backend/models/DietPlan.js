import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // For future Auth integration
  healthCondition: { type: String, required: true },
  dailyTargets: {
    calories: { type: Number, default: 2000 },
    protein: { type: Number, default: 50 },
    carbs: { type: Number, default: 250 },
    fats: { type: Number, default: 70 }
  },
  meals: [{
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
    foodName: String,
    calories: Number,
    protein: Number
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('DietPlan', dietPlanSchema);