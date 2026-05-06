import Header from './components/header/Header';
import NewsDashboard from './components/dashboards/Home';

function App() {
  return (
    <>
      <Header />
      <NewsDashboard />
      <Connection />
    </>
  );
}

const Connection = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="my-8 px-6 py-3 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
        <p className="text-emerald-400 font-mono text-1xl">
          Status: Connected to Vite
        </p>
      </div>
    </div>
  );
};

export default App;
