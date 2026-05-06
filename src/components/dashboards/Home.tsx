import { NewsCarousel } from '../../features/home/NewsCarousel';

const NewsDashboard = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main News Section */}
        <section className="lg:col-span-2 space-y-6">
          <NewsCarousel />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-xs border border-slate-100"
              >
                <div className="h-32 bg-slate-100 rounded-lg mb-3" />
                <h3 className="font-bold text-slate-800">
                  Headline for Sports Story {i}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Scores Sidebar */}
        <aside className="space-y-4">
          <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest">
            Upcoming Matchups
          </h3>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-slate-50 p-4 rounded-xl flex justify-between items-center border border-slate-200"
            >
              <div className="text-sm font-bold">TEAM A</div>
              <div className="text-xs text-slate-400 font-mono">VS</div>
              <div className="text-sm font-bold">TEAM B</div>
            </div>
          ))}
        </aside>
      </main>
    </>
  );
};

export default NewsDashboard;
