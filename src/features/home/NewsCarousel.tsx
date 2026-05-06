import { useState, useEffect } from 'react';
import { useNewsHeadlines } from '../../api/hooks/useNewsService';
import { useEvents } from '../../api/hooks/useEventService';

export const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch News Data
  const {
    data: articles,
    isLoading: isNewsLoading,
    isError: isNewsError,
  } = useNewsHeadlines();

  // Fetch Scoreboard/Events Data
  const {
    data: events,
    isLoading: isEventsLoading,
    isError: isEventsError,
  } = useEvents('baseball', 'mlb');

  // Auto-slide logic
  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex, articles]);

  const nextSlide = () => {
    if (!articles) return;
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!articles) return;
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  // 1. Handle Loading State
  // We show a skeleton/pulse if either essential piece of data is still in flight
  if (isNewsLoading || isEventsLoading) {
    return (
      <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">Updating Sports Desk...</p>
        </div>
      </div>
    );
  }

  // 2. Handle Critical Error State
  // We only show the big error if the News fails, as that's the primary focus of this component
  if (isNewsError || !articles) {
    return (
      <div className="relative h-96 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-red-900/50">
        <p className="text-red-400 font-medium text-center px-6">
          System Timeout: Unable to fetch news headlines.
          <br />
          <span className="text-xs text-slate-500 uppercase mt-2 block">
            Check API Endpoint Configuration
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* --- Main Carousel --- */}
      <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden group shadow-2xl">
        <div
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article: any) => (
            <div key={article.id} className="min-w-full h-full relative">
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute bottom-0 p-10 bg-linear-to-t from-slate-950 via-slate-900/80 to-transparent w-full">
                <span className="bg-sky-600 text-[10px] font-black px-2 py-1 rounded-sm uppercase mb-3 inline-block tracking-widest text-white">
                  {article.section || 'Featured'}
                </span>
                <h2 className="text-3xl font-bold text-white max-w-3xl leading-tight tracking-tight">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="text-slate-300 text-sm mt-3 line-clamp-2 max-w-xl leading-relaxed">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-sky-600 text-white w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 flex items-center justify-center border border-white/10"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900/50 hover:bg-sky-600 text-white w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 flex items-center justify-center border border-white/10"
        >
          →
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-10 flex gap-2 z-10">
          {articles.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all rounded-full ${
                currentIndex === index ? 'bg-sky-500 w-8' : 'bg-white/20 w-3'
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- Scoreboard Debug View --- */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">
            Today&apos;s Games: <span className="text-slate-600 ml-2">|</span>{' '}
            <span className="text-sky-500 ml-2">MLB</span>
          </h3>
          {isEventsError && (
            <span className="text-[10px] text-red-500 font-bold uppercase">
              Update Failed
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events && events.length > 0 ? (
            events.map((event: any) => (
              <div
                key={event.id}
                className="bg-slate-900 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center hover:border-sky-500/50 transition-colors cursor-default"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[10px] font-bold w-6 uppercase">
                      {event.awayTeam.team.abbreviation}
                    </span>
                    <span className="text-white font-mono font-bold text-lg">
                      {event.awayTeam.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[10px] font-bold w-6 uppercase">
                      {event.homeTeam.team.abbreviation}
                    </span>
                    <span className="text-white font-mono font-bold text-lg">
                      {event.homeTeam.score}
                    </span>
                  </div>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <p className="text-sky-400 text-[10px] font-black uppercase tracking-tighter animate-pulse">
                    {event.status}
                  </p>
                  <p className="text-slate-600 text-[9px] mt-1 font-medium">
                    {event.shortName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
              <p className="text-slate-500 text-sm italic">
                No active matchups found for today.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
