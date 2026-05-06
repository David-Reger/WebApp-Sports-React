const Navbar = () => {
  const sports = ['Baseball', 'Basketball', 'Football', 'Golf', 'Hockey'];

  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-white tracking-tighter">
          SPORTS
          <span className="text-sky-500">
            <i>APP</i>
          </span>
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          {sports.map((sport) => (
            <a
              key={sport}
              href={`/${sport.toLowerCase()}`}
              className="text-slate-300 hover:text-sky-400 transition-all font-medium text-sm duration-250 hover:scale-110 border-b-2 border-transparent hover:border-sky-400"
            >
              {sport}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-bold transition-all">
          LIVE SCORES
        </button>
      </div>
    </header>
  );
};

export default Navbar;
