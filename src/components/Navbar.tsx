"use client";
import { useState } from 'react';
import { Menu, Search, X, CheckCircle2, ChevronDown } from 'lucide-react';

// Struktur Data dengan Submenu
const MENU_ITEMS = [
  { name: "Semua", sub: [] },
  { name: "Sembako", sub: ["Beras", "Minyak", "Gula", "Telur"] },
  { name: "Jajanan", sub: ["Snack", "Biskuit", "Permen"] },
  { name: "Minuman", sub: ["Air Mineral", "Kopi", "Teh", "Susu"] },
  { name: "Sabun", sub: ["Mandi", "Cuci Piring", "Deterjen"] },
];

export default function Navbar({ activeTab, setActiveTab, search, setSearch }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };

  const selectCategory = (cat: string) => {
    setActiveTab(cat);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Navbar (Tetap Sama) */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-50 h-[73px] flex items-center">
        <div className="px-5 w-full flex justify-between items-center relative">
          <div className="z-20">
            <button onClick={() => setIsOpen(true)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl active:scale-90 transition-all text-gray-800">
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-2 relative h-10">
            <h1 className={`text-sm font-black tracking-tighter text-gray-900 transition-all duration-300 ${isSearchOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
              SINAR<span className="text-orange-500 text-lg">.</span>PAGI
            </h1>
            <div className={`absolute inset-y-0 right-0 transition-all duration-500 ease-in-out bg-gray-100 rounded-xl flex items-center overflow-hidden ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
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

          <div className="z-20 ml-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-90 ${isSearchOpen ? 'bg-gray-200 text-gray-500' : 'bg-gray-50 text-gray-800'}`}>
              {isSearchOpen ? <X size={20} strokeWidth={2.5} /> : <Search size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]" onClick={() => setIsOpen(false)} />}

      {/* Sidebar Panel dengan Submenu */}
      <aside className={`fixed top-2 left-2 bottom-2 w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out p-6 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} rounded-[2.5rem]`}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-black text-2xl text-gray-800 uppercase tracking-tight">Menu</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Pilih kategori</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full text-gray-400"><X size={18} /></button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <button
                onClick={() => item.sub.length > 0 ? toggleSubmenu(item.name) : selectCategory(item.name)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === item.name || expandedMenu === item.name
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.name}
                  {activeTab === item.name && <CheckCircle2 size={14} strokeWidth={3} />}
                </span>
                {item.sub.length > 0 && (
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${expandedMenu === item.name ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {/* Elemen Submenu */}
              <div className={`overflow-hidden transition-all duration-300 px-4 space-y-1 ${
                expandedMenu === item.name ? 'max-h-60 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
              }`}>
                {item.sub.map((subItem) => (
                  <button
                    key={subItem}
                    onClick={() => selectCategory(subItem)}
                    className="w-full text-left p-3 text-xs font-semibold text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                  >
                    • {subItem}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
