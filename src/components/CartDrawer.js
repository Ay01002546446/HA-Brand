import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const publicUrl = process.env.PUBLIC_URL;

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-black border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/5"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-400 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-4">Add items to get started</p>
              <button
                onClick={onClose}
                className="text-blue-400 hover:text-blue-300 transition text-sm font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition"
                >
                  {/* Product Image */}
                  {item.image && (
                    <img
                      src={`${publicUrl}/images/${item.image}`}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}

                  {/* Product Info */}
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{item.title}</h3>

                  {/* Size & Color */}
                  <div className="text-xs text-gray-400 mb-2">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span className="ml-2">Color: {item.color}</span>}
                  </div>

                  {/* Price & Quantity */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="w-full text-xs text-red-400 hover:text-red-300 transition py-2 rounded-lg hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-4 space-y-3">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold text-white">
              <span>Total</span>
              <span className="text-green-400">${total.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                className="w-full rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Clear Cart
              </button>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
