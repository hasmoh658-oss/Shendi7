
import React from 'react';
import { COLORS } from '../constants';

const SplashScreen: React.FC = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center flex-1 animate-fade-in relative overflow-hidden"
      style={{ background: `radial-gradient(circle, ${COLORS.DARK_BURGUNDY} 0%, ${COLORS.DEEP_MAROON} 100%)` }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="relative w-72 h-72 flex flex-col items-center justify-center">
        {/* الدائرة الذهبية الخارجية */}
        <div className="absolute inset-0 border-[3px] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)]" style={{ borderColor: COLORS.PRIMARY_GOLD }}></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* التاج والظلال - تمثيل دقيق للصورة */}
          <div className="relative mb-4 flex flex-col items-center">
             {/* التاج الذهبي */}
             <svg className="w-16 h-12 mb-[-15px] z-20" viewBox="0 0 100 60" fill={COLORS.PRIMARY_GOLD}>
               <path d="M10,50 L25,20 L40,40 L50,10 L60,40 L75,20 L90,50 Z" />
               <circle cx="25" cy="18" r="3" />
               <circle cx="50" cy="8" r="4" />
               <circle cx="75" cy="18" r="3" />
             </svg>
             
             {/* ظلال الرجل والمرأة المتداخلة */}
             <div className="flex items-center justify-center relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* ظل الرجل (يسار) */}
                  <path 
                    d="M100,40 C70,40 50,60 50,90 C50,120 70,140 85,155 L100,170 L100,40" 
                    fill={COLORS.PRIMARY_GOLD} 
                    className="opacity-90"
                  />
                  {/* ظل المرأة (يمين) */}
                  <path 
                    d="M100,40 C130,40 150,65 150,100 C150,135 130,155 115,165 L100,175 L100,40" 
                    fill={COLORS.PRIMARY_GOLD}
                  />
                  {/* خط الفاصل في المنتصف (المقص أو التداخل) */}
                  <line x1="100" y1="40" x2="100" y2="180" stroke={COLORS.DEEP_MAROON} strokeWidth="2" />
                </svg>
             </div>
          </div>

          {/* نص SU الكبير */}
          <div className="flex items-baseline -mt-8 mb-2">
             <span className="text-8xl font-serif font-bold tracking-tighter shadow-2xl" style={{ color: COLORS.WHITE }}>S</span>
             <span className="text-8xl font-serif font-bold tracking-tighter shadow-2xl ml-[-10px]" style={{ color: COLORS.SILVER }}>U</span>
          </div>

          {/* نص SU SALON السفلي */}
          <div className="text-center">
             <h2 className="text-3xl font-bold tracking-[0.15em] leading-none" style={{ color: COLORS.PRIMARY_GOLD }}>SU SALON</h2>
             <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent my-1"></div>
             <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-90" style={{ color: COLORS.WHITE }}>FOR MEN & WOMEN</p>
          </div>
        </div>
      </div>
      
      {/* شريط التحميل الأنيق */}
      <div className="mt-16 w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gold animate-loading" style={{ backgroundColor: COLORS.PRIMARY_GOLD, width: '30%' }}></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-loading {
          animation: loading 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
