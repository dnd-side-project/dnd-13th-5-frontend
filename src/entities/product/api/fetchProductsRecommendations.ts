import type { Products } from '@/entities/product/api/fetchProducts';
import apiClient from '@/shared/api/apiClient';
import type { CategoryParam } from '@/shared/types/category.types';

type RecommendationsResponse = {
  data: {
    products: Products[];
  };
};

export const fetchProductsRecommendations = async (query: CategoryParam): Promise<Products[]> => {
  const response = await apiClient.get<RecommendationsResponse>(`/products/recommendations`, {
    params: { category: query },
  });

  return response.data.data.products;
};
