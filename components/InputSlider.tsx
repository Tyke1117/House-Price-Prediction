import React from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export const InputSlider: React.FC<InputSliderProps> = ({ 
  label, value, onChange, min, max, step = 1, unit = '' 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <label className="text-gray-400 text-sm font-medium">{label}</label>
        <span className="text-white font-display font-bold text-lg">
          {value.toLocaleString()} <span className="text-accent text-sm">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accentDark transition-all"
      />
    </div>
  );
};