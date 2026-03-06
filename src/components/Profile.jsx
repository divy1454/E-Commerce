import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import InputField from './InputField';

export default function Profile({ user, theme }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, email: user.email, password: '' });
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, name: formData.name, email: formData.email, ...(formData.password && { password: formData.password }) } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    sessionStorage.setItem('user', JSON.stringify(updatedUser));
    
    setEditing(false);
    setSuccess(true);
    showToast('Profile updated successfully!');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 max-w-2xl`}>
      {success && (
        <div className={`${theme === 'dark' ? 'bg-green-900 border-green-700 text-green-200' : 'bg-green-50 border-green-500 text-green-700'} border-l-4 p-4 rounded-lg mb-6 flex items-center gap-2`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Profile updated successfully!
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-1`}>{formData.name}</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Member since {new Date().getFullYear()}</p>
          </div>
        </div>
        <button onClick={() => editing ? setEditing(false) : setEditing(true)} className={`px-6 py-2 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-lg transition-all font-medium`}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      <div className="space-y-6">
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl`}>
          {editing ? (
            <InputField
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              theme={theme}
            />
          ) : (
            <>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>Full Name</label>
              <p className={`text-xl font-semibold mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{formData.name}</p>
            </>
          )}
        </div>
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl`}>
          {editing ? (
            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              theme={theme}
            />
          ) : (
            <>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>Email Address</label>
              <p className={`text-xl font-semibold mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{formData.email}</p>
            </>
          )}
        </div>
        {editing && (
          <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl`}>
            <InputField
              label="New Password"
              type="password"
              placeholder="Leave blank to keep current"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              theme={theme}
            />
          </div>
        )}
        <div className={`p-6 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900 to-purple-900 border-indigo-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'} rounded-xl border-2`}>
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <label className={`text-sm font-medium ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'} uppercase tracking-wide`}>Account Status</label>
          </div>
          <p className={`text-xl font-semibold ml-9 ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-800'}`}>Active</p>
        </div>
      </div>
      {editing && (
        <button onClick={handleSave} className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
          Save Changes
        </button>
      )}
    </div>
  );
}
