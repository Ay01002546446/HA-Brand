import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Collection = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const [toast, setToast] = useState(null);
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({
      title: 'Added to cart',
      message: `${product.title} was added successfully.`,
    });
    setTimeout(() => setToast(null), 2400);
  };

  const handleViewCart = () => {
    setToast(null);
    navigate('/cart');
  };

  const products = [
    { id: 1, title: 'Premium Tailored Trousers', image: 'markus-winkler-PQmXUxmfR44-unsplash.jpg', price: 150 },
    { id: 2, title: 'Modern Signature T-Shirt', image: 'andreea-pop-BZybQC-zZwQ-unsplash.jpg', price: 80 },
    { id: 3, title: 'Limited Edition Jacket', image: 'fujiphilm-ojZ4wJNUM5w-unsplash.jpg', price: 250 },
  ];

  return (
    <section id="collection" className="bg-[#050505] py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.45em] text-gray-500">Collection</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">A wardrobe that takes control.</h2>
          </div>
          <div className="space-y-3 text-right">
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Every piece is crafted to feel precise, powerful and effortlessly refined — the kind of clothing that turns every entrance into a moment.
            </p>
            {cartCount > 0 && (
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Go to Cart ({cartCount})
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:border-white/20">
              <div className="aspect-[5/6] overflow-hidden bg-[#111]">
                <img
                  src={`${publicUrl}/images/${product.image}`}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-3 px-6 py-6">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Iconic</p>
                <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                <p className="text-sm leading-6 text-slate-400">Precision tailoring, strong lines and premium fabric.</p>
                <p className="text-lg font-semibold text-white">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {toast && (
        <div className="fixed right-4 top-24 z-50 w-full max-w-sm rounded-3xl border border-white/10 bg-white p-4 text-black shadow-2xl shadow-black/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{toast.title}</p>
              <p className="text-sm text-slate-600">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-gray-500 transition hover:text-black">×</button>
          </div>
          <button
            onClick={handleViewCart}
            className="mt-4 w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
          >
            View Cart ({cartCount})
          </button>
        </div>
      )}
    </section>
  );
};

export default Collection;