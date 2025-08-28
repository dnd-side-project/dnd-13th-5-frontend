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

export const fetchPlans = async (productId: number): Promise<Plans[]> => {
  const response = await apiClient.get<PlansResponse>(`/products/${productId}/plans`);

  return response.data.data.plans;
};
