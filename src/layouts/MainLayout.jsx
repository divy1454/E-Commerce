import Sidebar from '../components/Sidebar';

export default function MainLayout({ children, user, onLogout, theme, toggleTheme, currentView, onViewChange }) {
  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex overflow-hidden`}>
      <Sidebar user={user} onLogout={onLogout} theme={theme} toggleTheme={toggleTheme} currentView={currentView} onViewChange={onViewChange} />
      <main className={`flex-1 p-8 overflow-y-auto`}>{children}</main>
    </div>
  );
}
