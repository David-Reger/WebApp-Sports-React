import { useState, useEffect } from 'react';
import { useTopHeadlines } from '../../api/hooks/useSportsNews';

export const NewsCarousel = () => {
  const { data: articles, isLoading, isError } = useTopHeadlines();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    // Only start the timer if we actually have articles to show
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
  if (isLoading) {
    return (
      <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">
            Loading Latest Headlines...
          </p>
        </div>
      </div>
    );
  }

  // 2. Handle Error State
  if (isError || !articles) {
    return (
      <div className="relative h-96 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-red-900/50">
        <p className="text-red-400">
          Failed to fetch sports news. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-96 bg-slate-800 rounded-2xl overflow-hidden group">
      {/* Slides Wrapper */}
      <div
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {articles.map((news: any) => (
          <div key={news.id} className="min-w-full h-full relative">
            <img
              src={news.image}
              alt={news.headline}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute bottom-0 p-8 bg-linear-to-t from-slate-950 to-transparent w-full">
              <span className="bg-sky-500 text-xs font-bold px-2 py-1 rounded-sm uppercase mb-2 inline-block">
                {news.section}
              </span>
              <h2 className="text-2xl font-bold text-white max-w-2xl leading-tight">
                {news.title}
              </h2>
              {news.description && (
                <p className="text-slate-300 text-sm mt-2 line-clamp-2 max-w-xl">
                  {news.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        →
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {articles.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
