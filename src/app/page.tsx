"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ["Semua", "Sembako", "Jajanan", "Minuman", "Sabun"];

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
    <main className="min-h-screen bg-gray-50 pb-28">
      <Navbar />

      {/* Area Search */}
      <div className="bg-white px-5 py-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">Warung Berkah 🏠</h2>
        <div className="mt-3 relative">
          <input 
            type="text" 
            placeholder="Cari barang belanjaan..."
            className="w-full bg-gray-100 border-none rounded-2xl px-11 py-3.5 text-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-gray-400 text-sm">🔍</span>
        </div>
      </div>
      
      {/* Banner Promo */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-6 text-white shadow-lg shadow-orange-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Spesial Hari Ini</p>
          <h2 className="text-2xl font-black mt-1">Diskon Sembako</h2>
          <p className="text-xs mt-1 opacity-90 font-medium">Belanja hemat, dompet selamat!</p>
        </div>
      </div>

      {/* Kategori Tab */}
      <div className="flex overflow-x-auto gap-2 px-4 mb-6 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === cat 
                ? "bg-gray-900 text-white shadow-md shadow-gray-200" 
                : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Katalog */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium italic">Barang tidak ditemukan...</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Container */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-50">
        <div className="w-full max-w-md bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center border border-white/10">
          <div suppressHydrationWarning>
            <p className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Total Belanja</p>
            <p className="font-black text-orange-400 text-xl tracking-tight">Rp 33.000</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
