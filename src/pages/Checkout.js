import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, OrderContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Date.now(),
      items: cart.items,
      total,
      customer: formData,
      date: new Date().toISOString(),
    };
    placeOrder(order);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-white/20 mt-4 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 rounded"
                required
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 rounded"
                rows="4"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black py-3 rounded-full font-semibold"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;