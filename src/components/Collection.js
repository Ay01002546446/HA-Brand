import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductModal from './ProductModal';

const Collection = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const products = [
    { 
      id: 1, 
      title: 'Premium Tailored Trousers', 
      image: 'markus-winkler-PQmXUxmfR44-unsplash.jpg', 
      price: 150,
      category: 'bottoms'
    },
    { 
      id: 2, 
      title: 'Modern Signature T-Shirt', 
      image: 'andreea-pop-BZybQC-zZwQ-unsplash.jpg', 
      price: 80,
      category: 'tops'
    },
    { 
      id: 3, 
      title: 'Limited Edition Jacket', 
      image: 'fujiphilm-ojZ4wJNUM5w-unsplash.jpg', 
      price: 250,
      category: 'outerwear'
    },
  ];

  // Filter products
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return a.title.localeCompare(b.title); // default: name
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (productData) => {
    addToCart(productData);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <>
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
                <button
                  onClick={handleViewCart}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                >
                  View Cart ({cartCount})
                </button>
              )}
            </div>
          </div>

          {/* Filters & Sorting */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <div>
                <label className="text-xs uppercase tracking-[0.45em] text-gray-500 block mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30 transition"
                >
                  <option value="all">All Items</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="outerwear">Outerwear</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-[0.45em] text-gray-500 block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30 transition"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-400">
              Showing {sortedProducts.length} of {products.length} items
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <article 
                  key={product.id} 
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition hover:border-white/20 cursor-pointer"
                >
                  <div 
                    className="aspect-[5/6] overflow-hidden bg-[#111]"
                    onClick={() => handleProductClick(product)}
                  >
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
                      onClick={() => handleProductClick(product)}
                      className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
                    >
                      Choose Options
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No products found in this category.</p>
              <button
                onClick={() => setFilterCategory('all')}
                className="inline-block rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        publicUrl={publicUrl}
      />
    </>
  );
};

export default Collection;