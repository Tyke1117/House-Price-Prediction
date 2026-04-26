import React from 'react';
import { PredictionResult } from '../types';
import { TrendingUp, TrendingDown, Minus, CheckCircle2, DollarSign, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsViewProps {
  result: PredictionResult;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  const formatCurrency = (val: number) => {
    // Format as ₹ XX L (Lakhs)
    return `₹${Math.round(val)} Lakhs`;
  };

  const trendIcon = {
    'Up': <TrendingUp className="text-green-400 w-6 h-6" />,
    'Down': <TrendingDown className="text-red-400 w-6 h-6" />,
    'Stable': <Minus className="text-yellow-400 w-6 h-6" />,
  };

  const chartData = [
    { name: 'Min', value: result.estimatedPriceMin },
    { name: 'Avg', value: (result.estimatedPriceMin + result.estimatedPriceMax) / 2 },
    { name: 'Max', value: result.estimatedPriceMax },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-4xl mx-auto">
      {/* Main Price Card */}
      <div className="bg-glass backdrop-blur-2xl border border-glassBorder rounded-3xl p-8 mb-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <h2 className="text-gray-400 uppercase tracking-widest text-xs font-semibold mb-2">Estimated Market Value</h2>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl md:text-5xl font-display font-bold text-white">
                {formatCurrency(result.estimatedPriceMin)}
              </span>
              <span className="text-gray-500 text-xl">to</span>
            </div>
            <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
              {formatCurrency(result.estimatedPriceMax)}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm text-gray-300">Confidence: <span className="font-bold text-white">{result.confidenceScore}%</span></span>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                {trendIcon[result.marketTrend]}
                <span className="text-sm text-gray-300">Trend: <span className="font-bold text-white">{result.marketTrend}</span></span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full bg-white/5 rounded-2xl p-4 border border-white/5">
            <h3 className="text-xs text-gray-400 mb-4 uppercase tracking-wide">Price Bracket Analysis (₹ Lakhs)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide /> 
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', color: '#1e293b' }}
                  formatter={(value: number) => [`₹${value.toFixed(2)} L`, 'Price']}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                   {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 1 ? '#8b5cf6' : '#475569'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reasoning */}
        <div className="md:col-span-2 bg-glass backdrop-blur-xl border border-glassBorder rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Valuation Analysis</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            {result.reasoning}
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-sm text-gray-400">Comparable Avg.</span>
             <span className="font-mono text-accent text-lg">₹{result.comparableAverage.toFixed(0)}/sqft</span>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-glass backdrop-blur-xl border border-glassBorder rounded-3xl p-6">
           <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Value Boosters</h3>
          </div>
          <ul className="space-y-3">
            {result.valueAddTips.map((tip, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex gap-2 items-start">
                <span className="text-accent mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          Analyze Another Property
        </button>
      </div>
    </div>
  );
};