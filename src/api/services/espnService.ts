// Base URL for ESPN's hidden but widely used public API
// const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports';
const NEWS_URL = 'https://now.core.api.espn.com/v1/sports/news';

export const fetchTopHeadlines = async () => {
  // We'll fetch NFL news as a baseline for your home screen
  const response = await fetch(`${NEWS_URL}?sport=baseball&limit=10`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  
  // ESPN's API returns a lot of nesting; we just want the articles
  return data.headlines.map((headline: any) => ({
    id: headline.id,
    headline: headline.headline,
    description: headline.description,
    section: headline.section,
    source: headline.source,
    image: headline.images?.[0]?.url || 'https://via.placeholder.com/1000x600?text=No+Image'
  }));
};