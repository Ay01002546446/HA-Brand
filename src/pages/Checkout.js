import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext, OrderContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const steps = [
    { number: 1, title: 'Cart Review', icon: '🛒' },
    { number: 2, title: 'Shipping', icon: '📦' },
    { number: 3, title: 'Payment', icon: '💳' },
  ];

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = total > 100 ? 0 : 10;
  const finalTotal = total + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (currentStep === 1) {
      return cart.items.length > 0;
    }
    if (currentStep === 2) {
      if (!formData.name.trim()) {
        toast.error('Please enter your full name');
        return false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return false;
      }
      if (!formData.phone.trim()) {
        toast.error('Please enter your phone number');
        return false;
      }
      if (!formData.address.trim()) {
        toast.error('Please enter your address');
        return false;
      }
      if (!formData.city.trim()) {
        toast.error('Please enter your city');
        return false;
      }
      if (!formData.postalCode.trim()) {
        toast.error('Please enter your postal code');
        return false;
      }
      return true;
    }
    if (currentStep === 3) {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        toast.error('Please enter a valid 16-digit card number');
        return false;
      }
      if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        toast.error('Please enter expiry date in MM/YY format');
        return false;
      }
      if (!formData.cardCVC.match(/^\d{3,4}$/)) {
        toast.error('Please enter a valid CVC');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const order = {
      id: Date.now(),
      items: cart.items,
      total: finalTotal,
      subtotal: total,
      shipping: shippingCost,
      customer: formData,
      date: new Date().toISOString(),
      status: 'pending',
    };
    
    placeOrder(order);
    toast.success('Order placed successfully! 🎉');
    navigate('/thank-you');
  };

  if (cart.items.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add items to proceed with checkout</p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
                      currentStep >= step.number
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs uppercase tracking-wider text-gray-500">Step {step.number}</p>
                    <p className={`font-semibold ${currentStep >= step.number ? 'text-white' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 mt-4 transition ${
                      currentStep > step.number ? 'bg-white' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-4"
                      >
                        {item.image && (
                          <img
                            src={`${process.env.PUBLIC_URL}/images/${item.image}`}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-400">
                            {item.size} / {item.color}
                          </p>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 sm:col-span-2"
                      required
                    />
                    <textarea
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 sm:col-span-2"
                      rows="2"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
                      required
                    />
                  </div>

                  {/* Shipping Method */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-3">Shipping Method</p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="shipping" checked readOnly className="w-4 h-4" />
                      <span>
                        <p className="font-semibold">Standard Shipping</p>
                        <p className="text-sm text-gray-400">Delivery in 5-7 business days</p>
                      </span>
                      {shippingCost > 0 ? (
                        <span className="ml-auto font-semibold">${shippingCost}</span>
                      ) : (
                        <span className="ml-auto text-green-400 font-semibold">FREE</span>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (16 digits)"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength="19"
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 w-full font-mono"
                      required
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        maxLength="5"
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 font-mono"
                        required
                      />
                      <input
                        type="text"
                        name="cardCVC"
                        placeholder="CVC"
                        value={formData.cardCVC}
                        onChange={handleChange}
                        maxLength="4"
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-blue-400">
                      💳 This is a demo. Use any 16-digit number for testing.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-8 border-t border-white/10">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                )}
                {currentStep === 3 && (
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24 space-y-6">
              <h3 className="text-lg font-bold">Order Summary</h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.title} <span className="text-xs">({item.size})</span> ×{item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
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

              {total > 100 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs text-green-400">✓ Free Shipping on orders over $100!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;