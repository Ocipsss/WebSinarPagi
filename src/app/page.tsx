"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const DUMMY_PRODUCTS = [
  { id: 1, name: "Beras Cianjur 1kg", price: 15000, cat: "Sembako" },
  { id: 2, name: "Minyak Goreng 1L", price: 18000, cat: "Sembako" },
  { id: 3, name: "Chiki Balls Keju", price: 2000, cat: "Jajanan" },
  { id: 4, name: "Teh Kotak 200ml", price: 5000, cat: "Minuman" },
  { id: 5, name: "Sabun Batang Lux", price: 4000, cat: "Sabun" },
  { id: 6, name: "Indomie Goreng", price: 3500, cat: "Sembako" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredProducts = DUMMY_PRODUCTS.filter(p => {
    const matchCat = activeTab === "Semua" || p.cat === activeTab;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      {/* Search state sekarang dikelola bersama Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        search={search} 
        setSearch={setSearch} 
      />

      {/* Banner Promo - Sekarang langsung di atas */}
      <div className="p-4 mt-2">
        <div className="bg-gradient-to-br from-gray-800 to-black rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">Limited Offer</p>
            <h2 className="text-2xl font-black mt-1 text-white">Warung Berkah 🏠</h2>
            <p className="text-xs mt-1 opacity-70 font-medium italic">"{activeTab}" sedang diskon hari ini!</p>
          </div>
          <div className="absolute -right-6 -top-6 text-8xl opacity-10 -rotate-12">⭐</div>
        </div>
      </div>

      {/* Grid Katalog */}
      <div className="px-4 mt-2">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-2 text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 text-sm font-medium italic">Barang tidak ditemukan...</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-40">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex justify-between items-center border border-white">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Belanja</p>
            <p className="font-black text-gray-900 text-xl tracking-tight leading-none">Rp 33.000</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3.5 rounded-2xl font-black text-xs text-white uppercase tracking-widest shadow-lg shadow-orange-200 active:scale-95 transition-all">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
