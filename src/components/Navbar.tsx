"use client";
import { useState } from 'react';
import { Menu, Search, X, CheckCircle2 } from 'lucide-react'; // Import ikon Lucide

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
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-50 h-[73px] flex items-center">
        <div className="px-5 w-full flex justify-between items-center relative">
          
          {/* 1. Burger Menu (Sisi Kiri) */}
          <div className="z-20">
            <button 
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl active:scale-90 transition-all text-gray-800"
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
          
          {/* 2. Area Tengah: Logo & Search Input */}
          <div className="flex-1 flex items-center justify-center px-2 relative h-10">
            
            <h1 className={`text-sm font-black tracking-tighter text-gray-900 transition-all duration-300 ${
              isSearchOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
            }`}>
              SINAR<span className="text-orange-500 text-lg">.</span>PAGI
            </h1>

            <div className={`absolute inset-y-0 right-0 transition-all duration-500 ease-in-out bg-gray-100 rounded-xl flex items-center overflow-hidden ${
              isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}>
              <input 
                autoFocus={isSearchOpen}
                type="text" 
                value={search}
                placeholder={`Cari di ${activeTab.toLowerCase()}...`}
                className="bg-transparent border-none text-sm px-4 w-full outline-none text-gray-800"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Tombol Search / Close (Sisi Kanan) */}
          <div className="z-20 ml-2">
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearch(""); 
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                isSearchOpen ? 'bg-gray-200 text-gray-500' : 'bg-gray-50 text-gray-800'
              }`}
            >
              {isSearchOpen ? (
                <X size={20} strokeWidth={2.5} />
              ) : (
                <Search size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <aside className={`fixed top-2 left-2 bottom-2 w-64 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out p-6 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } rounded-[2.5rem]`}>

        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-black text-2xl text-gray-800 uppercase tracking-tight">Menu</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Pilih kebutuhanmu</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
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
              {activeTab === cat && <CheckCircle2 size={16} strokeWidth={3} />}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
