import { useQuery } from '@tanstack/react-query';

import { fetchMySubscription, type FetchMySubscriptionParams } from '../api/fetchMySubscription';

export const useMySubscription = (params: FetchMySubscriptionParams) =>
  useQuery({
    queryKey: ['my-subscriptions', params.category, params.sort],
    queryFn: () => fetchMySubscription(params),
  });
