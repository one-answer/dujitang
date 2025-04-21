import api from './api';

export interface ComfortQuoteResponse {
  anwei: string;
}

export const fetchComfortQuote = async (): Promise<ComfortQuoteResponse> => {
  try {
    const response = await fetch('https://v.api.aa1.cn/api/api-wenan-anwei/index.php?type=json');
    const text = await response.text();

    // 从返回的文本中提取JSON部分
    // 查找最后一个包含"anwei"的JSON对象
    const jsonMatch = text.match(/\{"anwei":"[^"]+"\}(?=[^\{]*$)/);

    if (jsonMatch && jsonMatch[0]) {
      try {
        // 解析提取出的JSON字符串
        const data = JSON.parse(jsonMatch[0]);
        return data;
      } catch (jsonError) {
        console.error('Error parsing JSON from response:', jsonError);
        // 如果解析失败，返回一个默认值
        return { anwei: '生活的真谛是：接受生活中的不完美，但仍心怀希望。' };
      }
    } else {
      console.error('Could not find anwei JSON in response');
      // 如果找不到匹配的JSON，返回一个默认值
      return { anwei: '放下过去，活在当下，憧憬未来。' };
    }
  } catch (error) {
    console.error('Error fetching comfort quote:', error);
    // 如果请求失败，返回一个默认值
    return { anwei: '困难只是暂时的，坚持下去，阳光总会到来。' };
  }
};
