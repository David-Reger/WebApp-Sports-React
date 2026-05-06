import { useQuery } from '@tanstack/react-query';
import { fetchTopHeadlines } from '../services/espnService';

export const useTopHeadlines = () => {
  return useQuery({
    queryKey: ['news', 'top-headlines'],
    queryFn: fetchTopHeadlines,
    // Keep data fresh for 5 minutes
    staleTime: 1000 * 60 * 5, 
  });
};