import React, { useEffect, useState } from 'react';
import { fetchQuote, QuoteResponse } from '../services/quoteService';
import {
  QuoteCard,
  QuoteText,
  QuoteId,
  Button,
  LoadingSpinner,
  ErrorMessage,
  ShareButton
} from './styled';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getNewQuote = async () => {
    setIsRefreshing(true);
    setError(null);

    if (!quote) setLoading(true);

    try {
      const newQuote = await fetchQuote();
      setQuote(newQuote);
    } catch (err) {
      setError('获取鸡汤失败，请稍后再试！');
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleShare = () => {
    setIsSharing(true);

    const quoteText = quote?.data?.content?.content ||
                      quote?.content ||
                      quote?.hitokoto ||
                      quote?.text ||
                      '暂无鸡汤可供';

    // 创建分享内容
    const shareText = `【毒鸡汤】${quoteText} - 来自毒鸡汤网站`;

    // 尝试使用 Web Share API
    if (navigator.share) {
      navigator.share({
        title: '毒鸡汤',
        text: shareText,
        url: window.location.href,
      })
      .then(() => console.log('分享成功'))
      .catch((error) => console.log('分享失败', error))
      .finally(() => setIsSharing(false));
    } else {
      // 回退到复制到剪贴板
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('已复制到剪贴板，快去分享吧！');
        })
        .catch((err) => {
          console.error('复制失败:', err);
          alert('复制失败，请手动复制。');
        })
        .finally(() => setIsSharing(false));
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
        <Button onClick={getNewQuote} disabled={isRefreshing}>
          {isRefreshing ? '加载中...' : '重试'}
        </Button>
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
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          onClick={getNewQuote}
          disabled={isRefreshing}
        >
          {isRefreshing ? '加载中...' : '再来一碗 ↻'}
        </Button>
        <ShareButton
          onClick={handleShare}
          disabled={isSharing}
        >
          {isSharing ? '分享中...' : '分享鸡汤 👌'}
        </ShareButton>
      </div>
    </>
  );
};

export default Quote;
