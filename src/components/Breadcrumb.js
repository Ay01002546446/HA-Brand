import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map of path names to display labels
  const pathLabels = {
    collection: '👕 Collection',
    product: '🛍️ Product',
    cart: '🛒 Cart',
    checkout: '💳 Checkout',
    about: 'About',
    contact: 'Contact',
    dashboard: 'Dashboard',
    admin: 'Admin',
  };

  // Don't show breadcrumb on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition flex items-center gap-1"
            >
              🏠 Home
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = pathLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

            return (
              <li key={routeTo} className="flex items-center gap-2">
                <span className="text-gray-500">/</span>
                {isLast ? (
                  <span className="text-white font-semibold">{label}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
