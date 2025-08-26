import apiClient from '@/shared/api/apiClient';

export type Plans = {
  id: number;
  name: string;
  price: number;
  benefit: string;
};

type PlansResponse = {
  data: {
    plans: Plans[];
  };
};

export const fetchPlans = async (query: number): Promise<Plans[]> => {
  const response = await apiClient.get<PlansResponse>('/plans', {
    params: { productId: query },
  });

  return response.data.data.plans;
};
