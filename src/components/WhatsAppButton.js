import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = '201015678900'; // ضع رقمك هنا مع كود الدولة
  const message = "مرحباً بك في HA - Premium Men's Fashion";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 ${
        isHovered ? 'translate-y-0' : 'translate-y-0'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2.5 22l5.71-.97C8.99 22.63 10.45 23 12 23c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.49.49-2.89-.15-.28C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.3-12.3c-.3-.3-.78-.3-1.08 0l-1.5 1.5c-.3.3-.3.78 0 1.08l1.08 1.08c.3.3.3.78 0 1.08l-2.16 2.16c-.3.3-.78.3-1.08 0l-1.08-1.08c-.3-.3-.78-.3-1.08 0l-1.5-1.5c-.3-.3-.3-.78 0-1.08l1.08-1.08c.3-.3.3-.78 0-1.08l-2.16-2.16c-.3-.3-.3-.78 0-1.08l1.08-1.08c.3-.3.78-.3 1.08 0l1.5 1.5c.3.3.78.3 1.08 0l2.16-2.16c.3-.3.78-.3 1.08 0l1.08 1.08c.3.3.3.78 0 1.08z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;
