import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/CartContext';
import { useContext } from 'react';

const ThankYou = () => {
  const navigate = useNavigate();
  const { orders } = useContext(OrderContext);
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      setLatestOrder(orders[orders.length - 1]);
    } else {
      // إذا لم يكن هناك طلب، أعد التوجيه للصفحة الرئيسية بعد 5 ثوان
      setTimeout(() => navigate('/'), 5000);
    }
  }, [orders, navigate]);

  const handleContinueShopping = () => {
    navigate('/collection');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animation Checkmark */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full animate-bounce" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="2" />
              <path
                d="M30 50 L45 65 L70 35"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-black mb-4">Thank You! 🎉</h1>
        <p className="text-xl text-gray-400 mb-8">
          Your order has been placed successfully. We appreciate your purchase!
        </p>

        {latestOrder && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              {/* Order ID */}
              <div>
                <p className="text-gray-500 text-sm">Order Number</p>
                <p className="text-2xl font-bold text-green-400">#{latestOrder.id}</p>
              </div>

              {/* Order Items */}
              <div className="text-left">
                <p className="text-gray-500 text-sm mb-4">Order Details</p>
                <div className="space-y-3">
                  {latestOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-3 border-b border-white/5">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-400">${latestOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="text-left bg-white/5 rounded-lg p-4">
                <p className="text-gray-500 text-sm mb-2">Delivery Address</p>
                <p className="font-semibold">{latestOrder.customer?.name}</p>
                <p className="text-sm text-gray-400">{latestOrder.customer?.email}</p>
                <p className="text-sm text-gray-400 mt-2">{latestOrder.customer?.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Message */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8">
          <p className="text-green-400 text-sm">
            ✓ A confirmation email has been sent to your email address
          </p>
          <p className="text-green-400 text-sm mt-2">
            ✓ You can track your order from your dashboard
          </p>
        </div>

        {/* Next Steps */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-400">
            We'll process your order within 24 hours and send you a shipping notification.
          </p>
          <p className="text-gray-500 text-sm">
            Need help? Contact us on WhatsApp for instant support!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContinueShopping}
            className="flex-1 rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-100"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            View Dashboard
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-gray-600 text-sm mt-8">
          Thank you for shopping at HA - Premium Men's Fashion
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
