export default function InputField({ label, type = 'text', placeholder, value, onChange, error, theme = 'light', required = false, disabled = false }) {
  return (
    <div>
      {label && <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} required={required} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${theme === 'dark' ? `bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${error ? 'border-red-500' : ''}` : `bg-white border-gray-300 text-gray-900 placeholder-gray-400 ${error ? 'border-red-500' : ''}`} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
