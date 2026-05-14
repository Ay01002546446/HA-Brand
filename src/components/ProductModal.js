import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ProductModal = ({ product, isOpen, onClose, onAddToCart, publicUrl }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Steel'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    onAddToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    // Reset modal
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-2xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 z-10 float-right text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/5"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 space-y-6 text-white">
            {/* Product Header */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Iconic Collection</p>
                <h2 className="text-3xl font-black mt-2">{product.title}</h2>
              </div>
            </div>

            {/* Product Image */}
            {product.image && (
              <div className="rounded-xl overflow-hidden bg-white/5">
                <img
                  src={`${publicUrl}/images/${product.image}`}
                  alt={product.title}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}

            {/* Product Description */}
            <p className="text-gray-300 leading-relaxed">
              Precision tailoring, strong lines and premium fabric. The perfect addition to your wardrobe.
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Price per item</span>
              <span className="text-3xl font-black text-white">${product.price}</span>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">Select Size *</label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg font-semibold transition ${
                      selectedSize === size
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">Select Color *</label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-3 rounded-lg font-semibold transition text-sm ${
                      selectedColor === color
                        ? 'bg-white text-black ring-2 ring-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-4 bg-white/5 rounded-lg p-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-white/10 rounded transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 bg-transparent text-center font-semibold outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-white/10 rounded transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Selected Summary */}
            {selectedSize && selectedColor && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-green-400">
                  ✓ {selectedSize} / {selectedColor} • Qty: {quantity} • Total: ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-white/20 text-white font-semibold py-3 rounded-full hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
