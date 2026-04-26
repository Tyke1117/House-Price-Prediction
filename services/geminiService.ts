import { HouseDetails, PredictionResult } from "../types";

export const predictHousePrice = async (details: HouseDetails): Promise<PredictionResult> => {
  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details)
  });

  if (!response.ok) {
    throw new Error("Prediction failed")
  }

  const data = await response.json();

  console.log("API response:", data);
  console.log("Input details:", details);
  const comparableAvg = Math.round((data.predicted_price * 100000) / details.total_sqft);
  console.log("Calculated comparable average:", comparableAvg);

  return {
    estimatedPriceMin: Math.max(0, data.predicted_price - 5),
    estimatedPriceMax: data.predicted_price + 5,
    confidenceScore: 85,
    marketTrend: "Stable",
    reasoning: "Prediction generated using trained Bangalore house price ML model.",
    valueAddTips: [
      "Improve interior finishing",
      "Add modular kitchen",
      "Better vemtilation and lighting"
    ],
    comparableAverage: comparableAvg
  };
};
