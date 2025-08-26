import type { Plans } from '@/entities/product/api/fetchPlans';
import apiClient from '@/shared/api/apiClient';

export type ProductsInfo = {
  id: number;
  name: string;
  imageUrl: string;
  plans: Plans[];
};

type ProductsInfoResponse = {
  data: {
    products: ProductsInfo[];
  };
};

export const fetchProductsInfo = async (query: number[]): Promise<ProductsInfo[]> => {
  const response = await apiClient.get<ProductsInfoResponse>('/products/info', {
    params: { productIds: query },
  });

  return response.data.data.products;
};
