import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Header = () => {
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
          <Link to="/cart" className="relative transition hover:text-white">
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-4 top-0 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white px-2 text-xs font-semibold text-black">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
        <Link to="/collection" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
          Shop now
        </Link>
      </div>
    </header>
  );
};

export default Header;