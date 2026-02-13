
import React, { useState } from 'react';
import { STRINGS, COLORS } from '../constants';
import { User, UserType, Gender } from '../types';

interface LoginViewProps {
  onBack: () => void;
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onBack, onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleDemoLogin = (type: UserType, gender: Gender) => {
      onLogin({
          id: 'demo-' + type.toLowerCase(),
          name: type === UserType.EXPERT ? (gender === Gender.MALE ? 'خبير تجريبي' : 'خبيرة تجريبية') : 'عميل تجريبي',
          age: 30,
          email: 'demo@susalon.com',
          phone: '0500000000',
          gender: gender,
          type: type,
          points: 150
      });
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="p-2 text-gray-600">
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold mr-2">{STRINGS.LOGIN}</h1>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">أهلاً بك مجدداً</h2>
            <p className="text-gray-400">سجل دخولك للمتابعة</p>
        </div>

        <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.PHONE_LABEL}</label>
              <input 
                type="tel" 
                placeholder="05xxxxxxxx"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold text-left dir-ltr"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">كلمة المرور</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold text-left dir-ltr"
              />
            </div>
            
            <button className="text-xs text-gold font-bold text-left w-full mt-2" style={{ color: COLORS.PRIMARY_GOLD }}>نسيت كلمة المرور؟</button>

            <button
                className="w-full py-4 text-white font-bold rounded-xl shadow-lg mt-6"
                style={{ backgroundColor: COLORS.PRIMARY_GOLD }}
            >
                {STRINGS.LOGIN}
            </button>
        </div>

        <div className="mt-12 space-y-3">
            <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest">الدخول السريع للتجربة</p>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleDemoLogin(UserType.CLIENT, Gender.MALE)} className="p-2 bg-gray-50 rounded-lg text-[10px] hover:bg-gold/10">عميل (ذكر)</button>
                <button onClick={() => handleDemoLogin(UserType.CLIENT, Gender.FEMALE)} className="p-2 bg-gray-50 rounded-lg text-[10px] hover:bg-gold/10">عميلة (أنثى)</button>
                <button onClick={() => handleDemoLogin(UserType.EXPERT, Gender.MALE)} className="p-2 bg-gray-50 rounded-lg text-[10px] hover:bg-gold/10">خبير (ذكر)</button>
                <button onClick={() => handleDemoLogin(UserType.EXPERT, Gender.FEMALE)} className="p-2 bg-gray-50 rounded-lg text-[10px] hover:bg-gold/10">خبيرة (أنثى)</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
