import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export default function ProductList({ onAddToCart, theme }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => 
    (category === 'all' || p.category === category) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 8;
  const displayedProducts = filtered.slice(0, page * itemsPerPage);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayedProducts.length < filtered.length) {
        setPage(prev => prev + 1);
      }
    });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [displayedProducts.length, filtered.length]);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    showToast(`${product.title.substring(0, 30)}... added to cart!`);
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${theme === 'dark' ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border-l-4 border-red-500 p-6 rounded-lg`}>
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className={`font-bold ${theme === 'dark' ? 'text-red-200' : 'text-red-800'}`}>Error Loading Products</h3>
            <p className={theme === 'dark' ? 'text-red-300' : 'text-red-700'}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className={`w-full pl-10 pr-4 py-3 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`} />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className={`px-4 py-3 border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all capitalize`}>
            {categories.map(cat => <option key={cat} value={cat} className="capitalize">{cat}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map(product => (
          <div key={product.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group`}>
            <div className={`relative h-56 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-center p-4 overflow-hidden`}>
              <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-2 h-12 overflow-hidden line-clamp-2`}>{product.title}</h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>4.5</span>
                </div>
              </div>
              <button onClick={() => handleAddToCart(product)} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {displayedProducts.length < filtered.length && (
        <div ref={observerTarget} className="flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
