import { useState } from 'react';
import InputField from '../components/InputField';
import AuthLayout from '../layouts/AuthLayout';
import { authService } from '../services/api';
import { validateEmail, validatePassword } from '../utils/helpers';

export default function RegisterPage({ onSwitch, onRegister }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setError('');

    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' });
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Invalid email' });
      return;
    }
    if (!validatePassword(formData.password)) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const user = authService.register(formData);
      onRegister(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <form className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20" onSubmit={handleSubmit}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us today</p>
        </div>
        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
        <div className="space-y-5">
          <InputField label="Name" type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} error={errors.name} required />
          <InputField label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} error={errors.email} required />
          <InputField label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} error={errors.password} required />
        </div>
        <button type="submit" className="w-full mt-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">Create Account</button>
        <p className="mt-6 text-center text-gray-600">Already have an account? <span onClick={onSwitch} className="text-indigo-600 cursor-pointer hover:text-indigo-700 font-semibold hover:underline">Sign In</span></p>
      </form>
    </AuthLayout>
  );
}
