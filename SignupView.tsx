
import React, { useState } from 'react';
import { STRINGS, COLORS } from '../constants';
import { Gender, UserType, User } from '../types';

interface SignupViewProps {
  onBack: () => void;
  onComplete: (user: User) => void;
}

const SignupView: React.FC<SignupViewProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: Gender.MALE,
    type: UserType.CLIENT
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        gender: formData.gender,
        type: formData.type,
        points: 0
      };
      onComplete(newUser);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={onBack} className="p-2 text-gray-600">
          <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold mr-2">{STRINGS.SIGNUP}</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 space-x-reverse mb-8">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-gold' : 'w-2 bg-gray-200'}`}
              style={{ backgroundColor: step === i ? COLORS.PRIMARY_GOLD : undefined }}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-slide-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">المعلومات الأساسية</h2>
            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.NAME_LABEL}</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.EMAIL_LABEL}</label>
              <input 
                type="email" 
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.AGE_LABEL}</label>
              <input 
                type="number" 
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-slide-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">التواصل والتحقق</h2>
            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.PHONE_LABEL}</label>
              <input 
                type="tel" 
                placeholder="05xxxxxxxx"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-gold text-left dir-ltr"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl text-xs text-yellow-700 leading-relaxed">
              سيتم إرسال رمز تحقق عبر الرسائل النصية القصيرة لضمان أمان حسابك.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">خيارات الحساب والهوية</h2>
            
            <div>
              <label className="block text-sm text-gray-500 mb-3">{STRINGS.TYPE_LABEL}</label>
              <div className="flex space-x-3 space-x-reverse">
                <button 
                  onClick={() => setFormData({...formData, type: UserType.CLIENT})}
                  className={`flex-1 py-3 rounded-xl border transition-all ${formData.type === UserType.CLIENT ? 'bg-gold/10 border-gold text-gold' : 'bg-white border-gray-100 text-gray-400'}`}
                  style={{ 
                    borderColor: formData.type === UserType.CLIENT ? COLORS.PRIMARY_GOLD : undefined,
                    color: formData.type === UserType.CLIENT ? COLORS.PRIMARY_GOLD : undefined
                  }}
                >
                  {STRINGS.USER_TYPE_CLIENT}
                </button>
                <button 
                  onClick={() => setFormData({...formData, type: UserType.EXPERT})}
                  className={`flex-1 py-3 rounded-xl border transition-all ${formData.type === UserType.EXPERT ? 'bg-gold/10 border-gold text-gold' : 'bg-white border-gray-100 text-gray-400'}`}
                  style={{ 
                    borderColor: formData.type === UserType.EXPERT ? COLORS.PRIMARY_GOLD : undefined,
                    color: formData.type === UserType.EXPERT ? COLORS.PRIMARY_GOLD : undefined
                  }}
                >
                  {STRINGS.USER_TYPE_EXPERT}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-3">{STRINGS.GENDER_LABEL}</label>
              <div className="flex space-x-3 space-x-reverse">
                <button 
                  onClick={() => setFormData({...formData, gender: Gender.MALE})}
                  className={`flex-1 py-3 rounded-xl border transition-all ${formData.gender === Gender.MALE ? 'bg-gold/10 border-gold text-gold' : 'bg-white border-gray-100 text-gray-400'}`}
                  style={{ 
                    borderColor: formData.gender === Gender.MALE ? COLORS.PRIMARY_GOLD : undefined,
                    color: formData.gender === Gender.MALE ? COLORS.PRIMARY_GOLD : undefined
                  }}
                >
                  {STRINGS.GENDER_MALE}
                </button>
                <button 
                  onClick={() => setFormData({...formData, gender: Gender.FEMALE})}
                  className={`flex-1 py-3 rounded-xl border transition-all ${formData.gender === Gender.FEMALE ? 'bg-gold/10 border-gold text-gold' : 'bg-white border-gray-100 text-gray-400'}`}
                  style={{ 
                    borderColor: formData.gender === Gender.FEMALE ? COLORS.PRIMARY_GOLD : undefined,
                    color: formData.gender === Gender.FEMALE ? COLORS.PRIMARY_GOLD : undefined
                  }}
                >
                  {STRINGS.GENDER_FEMALE}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">{STRINGS.ID_UPLOAD_LABEL}</label>
              <div className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-xs">اضغط للرفع</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t">
        <button
          onClick={handleNext}
          className="w-full py-4 text-white font-bold rounded-xl shadow-lg"
          style={{ backgroundColor: COLORS.PRIMARY_GOLD }}
        >
          {step === 3 ? STRINGS.FINISH : STRINGS.NEXT}
        </button>
      </div>
    </div>
  );
};

export default SignupView;
