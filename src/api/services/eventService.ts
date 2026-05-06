// Use the 'site' API instead of 'core' for scoreboards
const SCOREBOARD_API = 'https://site.api.espn.com/apis/site/v2/sports';

export const fetchEvents = async (sport: string, league: string) => {
  const today = new Date().toISOString().split('T')[0].replaceAll('-', '');

  const response = await fetch(
    `${SCOREBOARD_API}/${sport}/${league}/scoreboard?dates=${today}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  // In the scoreboard API, games are inside the 'events' array
  return data.events.map((event: any) => ({
    id: event.id,
    name: event.name,
    shortName: event.shortName,
    date: event.date,
    status: event.status.type.shortDetail,
    // Extracting scores and teams
    homeTeam: event.competitions[0].competitors.find(
      (c: any) => c.homeAway === 'home'
    ),
    awayTeam: event.competitions[0].competitors.find(
      (c: any) => c.homeAway === 'away'
    ),
  }));
};
