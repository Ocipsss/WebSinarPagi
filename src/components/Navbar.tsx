export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-5 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-black tracking-tighter text-orange-600">
          WARUNG<span className="text-gray-800">DIGITAL</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-medium tracking-wide">Buka 08:00 - 21:00</p>
      </div>
      <div className="flex gap-4 items-center">
        <button className="relative p-2 bg-gray-50 rounded-full">
          <span className="text-xl">🛒</span>
          <span className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
            2
          </span>
        </button>
      </div>
    </nav>
  );
}
