
import React, { useState, useEffect } from 'react';
import { User, UserType, Gender, Expert } from './types';
import { STRINGS, COLORS } from './constants';
import SplashScreen from './views/SplashScreen';
import AuthSelection from './views/AuthSelection';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import ClientMain from './views/ClientMain';
import ExpertMain from './views/ExpertMain';
import ArchitectureViewer from './views/ArchitectureViewer';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'SPLASH' | 'AUTH_SELECT' | 'LOGIN' | 'SIGNUP' | 'MAIN_CLIENT' | 'MAIN_EXPERT' | 'ARCH'>('SPLASH');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === 'SPLASH') setCurrentStep('AUTH_SELECT');
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleLogin = (u: User) => {
    setUser(u);
    setCurrentStep(u.type === UserType.CLIENT ? 'MAIN_CLIENT' : 'MAIN_EXPERT');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('AUTH_SELECT');
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'SPLASH':
        return <SplashScreen />;
      case 'AUTH_SELECT':
        return (
          <AuthSelection 
            onLogin={() => setCurrentStep('LOGIN')} 
            onSignup={() => setCurrentStep('SIGNUP')} 
            onViewArch={() => setCurrentStep('ARCH')}
          />
        );
      case 'LOGIN':
        return <LoginView onBack={() => setCurrentStep('AUTH_SELECT')} onLogin={handleLogin} />;
      case 'SIGNUP':
        return <SignupView onBack={() => setCurrentStep('AUTH_SELECT')} onComplete={handleLogin} />;
      case 'MAIN_CLIENT':
        return user ? <ClientMain user={user} onLogout={handleLogout} /> : null;
      case 'MAIN_EXPERT':
        return user ? <ExpertMain user={user} onLogout={handleLogout} /> : null;
      case 'ARCH':
        return <ArchitectureViewer onBack={() => setCurrentStep('AUTH_SELECT')} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white select-none">
      {renderContent()}
    </div>
  );
};

export default App;
