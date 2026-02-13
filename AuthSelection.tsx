
import React from 'react';
import { STRINGS, COLORS } from '../constants';

interface AuthSelectionProps {
  onLogin: () => void;
  onSignup: () => void;
  onViewArch: () => void;
}

const AuthSelection: React.FC<AuthSelectionProps> = ({ onLogin, onSignup, onViewArch }) => {
  return (
    <div className="flex flex-col items-center justify-between flex-1 p-8" style={{ backgroundColor: COLORS.DARK_BURGUNDY }}>
      <div className="flex flex-col items-center mt-20">
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-2 rounded-full opacity-40" style={{ borderColor: COLORS.PRIMARY_GOLD }}></div>
            <div className="flex flex-col items-center">
                <div className="flex items-end mb-[-5px]">
                    <span className="text-4xl font-serif font-bold text-white">S</span>
                    <span className="text-4xl font-serif font-bold text-gray-300">U</span>
                </div>
                <span className="text-xs font-bold tracking-widest mt-1" style={{ color: COLORS.PRIMARY_GOLD }}>SALON</span>
            </div>
        </div>
        <h2 className="text-2xl font-bold text-white mt-4">{STRINGS.APP_NAME}</h2>
        <p className="text-white/50 mt-2 text-center text-sm font-light">للرجل والمرأة العصرية</p>
      </div>

      <div className="w-full space-y-4 mb-10">
        <button
          onClick={onLogin}
          className="w-full py-4 text-white font-bold rounded-xl shadow-2xl transition-transform active:scale-95 border border-white/10"
          style={{ backgroundColor: COLORS.PRIMARY_GOLD }}
        >
          {STRINGS.LOGIN}
        </button>
        <button
          onClick={onSignup}
          className="w-full py-4 font-bold rounded-xl border-2 transition-transform active:scale-95 text-white"
          style={{ borderColor: COLORS.PRIMARY_GOLD }}
        >
          {STRINGS.SIGNUP}
        </button>
        
        <button
          onClick={onViewArch}
          className="w-full py-2 text-xs text-white/30 underline"
        >
          عرض تفاصيل البنية التحتية
        </button>
      </div>
    </div>
  );
};

export default AuthSelection;
