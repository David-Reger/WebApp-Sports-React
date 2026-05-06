import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../services/eventService';

export const useEvents = (
  sport: string = 'baseball',
  league: string = 'mlb'
) => {
  return useQuery({
    queryKey: ['scoreboard', sport, league], // Changed to 'scoreboard'
    queryFn: () => fetchEvents(sport, league),
    staleTime: 1000 * 60 * 2, // Sports scores change fast, maybe 2 mins?
    refetchInterval: 1000 * 60 * 2, // Auto-refresh every 2 minutes
  });
};
