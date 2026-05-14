import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = ({ onOpenCart }) => {
  const publicUrl = process.env.PUBLIC_URL;
  const { cart } = useContext(CartContext);
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={`${publicUrl}/images/logo.png`} alt="HA Logo" className="h-10 w-auto object-contain" />
          </Link>
          <span className="hidden text-sm uppercase tracking-[0.4em] text-gray-500 sm:inline-block">HA</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 lg:flex">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <Link to="/collection" className="transition hover:text-white">Collection</Link>
          <Link to="/about" className="transition hover:text-white">About</Link>
          <Link to="/contact" className="transition hover:text-white">Contact</Link>
          <Link to="/dashboard" className="transition hover:text-white">Dashboard</Link>
          <button
            onClick={onOpenCart}
            className="relative transition hover:text-white text-gray-300 font-medium flex items-center gap-2"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-black">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
        <div className="flex items-center gap-4">
          {/* Mobile Cart Button */}
          <button
            onClick={onOpenCart}
            className="lg:hidden relative flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-black">
                {cartCount}
              </span>
            )}
          </button>
          <Link to="/collection" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Shop now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;