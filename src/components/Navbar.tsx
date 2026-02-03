"use client";
import { useState } from 'react';

const CATEGORIES = ["Semua", "Sembako", "Jajanan", "Minuman", "Sabun"];

export default function Navbar({ activeTab, setActiveTab, search, setSearch }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const selectCategory = (cat: string) => {
    setActiveTab(cat);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-50">
        <div className="px-5 py-4 flex justify-between items-center">
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl active:scale-90 transition-all"
          >
            <span className="text-xl">☰</span>
          </button>
          
          <h1 className="text-sm font-black tracking-tighter text-gray-900">
            WARUNG<span className="text-orange-500 text-lg">.</span>BERKAH
          </h1>

          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
              isSearchOpen ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-gray-50 text-gray-800'
            }`}
          >
            <span className="text-lg">{isSearchOpen ? '✕' : '🔍'}</span>
          </button>
        </div>

        {/* Dynamic Search Bar (Muncul saat icon diklik) */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${isSearchOpen ? 'max-h-20 border-b border-gray-100 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-5 pb-4">
            <div className="relative">
              <input 
                autoFocus
                type="text" 
                value={search}
                placeholder={`Cari di ${activeTab.toLowerCase()}...`}
                className="w-full bg-gray-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-3 text-gray-400 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay & Panel (Tetap sama dengan sedikit penyesuaian warna) */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]" onClick={() => setIsOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out p-6 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-black text-2xl text-gray-800">Kategori</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Pilih kebutuhanmu</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-300">✕</button>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === cat ? 'bg-orange-500 text-white shadow-xl shadow-orange-100' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span>{cat}</span>
              {activeTab === cat && <span className="text-[10px]">●</span>}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
