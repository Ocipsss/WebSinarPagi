"use client";
import { useState, useEffect } from 'react';

export default function ProductCard({ name, price, cat }: any) {
  const [formattedPrice, setFormattedPrice] = useState("");

  useEffect(() => {
    // Memastikan format harga sesuai locale Indonesia setelah muncul di browser
    setFormattedPrice(price.toLocaleString('id-ID'));
  }, [price]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Area Gambar (Placeholder) */}
      <div className="h-36 bg-gray-100 relative flex items-center justify-center text-gray-300 font-medium text-[10px] uppercase tracking-tighter">
        Tanpa Foto
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] font-bold px-2 py-1 rounded-md text-orange-600 border border-orange-100 uppercase">
          {cat}
        </span>
      </div>
      
      {/* Konten Teks */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-700 line-clamp-2 leading-snug h-10">
          {name}
        </h3>
        <div className="mt-2">
          <p className="text-orange-600 font-black text-base">
            {formattedPrice ? `Rp ${formattedPrice}` : "..."}
          </p>
        </div>
        
        <button className="w-full mt-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white py-2 rounded-xl text-xs font-bold transition-all active:scale-90">
          TAMBAH
        </button>
      </div>
    </div>
  );
}
