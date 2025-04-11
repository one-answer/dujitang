import api from './api';

// Define a flexible response interface that can handle different API formats
export interface QuoteResponse {
  // Original API format
  data?: {
    content?: {
      id?: number;
      content?: string;
      created_at?: string;
      updated_at?: string;
    }
  };
  status?: number;
  msg?: string;

  // New API format (assuming it might be different)
  id?: number;
  content?: string;
  hitokoto?: string; // Some APIs use this field for the quote content
  text?: string;     // Some APIs use this field for the quote content
  created_at?: string;
  updated_at?: string;
}

export const fetchQuote = async (): Promise<QuoteResponse> => {
  try {
    const response = await api.get<QuoteResponse>('/api/jitang');
    return response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
