import React, { useEffect, useState } from 'react';
import { fetchQuote, QuoteResponse } from '../services/quoteService';
import {
  QuoteCard,
  QuoteText,
  QuoteId,
  Button,
  LoadingSpinner,
  ErrorMessage
} from './styled';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const newQuote = await fetchQuote();
      setQuote(newQuote);
    } catch (err) {
      setError('获取鸡汤失败，请稍后再试！');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <>
        <ErrorMessage>{error}</ErrorMessage>
        <Button onClick={getNewQuote}>重试</Button>
      </>
    );
  }

  return (
    <>
      {quote && (
        <QuoteCard>
          <QuoteText>
            {/* Handle different possible response formats */}
            {quote.data?.content?.content ||
             quote.content ||
             quote.hitokoto ||
             quote.text ||
             '暂无鸡汤可供'}
          </QuoteText>
          <QuoteId>
            #{quote.data?.content?.id ||
               quote.id ||
               '未知'}
          </QuoteId>
        </QuoteCard>
      )}
      <Button onClick={getNewQuote}>再来一碗</Button>
    </>
  );
};

export default Quote;
