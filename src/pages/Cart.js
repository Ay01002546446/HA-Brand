import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = ({ onOpenDrawer }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const publicUrl = process.env.PUBLIC_URL;

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = total > 100 ? 0 : 10;
  const finalTotal = total + shippingCost;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add items to get started shopping with us</p>
          <Link
            to="/collection"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-12">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  {item.image && (
                    <img
                      src={`${publicUrl}/images/${item.image}`}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-400">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-white/10 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-400 hover:text-red-300 transition font-semibold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <Link
                to="/collection"
                className="flex-1 rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/5"
              >
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="flex-1 rounded-full bg-red-600/20 border border-red-500/30 px-6 py-3 text-center font-semibold text-red-400 transition hover:bg-red-600/30"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <span className="text-gray-400 flex-1">
                      {item.title}
                      <span className="block text-xs text-gray-500">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shippingCost > 0 ? `$${shippingCost}` : 'FREE'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-green-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Info */}
              {total <= 100 && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-xs text-blue-400">
                    Add ${(100 - total).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {total > 100 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs text-green-400">✓ You qualify for free shipping!</p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full rounded-full bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-gray-100"
              >
                Proceed to Checkout
              </Link>

              {/* Trust Badge */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  ✓ Secure checkout • ✓ Fast delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;