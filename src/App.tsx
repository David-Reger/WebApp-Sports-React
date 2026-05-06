import Header from './components/header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
        <h1 className="text-4xl font-bold text-sky-400">
          Welcome to my Sports App: React + TypeScript + Vite + Tailwind CSS
        </h1>
        <p className="mt-4 text-2xl text-slate-400">
          Tailwind v4 is officially running in WSL2.
        </p>
        <div className="mt-8 p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
          <p className="text-emerald-400 font-mono text-4xl">
            Status: Connected to Vite
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
