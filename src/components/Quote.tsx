import React, { useEffect, useState } from 'react';
import { fetchQuote, QuoteResponse } from '../services/quoteService';
import { fetchFunnyQuote, FunnyQuoteResponse } from '../services/funnyQuoteService';
import {
  QuoteCard,
  QuoteText,
  QuoteId,
  Button,
  LoadingSpinner,
  ErrorMessage,
  ShareButton,
  ToggleButton,
  ToggleContainer
} from './styled';

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [funnyQuote, setFunnyQuote] = useState<FunnyQuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [quoteType, setQuoteType] = useState<'poison' | 'funny'>('poison'); // 默认显示毒鸡汤

  const getNewQuote = async () => {
    setIsRefreshing(true);
    setError(null);

    if ((!quote && quoteType === 'poison') || (!funnyQuote && quoteType === 'funny')) {
      setLoading(true);
    }

    try {
      if (quoteType === 'poison') {
        const newQuote = await fetchQuote();
        setQuote(newQuote);
      } else {
        const newFunnyQuote = await fetchFunnyQuote();
        setFunnyQuote(newFunnyQuote);
      }
    } catch (err) {
      setError(quoteType === 'poison' ? '获取鸡汤失败，请稍后再试！' : '获取搞笑文案失败，请稍后再试！');
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // 切换毒鸡汤和搞笑文案
  const toggleQuoteType = () => {
    setQuoteType(prevType => {
      const newType = prevType === 'poison' ? 'funny' : 'poison';

      // 如果切换到的类型还没有数据，则加载新数据
      if ((newType === 'poison' && !quote) || (newType === 'funny' && !funnyQuote)) {
        setTimeout(() => getNewQuote(), 0);
      }

      return newType;
    });
  };

  const handleShare = () => {
    setIsSharing(true);

    let shareText = '';

    if (quoteType === 'poison') {
      const quoteText = quote?.data?.content?.content ||
                        quote?.content ||
                        quote?.hitokoto ||
                        quote?.text ||
                        '暂无鸡汤可供';
      // 创建分享内容
      shareText = `【毒鸡汤】${quoteText} - 来自毒鸡汤网站`;
    } else {
      const funnyText = funnyQuote?.msg || '暂无搞笑文案可供';
      // 创建分享内容
      shareText = `【搞笑文案】${funnyText} - 来自毒鸡汤网站`;
    }

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
    // 默认加载毒鸡汤
    getNewQuote();

    // 预加载搞笑文案，但不显示
    const preloadFunnyQuote = async () => {
      try {
        const newFunnyQuote = await fetchFunnyQuote();
        setFunnyQuote(newFunnyQuote);
      } catch (err) {
        console.error('Preloading funny quote failed:', err);
      }
    };

    // 延迟加载搞笑文案，以便先显示毒鸡汤
    const timer = setTimeout(() => {
      preloadFunnyQuote();
    }, 1000);

    return () => clearTimeout(timer);
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
      <ToggleContainer>
        <ToggleButton
          active={quoteType === 'poison'}
          onClick={() => quoteType !== 'poison' && toggleQuoteType()}
        >
          毒鸡汤
        </ToggleButton>
        <ToggleButton
          active={quoteType === 'funny'}
          onClick={() => quoteType !== 'funny' && toggleQuoteType()}
        >
          搞笑文案
        </ToggleButton>
      </ToggleContainer>

      {quoteType === 'poison' && quote && (
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

      {quoteType === 'funny' && funnyQuote && (
        <QuoteCard>
          <QuoteText>
            {funnyQuote.msg || '暂无搞笑文案可供'}
          </QuoteText>
          <QuoteId>
            搞笑文案
          </QuoteId>
        </QuoteCard>
      )}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
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
          {isSharing ? '分享中...' : quoteType === 'poison' ? '分享鸡汤 👌' : '分享文案 👌'}
        </ShareButton>
      </div>
    </>
  );
};

export default Quote;
