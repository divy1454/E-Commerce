import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { ToastProvider } from './context/ToastContext';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState('products');
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (user) {
    return (
      <ToastProvider>
        <MainLayout user={user} onLogout={logout} theme={theme} toggleTheme={toggleTheme} currentView={currentView} onViewChange={setCurrentView}>
          <HomePage user={user} theme={theme} currentView={currentView} onViewChange={setCurrentView} />
        </MainLayout>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      {showRegister ? (
        <RegisterPage onSwitch={() => setShowRegister(false)} onRegister={login} />
      ) : (
        <LoginPage onSwitch={() => setShowRegister(true)} onLogin={login} />
      )}
    </ToastProvider>
  );
}

export default App;
