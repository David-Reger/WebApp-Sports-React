const NEWS = 'https://now.core.api.espn.com/v1/sports/news';

export const fetchNewsHeadlines = async () => {
  const response = await fetch(`${NEWS}?sport=baseball&limit=10`);

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
    image:
      headline.images?.[0]?.url ||
      'https://via.placeholder.com/1000x600?text=No+Image',
  }));
};
