// 각 구독의 혜택 정보
export interface ProductPlanDto {
  id: number;
  name: string;
  price: number;
  benefit: string;
}

export interface ProductPlansDto {
  status: number;
  code: string;
  message: string;
  data: {
    plans: ProductPlanDto[];
  };
}

// 요금제 상세 정보
export interface PlanDto {
  planId: number;
  planName: string;
  benefit: string;
}

// 구독 비교 결과로 반환되는 개별 상품 정보
export interface ProductComparisonDto {
  id: number;
  name: string;
  imageUrl: string;
  planId: number; // 사용자가 선택한 요금제 ID
  benefit: string; // 사용자가 선택한 요금제 혜택
  plans: PlanDto[]; // 해당 서비스의 전체 요금제 목록
}

// 구독 비교 조회 API 응답 전체
export interface ProductsComparisonDto {
  statusCode: number;
  code: string;
  message: string;
  data: {
    products: ProductComparisonDto[];
  };
}

// 구독 서비스 목록의 개별 상품 정보
export interface ProductDto {
  productId: number;
  name: string;
  category: string;
  imageUrl: string;
  minPrice: number;
  maxPrice: number | null;
}

// 구독 서비스 전체 조회 API 응답 전체
export interface Products {
  status: number;
  code: string;
  message: string;
  data: {
    products: ProductDto[];
  };
}

// 프론트 도메인 모델
export interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  minPrice: number;
  maxPrice: number | null;
}
