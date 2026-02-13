
import React, { useState } from 'react';
import { User, Expert, Gender, Service } from '../types';
import { STRINGS, COLORS } from '../constants';
import { MOCK_EXPERTS, getFilteredExperts } from '../services/expertService';

interface ClientMainProps {
  user: User;
  onLogout: () => void;
}

const ClientMain: React.FC<ClientMainProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'ORDERS' | 'PROFILE'>('HOME');
  const [viewMode, setViewMode] = useState<'MAP' | 'LIST'>('LIST');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS'>('IDLE');

  const filteredExperts = getFilteredExperts(MOCK_EXPERTS, user);

  const handleBooking = (service: Service) => {
    setBookingStatus('LOADING');
    setTimeout(() => {
      setBookingStatus('SUCCESS');
      setTimeout(() => {
        setBookingStatus('IDLE');
        setSelectedExpert(null);
        setActiveTab('ORDERS');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center text-sm font-bold border-2"
            style={{ color: COLORS.PRIMARY_GOLD, borderColor: COLORS.PRIMARY_GOLD }}
          >
            {user.name.charAt(0)}
          </div>
          <div className="mr-3">
            <h3 className="text-sm font-bold text-gray-800">{user.name}</h3>
            <p className="text-[10px] text-gray-400">عميل SU المتميز</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-gray-50 rounded-full border border-gold/20 flex items-center">
           <div className="w-2 h-2 rounded-full bg-green-500 ml-2"></div>
           <span className="text-[10px] font-bold text-gray-600">{user.points} نقطة</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'HOME' && !selectedExpert && (
          <div className="p-4 animate-fade-in">
            <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-800">اكتشف الأفضل</h2>
                <p className="text-xs text-gray-400 mt-1">خبراء تجميل {user.gender === Gender.MALE ? 'رجالي' : 'نسائي'} بالقرب منك</p>
            </div>

            <div className="flex mb-6 p-1 bg-gray-100 rounded-2xl">
                <button onClick={() => setViewMode('LIST')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${viewMode === 'LIST' ? 'bg-white shadow-sm text-gold' : 'text-gray-400'}`} style={{ color: viewMode === 'LIST' ? COLORS.PRIMARY_GOLD : undefined }}>القائمة</button>
                <button onClick={() => setViewMode('MAP')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${viewMode === 'MAP' ? 'bg-white shadow-sm text-gold' : 'text-gray-400'}`} style={{ color: viewMode === 'MAP' ? COLORS.PRIMARY_GOLD : undefined }}>الخريطة</button>
            </div>

            {viewMode === 'LIST' ? (
              <div className="space-y-4">
                {filteredExperts.map(expert => (
                  <div key={expert.id} onClick={() => setSelectedExpert(expert)} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center active:scale-95 transition-transform">
                    <div className="relative">
                        <img src={expert.portfolio[0]} alt={expert.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                        <div className="absolute -bottom-2 -left-2 bg-white px-2 py-0.5 rounded-lg border border-gray-50 shadow-sm text-[9px] font-bold text-green-600">نشط</div>
                    </div>
                    <div className="mr-4 flex-1">
                      <h4 className="font-bold text-gray-800 text-base">{expert.name}</h4>
                      <p className="text-[10px] text-gray-400 line-clamp-1 mt-1">{expert.bio}</p>
                      <div className="flex items-center mt-2 space-x-3 space-x-reverse">
                        <span className="text-[10px] text-yellow-500 font-bold flex items-center">★ {expert.rating}</span>
                        <span className="text-[10px] text-gray-400">• {expert.services.length} خدمات</span>
                        <span className="text-[10px] text-gold font-bold" style={{ color: COLORS.PRIMARY_GOLD }}>{expert.services[0]?.price} ر.س</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="h-96 w-full bg-gray-200 rounded-3xl relative overflow-hidden shadow-inner border border-gray-100">
                     <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/46.6753,24.7136,12,0/600x600?access_token=none')] bg-cover opacity-60"></div>
                     {filteredExperts.map(expert => (
                        <div key={expert.id} onClick={() => setSelectedExpert(expert)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-2xl border-2 animate-bounce" style={{ borderColor: COLORS.PRIMARY_GOLD }}>
                            <img src={expert.portfolio[0]} className="w-12 h-12 rounded-full object-cover" />
                        </div>
                     ))}
                </div>
            )}
          </div>
        )}

        {selectedExpert && (
            <div className="animate-slide-in-up bg-white min-h-full">
                <div className="relative h-72">
                    <img src={selectedExpert.portfolio[1] || selectedExpert.portfolio[0]} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20"></div>
                    <button onClick={() => setSelectedExpert(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-gray-800">
                        <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-6 right-6 left-6">
                        <h2 className="text-3xl font-black text-gray-900">{selectedExpert.name}</h2>
                        <div className="flex items-center mt-2">
                             <div className="bg-gold px-3 py-1 rounded-full text-[10px] text-white font-bold" style={{ backgroundColor: COLORS.PRIMARY_GOLD }}>خبير معتمد</div>
                             <span className="mr-3 text-sm font-bold text-gray-700">★ {selectedExpert.rating}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">نبذة عن الخبير</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-8">{selectedExpert.bio}</p>

                    <h3 className="text-lg font-bold text-gray-800 mb-4">معرض الأعمال</h3>
                    <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-6 scrollbar-hide">
                        {selectedExpert.portfolio.map((img, i) => (
                            <div key={i} className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-md border border-gray-100">
                                <img src={img} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-4">الخدمات والأسعار</h3>
                    <div className="space-y-4">
                        {selectedExpert.services.map(service => (
                            <div key={service.id} className="p-5 bg-gray-50 rounded-3xl flex justify-between items-center group active:bg-gold/5 transition-colors">
                                <div>
                                    <h5 className="font-bold text-gray-800 text-sm">{service.name}</h5>
                                    <p className="text-[10px] text-gray-400 mt-1">المدة التقريبية: {service.duration}</p>
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-gold text-lg" style={{ color: COLORS.PRIMARY_GOLD }}>{service.price} <span className="text-[10px]">ر.س</span></p>
                                    <button 
                                        onClick={() => handleBooking(service)}
                                        className="mt-2 px-6 py-2 bg-gold text-white text-[10px] font-bold rounded-xl shadow-lg active:scale-90 transition-all"
                                        style={{ backgroundColor: COLORS.PRIMARY_GOLD }}
                                    >
                                        احجز الآن
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'ORDERS' && (
            <div className="p-8 text-center animate-fade-in flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mb-6 border border-gold/10">
                    <svg className="w-12 h-12 text-gold opacity-50" style={{ color: COLORS.PRIMARY_GOLD }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">لا توجد مواعيد حالية</h3>
                <p className="text-sm text-gray-400 mt-2 max-w-[200px]">أبرز ملامح جمالك تبدأ بحجز موعد مع أحد خبرائنا</p>
                <button onClick={() => setActiveTab('HOME')} className="mt-8 px-10 py-4 bg-gold text-white font-bold rounded-2xl shadow-xl" style={{ backgroundColor: COLORS.PRIMARY_GOLD }}>تصفح الخبراء</button>
            </div>
        )}

        {activeTab === 'PROFILE' && (
          <div className="p-6 animate-fade-in pb-20">
             <div className="bg-gray-50 rounded-[40px] p-8 mb-6 border border-gray-100 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center text-3xl font-black border-4 border-white shadow-xl mb-4" style={{ color: COLORS.PRIMARY_GOLD }}>
                   {user.name.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="mt-4 px-4 py-1.5 bg-white rounded-full border border-gray-100 text-xs font-bold text-gray-600">
                   عضوية ذهبية
                </div>
             </div>

             <div className="space-y-3">
                <button className="w-full p-5 bg-white border border-gray-100 rounded-3xl flex items-center shadow-sm">
                   <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 ml-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </div>
                   <span className="font-bold text-gray-700">تعديل الملف الشخصي</span>
                </button>
                <button className="w-full p-5 bg-white border border-gray-100 rounded-3xl flex items-center shadow-sm">
                   <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center text-gold ml-4" style={{ color: COLORS.PRIMARY_GOLD }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <span className="font-bold text-gray-700">المحفظة والرصيد</span>
                </button>
                
                <div className="pt-6">
                   <button 
                    onClick={onLogout}
                    className="w-full p-5 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center font-black transition-all active:scale-95 border border-red-100 shadow-sm"
                   >
                      <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      تسجيل الخروج من الحساب
                   </button>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* شاشة نجاح الطلب */}
      {bookingStatus === 'SUCCESS' && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-10 animate-fade-in">
              <div className="bg-white rounded-[40px] p-10 text-center w-full max-w-sm shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gold" style={{ backgroundColor: COLORS.PRIMARY_GOLD }}></div>
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100 animate-bounce">
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800">تم إرسال طلبك!</h3>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">الخبير بانتظار تأكيد طلبك. سنرسل لك إشعاراً فور القبول.</p>
              </div>
          </div>
      )}

      {/* شاشة التحميل */}
      {bookingStatus === 'LOADING' && (
          <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-center">
              <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: COLORS.PRIMARY_GOLD + '44', borderTopColor: COLORS.PRIMARY_GOLD }}></div>
                  <p className="text-xs font-bold text-gold animate-pulse" style={{ color: COLORS.PRIMARY_GOLD }}>جاري إرسال طلبك...</p>
              </div>
          </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t flex justify-around p-4 z-30 max-w-[480px] mx-auto rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button onClick={() => {setSelectedExpert(null); setActiveTab('HOME');}} className={`flex flex-col items-center transition-all ${activeTab === 'HOME' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'HOME' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className="text-[10px] mt-1 font-black">الرئيسية</span>
        </button>
        <button onClick={() => {setSelectedExpert(null); setActiveTab('ORDERS');}} className={`flex flex-col items-center transition-all ${activeTab === 'ORDERS' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'ORDERS' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
          <span className="text-[10px] mt-1 font-black">مواعيدي</span>
        </button>
        <button onClick={() => {setSelectedExpert(null); setActiveTab('PROFILE');}} className={`flex flex-col items-center transition-all ${activeTab === 'PROFILE' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'PROFILE' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span className="text-[10px] mt-1 font-black">حسابي</span>
        </button>
      </nav>
    </div>
  );
};

export default ClientMain;
