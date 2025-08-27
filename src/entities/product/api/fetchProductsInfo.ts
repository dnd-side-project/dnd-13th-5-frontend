import apiClient from '@/shared/api/apiClient';

type ProductPlan = {
  planId: number;
  planName: string;
  benefit: string;
};

export type ProductsInfo = {
  id: number;
  name: string;
  imageUrl: string;
  plans: ProductPlan[];
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
