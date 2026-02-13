
import React, { useState, useRef } from 'react';
import { User, Service, Booking } from '../types';
import { STRINGS, COLORS } from '../constants';

const ExpertMain: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PORTFOLIO' | 'SERVICES'>('DASHBOARD');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // قائمة الأعمال (Portfolio) في الحالة (State) للسماح بالإضافة
  const [portfolio, setPortfolio] = useState<string[]>([
    'https://picsum.photos/400/400?random=20',
    'https://picsum.photos/400/400?random=21',
    'https://picsum.photos/400/400?random=22',
    'https://picsum.photos/400/400?random=23'
  ]);

  // قائمة الخدمات
  const [services, setServices] = useState<Service[]>([
    { id: 's1', name: 'قص شعر ملكي', price: 150, duration: '45 دقيقة' },
    { id: 's2', name: 'تنظيف بشرة متكامل', price: 200, duration: '60 دقيقة' }
  ]);

  // بيانات الطلبات المحاكية
  const [requests, setRequests] = useState<Booking[]>([
    {
        id: 'req_101',
        clientId: 'c_99',
        clientName: 'عبدالرحمن العتيبي',
        expertId: user.id,
        serviceId: 's1',
        serviceName: 'قص شعر ملكي + تنظيف بشرة',
        date: '2023-11-20',
        time: '04:00 م',
        price: 180,
        status: 'PENDING',
        clientLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'الرياض - حي الياسمين - شارع الثمامة'
        }
    }
  ]);

  const handleAction = (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    setRequests(requests.map(r => r.id === id ? {...r, status} : r));
    setActiveBooking(null);
  };

  // وظيفة إضافة عمل جديد (محاكاة أو اختيار ملف)
  const handleAddWork = () => {
    // في التطبيق الحقيقي سنفتح الكاميرا، هنا سنضيف صورة عشوائية للجمالية
    const randomImg = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`;
    setPortfolio([randomImg, ...portfolio]);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <header className="flex items-center justify-between p-5 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 border-2 border-gold flex items-center justify-center font-bold text-gold" style={{ borderColor: COLORS.PRIMARY_GOLD, color: COLORS.PRIMARY_GOLD }}>SU</div>
            <div className="mr-3">
                <h3 className="text-sm font-black text-gray-800">لوحة الخبير</h3>
                <p className="text-[10px] text-green-500 font-bold">متصل الآن</p>
            </div>
        </div>
        <button onClick={onLogout} className="p-2 text-red-500 bg-red-50 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-5 pb-24">
        {/* DASHBOARD TAB */}
        {activeTab === 'DASHBOARD' && !activeBooking && (
          <div className="animate-fade-in">
            <div className="bg-gold/10 rounded-[35px] p-8 mb-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.PRIMARY_GOLD}22 0%, ${COLORS.PRIMARY_GOLD}44 100%)` }}>
                <div className="relative z-10">
                    <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-1" style={{ color: COLORS.PRIMARY_GOLD }}>إجمالي أرباحك</h4>
                    <p className="text-4xl font-black text-gray-800">٢,٤٥٠ <span className="text-sm font-bold">ر.س</span></p>
                    <div className="flex mt-6 space-x-4 space-x-reverse">
                        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl">
                            <p className="text-[9px] text-gray-400">طلبات اليوم</p>
                            <p className="text-sm font-bold text-gray-800">٨ طلبات</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl">
                            <p className="text-[9px] text-gray-400">التقييم الحالي</p>
                            <p className="text-sm font-bold text-gray-800">٤.٩ ★</p>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="text-lg font-black text-gray-800 mb-4 mr-2">طلبات بانتظار الرد</h4>
            <div className="space-y-4">
                {requests.filter(r => r.status === 'PENDING').map(req => (
                    <div key={req.id} onClick={() => setActiveBooking(req)} className="p-5 bg-white border border-gray-100 rounded-[30px] shadow-sm flex items-center active:scale-95 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 text-xl">👤</div>
                        <div className="mr-4 flex-1">
                            <p className="text-base font-bold text-gray-800">{req.clientName}</p>
                            <p className="text-[10px] text-gold font-bold mt-1" style={{ color: COLORS.PRIMARY_GOLD }}>{req.serviceName}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{req.time} • حي الياسمين</p>
                        </div>
                        <div className="text-left">
                            <span className="text-sm font-black text-gray-800">{req.price} ر.س</span>
                            <div className="mt-2 w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center" style={{ color: COLORS.PRIMARY_GOLD }}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" /></svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* BOOKING DETAILS WITH MAP */}
        {activeBooking && (
            <div className="animate-slide-in-up">
                <div className="flex items-center mb-8">
                    <button onClick={() => setActiveBooking(null)} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-800 ml-4">
                        <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <h3 className="text-xl font-black">تفاصيل حجز العميل</h3>
                </div>

                <div className="w-full h-64 bg-gray-100 rounded-[40px] relative overflow-hidden mb-8 border-4 border-white shadow-xl">
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/46.6753,24.7136,15,0/600x400?access_token=none')] bg-cover"></div>
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] border-4 border-white animate-pulse" style={{ backgroundColor: COLORS.PRIMARY_GOLD }}>
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-[35px] p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                        <span className="text-xs text-gray-400 font-bold">العنوان</span>
                        <span className="text-sm font-bold text-gray-800">{activeBooking.clientLocation.address}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                        <span className="text-xs text-gray-400 font-bold">الخدمة</span>
                        <span className="text-sm font-bold text-gold" style={{ color: COLORS.PRIMARY_GOLD }}>{activeBooking.serviceName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-bold">المبلغ المستحق</span>
                        <span className="text-2xl font-black text-gray-800">{activeBooking.price} ر.س</span>
                    </div>
                </div>

                <div className="flex space-x-4 space-x-reverse mt-10">
                    <button onClick={() => handleAction(activeBooking.id, 'ACCEPTED')} className="flex-1 py-5 bg-gold text-white font-black rounded-3xl shadow-2xl active:scale-95 transition-all" style={{ backgroundColor: COLORS.PRIMARY_GOLD }}>قبول وتأكيد</button>
                    <button onClick={() => handleAction(activeBooking.id, 'REJECTED')} className="flex-1 py-5 bg-red-50 text-red-500 font-bold rounded-3xl border border-red-100 active:scale-95 transition-all">اعتذار</button>
                </div>
            </div>
        )}

        {/* PORTFOLIO TAB WITH ADD FEATURE */}
        {activeTab === 'PORTFOLIO' && (
          <div className="animate-fade-in pb-10">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="text-2xl font-black text-gray-800">معرض أعمالي</h4>
                    <p className="text-xs text-gray-400">اعرض أفضل أعمالك لجذب العملاء</p>
                </div>
                <button 
                  onClick={handleAddWork}
                  className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-white shadow-xl active:scale-90 transition-all"
                  style={{ backgroundColor: COLORS.PRIMARY_GOLD }}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                {portfolio.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-[30px] overflow-hidden shadow-md border border-gray-100 relative group">
                        <img src={img} alt="Work" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
             </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'SERVICES' && (
          <div className="animate-fade-in pb-10">
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="text-2xl font-black text-gray-800">خدماتي</h4>
                    <p className="text-xs text-gray-400">أضف وعدل الخدمات التي تقدمها</p>
                </div>
                <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold" style={{ color: COLORS.PRIMARY_GOLD }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
             </div>
             
             <div className="space-y-4">
                {services.map(s => (
                    <div key={s.id} className="p-6 bg-white border border-gray-100 rounded-[30px] shadow-sm flex justify-between items-center">
                        <div>
                            <h5 className="font-bold text-gray-800">{s.name}</h5>
                            <p className="text-[10px] text-gray-400 mt-1">{s.duration}</p>
                        </div>
                        <div className="text-left">
                            <p className="text-lg font-black text-gold" style={{ color: COLORS.PRIMARY_GOLD }}>{s.price} ر.س</p>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t flex justify-around p-4 z-30 max-w-[480px] mx-auto rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button onClick={() => {setActiveTab('DASHBOARD'); setActiveBooking(null);}} className={`flex flex-col items-center transition-all ${activeTab === 'DASHBOARD' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'DASHBOARD' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          <span className="text-[10px] mt-1 font-black">الرئيسية</span>
        </button>
        <button onClick={() => {setActiveTab('PORTFOLIO'); setActiveBooking(null);}} className={`flex flex-col items-center transition-all ${activeTab === 'PORTFOLIO' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'PORTFOLIO' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22 16V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H4l3-4 1.5 2 2.5-3z"/></svg>
          <span className="text-[10px] mt-1 font-black">أعمالي</span>
        </button>
        <button onClick={() => {setActiveTab('SERVICES'); setActiveBooking(null);}} className={`flex flex-col items-center transition-all ${activeTab === 'SERVICES' ? 'scale-110' : 'opacity-40'}`} style={{ color: activeTab === 'SERVICES' ? COLORS.PRIMARY_GOLD : '#333' }}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-2.01-1.39-3.59-3.51-4.13V3h-4v2.01c-1.89.41-3.5 1.62-3.5 3.74 0 2.35 1.94 3.51 4.79 4.22 2.85.71 3.5 1.48 3.5 2.54 0 1.01-1.1 1.83-2.8 1.83-1.96 0-2.71-.99-2.79-2.3H5.3c.11 2.56 1.87 3.96 4.2 4.5V21h4v-2.01c2.14-.38 3.8-1.58 3.8-3.9 0-2.61-2.11-3.6-4.9-4.3z"/></svg>
          <span className="text-[10px] mt-1 font-black">خدماتي</span>
        </button>
      </nav>
    </div>
  );
};

export default ExpertMain;
