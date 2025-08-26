import type { Products } from '@/entities/product/api/fetchProducts';
import apiClient from '@/shared/api/apiClient';
import type { CategoryOption } from '@/shared/types/category.types';

type RecommendationsResponse = {
  data: {
    products: Products[];
  };
};

export const fetchProductsRecommendations = async (query: CategoryOption): Promise<Products[]> => {
  const response = await apiClient.get<RecommendationsResponse>(`/products/recommendations`, {
    params: { productId: query },
  });

  return response.data.data.products;
};
