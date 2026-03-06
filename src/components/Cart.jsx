import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function Cart({ cart, updateCart, theme }) {
  const { showToast } = useToast();
  const updateQuantity = (id, delta) => {
    updateCart(cart.map(item => 
      item.id === id ? {...item, quantity: Math.max(0, item.quantity + delta)} : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id) => {
    updateCart(cart.filter(item => item.id !== id));
    showToast('Item removed from cart');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Shopping Cart</h2>
        {cart.length > 0 && (
          <span className={`px-4 py-2 ${theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700'} rounded-full font-semibold`}>{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
        )}
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <svg className={`w-24 h-24 mx-auto ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Your cart is empty</p>
          <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Add some products to get started</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className={`flex items-center gap-6 p-6 border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:shadow-md'} rounded-xl transition-all`}>
                <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg flex items-center justify-center p-2`}>
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-1`}>{item.title}</h3>
                  <p className="text-indigo-600 font-bold text-lg">${item.price}</p>
                </div>
                <div className={`flex items-center gap-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-2`}>
                  <button onClick={() => updateQuantity(item.id, -1)} className={`w-9 h-9 ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-indigo-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-600'} border rounded-lg hover:text-white hover:border-indigo-600 transition-all font-bold shadow-sm`}>-</button>
                  <span className={`w-12 text-center font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className={`w-9 h-9 ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-indigo-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-600'} border rounded-lg hover:text-white hover:border-indigo-600 transition-all font-bold shadow-sm`}>+</button>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-2`}>${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className={`px-4 py-2 ${theme === 'dark' ? 'bg-red-900 text-red-200 border-red-700 hover:bg-red-700' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white'} rounded-lg transition-all font-medium border`}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-8 pt-6 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Subtotal</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Shipping</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>${total.toFixed(2)}</p>
                <p className="text-green-600 font-semibold">Free</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Total</h3>
              <h3 className="text-3xl font-bold text-indigo-600">${total.toFixed(2)}</h3>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
