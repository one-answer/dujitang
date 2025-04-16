import React, { useEffect, useState } from 'react';
import { fetchQuote, QuoteResponse } from '../services/quoteService';
import { fetchFunnyQuote, FunnyQuoteResponse } from '../services/funnyQuoteService';
import { fetchKFCQuote, KFCQuoteResponse } from '../services/kfcQuoteService';
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
  const [kfcQuote, setKFCQuote] = useState<KFCQuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [quoteType, setQuoteType] = useState<'poison' | 'funny' | 'kfc'>('poison'); // 默认显示毒鸡汤

  const getNewQuote = async () => {
    setIsRefreshing(true);
    setError(null);

    if ((!quote && quoteType === 'poison') || (!funnyQuote && quoteType === 'funny') || (!kfcQuote && quoteType === 'kfc')) {
      setLoading(true);
    }

    try {
      if (quoteType === 'poison') {
        const newQuote = await fetchQuote();
        setQuote(newQuote);
      } else if (quoteType === 'funny') {
        const newFunnyQuote = await fetchFunnyQuote();
        setFunnyQuote(newFunnyQuote);
      } else if (quoteType === 'kfc') {
        const newKFCQuote = await fetchKFCQuote();
        setKFCQuote(newKFCQuote);
      }
    } catch (err) {
      let errorMessage = '获取数据失败，请稍后再试！';
      if (quoteType === 'poison') {
        errorMessage = '获取鸡汤失败，请稍后再试！';
      } else if (quoteType === 'funny') {
        errorMessage = '获取搞笑文案失败，请稍后再试！';
      } else if (quoteType === 'kfc') {
        errorMessage = '获取疯狂星期四文案失败，请稍后再试！';
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // 切换毒鸡汤、搞笑文案和疯狂星期四文案
  const setQuoteTypeAndLoad = (type: 'poison' | 'funny' | 'kfc') => {
    setQuoteType(type);

    // 如果切换到的类型还没有数据，则加载新数据
    if ((type === 'poison' && !quote) || (type === 'funny' && !funnyQuote) || (type === 'kfc' && !kfcQuote)) {
      setTimeout(() => getNewQuote(), 0);
    }
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
    } else if (quoteType === 'funny') {
      const funnyText = funnyQuote?.msg || '暂无搞笑文案可供';
      // 创建分享内容
      shareText = `【搞笑文案】${funnyText} - 来自毒鸡汤网站`;
    } else if (quoteType === 'kfc') {
      const kfcText = kfcQuote?.data || '暂无疯狂星期四文案可供';
      // 创建分享内容
      shareText = `【疯狂星期四】${kfcText} - 来自毒鸡汤网站`;
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

    // 预加载其他类型的文案，但不显示
    const preloadOtherQuotes = async () => {
      try {
        // 预加载搞笑文案
        const newFunnyQuote = await fetchFunnyQuote();
        setFunnyQuote(newFunnyQuote);

        // 预加载疯狂星期四文案
        const newKFCQuote = await fetchKFCQuote();
        setKFCQuote(newKFCQuote);
      } catch (err) {
        console.error('Preloading other quotes failed:', err);
      }
    };

    // 延迟加载其他文案，以便先显示毒鸡汤
    const timer = setTimeout(() => {
      preloadOtherQuotes();
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
          onClick={() => quoteType !== 'poison' && setQuoteTypeAndLoad('poison')}
        >
          毒鸡汤
        </ToggleButton>
        <ToggleButton
          active={quoteType === 'funny'}
          onClick={() => quoteType !== 'funny' && setQuoteTypeAndLoad('funny')}
        >
          搞笑文案
        </ToggleButton>
        <ToggleButton
          active={quoteType === 'kfc'}
          onClick={() => quoteType !== 'kfc' && setQuoteTypeAndLoad('kfc')}
        >
          疯狂星期四
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

      {quoteType === 'kfc' && kfcQuote && (
        <QuoteCard>
          <QuoteText>
            {kfcQuote.data || '暂无疯狂星期四文案可供'}
          </QuoteText>
          <QuoteId>
            疯狂星期四
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
          {isSharing ? '分享中...' :
           quoteType === 'poison' ? '分享鸡汤 👌' :
           quoteType === 'funny' ? '分享文案 👌' :
           '分享星期四 👌'}
        </ShareButton>
      </div>
    </>
  );
};

export default Quote;
