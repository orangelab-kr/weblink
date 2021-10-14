import { useLocation } from 'react-router';

export const useQuery = () =>
  Object.fromEntries(new URLSearchParams(useLocation().search));
