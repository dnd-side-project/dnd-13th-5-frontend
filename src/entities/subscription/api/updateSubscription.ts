// src/entities/subscription/api/updateSubscription.ts
import apiClient from '@/shared/api/apiClient';

export type UpdateSubscriptionPayload = {
  subscriptionId: number;
  planId: number;
  productName: string;
  price: number;
  participantCount: number;
  payCycleUnit: 'WEEK' | 'MONTH' | 'YEAR';
  startedAt: string | null;
  paymentMethodId: number;
  memo: string;
};

export type UpdateSubscriptionResponse = {
  status: number;
  code: string;
  message: string;
  data: string;
};

export const updateSubscription = async (
  payload: UpdateSubscriptionPayload,
): Promise<UpdateSubscriptionResponse> => {
  const { subscriptionId, ...updateData } = payload;

  const response = await apiClient.patch(`/subscriptions/${subscriptionId}`, updateData);
  return response.data;
};
