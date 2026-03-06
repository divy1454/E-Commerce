import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Profile from '../components/Profile';
import { useCart } from '../hooks/useCart';

export default function HomePage({ user, theme, currentView, onViewChange }) {
  const { cart, updateCart, addToCart } = useCart();

  return (
    <>
      {currentView === 'products' && <ProductList onAddToCart={addToCart} theme={theme} />}
      {currentView === 'cart' && <Cart cart={cart} updateCart={updateCart} theme={theme} />}
      {currentView === 'profile' && <Profile user={user} theme={theme} />}
    </>
  );
}
