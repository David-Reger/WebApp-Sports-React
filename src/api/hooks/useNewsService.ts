import { useQuery } from '@tanstack/react-query';
import { fetchNewsHeadlines } from '../services/newsService';

export const useNewsHeadlines = () => {
  return useQuery({
    queryKey: ['news', 'top-headlines'],
    queryFn: fetchNewsHeadlines,
    // Keep data fresh for 5 minutes
    staleTime: 1000 * 60 * 5,
  });
};
