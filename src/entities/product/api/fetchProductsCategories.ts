import apiClient from '@/shared/api/apiClient';
import type { CategoryParam } from '@/shared/types/category.types';

type ProductsCategoriesResponse = {
  data: {
    categories: CategoryParam[];
  };
};

export const fetchProductsCategoriesInfo = async (): Promise<CategoryParam[]> => {
  const response = await apiClient.get<ProductsCategoriesResponse>('/products/info');

  return response.data.data.categories;
};
