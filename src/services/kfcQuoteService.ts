import api from './api';

export interface KFCQuoteResponse {
  status: string;
  code: number;
  data: string;
}

export const fetchKFCQuote = async (): Promise<KFCQuoteResponse> => {
  try {
    const response = await fetch('https://tools.mgtv100.com/external/v1/pear/kfc');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching KFC quote:', error);
    throw error;
  }
};
