import api from './api';

export interface FunnyQuoteResponse {
  msg: string;
}

export const fetchFunnyQuote = async (): Promise<FunnyQuoteResponse> => {
  try {
    const response = await fetch('https://zj.v.api.aa1.cn/api/wenan-gaoxiao/?type=json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching funny quote:', error);
    throw error;
  }
};
