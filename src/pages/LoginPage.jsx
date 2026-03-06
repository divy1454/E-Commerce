import { useState } from 'react';
import InputField from '../components/InputField';
import AuthLayout from '../layouts/AuthLayout';
import { authService } from '../services/api';
import { validateEmail, validatePassword } from '../utils/helpers';

export default function LoginPage({ onSwitch, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setError('');

    if (!validateEmail(email)) {
      setErrors({ email: 'Invalid email' });
      return;
    }
    if (!validatePassword(password)) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const user = authService.login(email, password);
      onLogin(user);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>
        {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">{error}</div>}
        <div className="space-y-5">
          <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} required />
          <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password} required />
        </div>
        <button type="submit" className="w-full mt-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">Sign In</button>
        <p className="mt-6 text-center text-gray-600">Don't have an account? <span onClick={onSwitch} className="text-indigo-600 cursor-pointer hover:text-indigo-700 font-semibold hover:underline">Create Account</span></p>
      </form>
    </AuthLayout>
  );
}
