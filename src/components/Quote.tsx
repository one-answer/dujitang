import React, { useEffect, useState } from 'react';
import { fetchQuote, QuoteResponse } from '../services/quoteService';
import { fetchComfortQuote, ComfortQuoteResponse } from '../services/comfortQuoteService';
import { fetchKFCQuote, KFCQuoteResponse } from '../services/kfcQuoteService';
import SEO from './SEO';
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
  const [comfortQuote, setComfortQuote] = useState<ComfortQuoteResponse | null>(null);
  const [kfcQuote, setKFCQuote] = useState<KFCQuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [quoteType, setQuoteType] = useState<'poison' | 'comfort' | 'kfc'>('poison'); // 默认显示毒鸡汤

  const getNewQuote = async () => {
    setIsRefreshing(true);
    setError(null);

    if ((!quote && quoteType === 'poison') || (!comfortQuote && quoteType === 'comfort') || (!kfcQuote && quoteType === 'kfc')) {
      setLoading(true);
    }

    try {
      if (quoteType === 'poison') {
        const newQuote = await fetchQuote();
        setQuote(newQuote);
      } else if (quoteType === 'comfort') {
        const newComfortQuote = await fetchComfortQuote();
        setComfortQuote(newComfortQuote);
      } else if (quoteType === 'kfc') {
        const newKFCQuote = await fetchKFCQuote();
        setKFCQuote(newKFCQuote);
      }
    } catch (err) {
      let errorMessage = '获取数据失败，请稍后再试！';
      if (quoteType === 'poison') {
        errorMessage = '获取鸡汤失败，请稍后再试！';
      } else if (quoteType === 'comfort') {
        errorMessage = '获取安慰文案失败，请稍后再试！';
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

  // 切换毒鸡汤、安慰文案和疯狂星期四文案
  const setQuoteTypeAndLoad = (type: 'poison' | 'comfort' | 'kfc') => {
    setQuoteType(type);

    // 如果切换到的类型还没有数据，则加载新数据
    if ((type === 'poison' && !quote) || (type === 'comfort' && !comfortQuote) || (type === 'kfc' && !kfcQuote)) {
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
      shareText = `【毒鸡汤】${quoteText} - 来自 https://djt.aolifu.org`;
    } else if (quoteType === 'comfort') {
      const comfortText = comfortQuote?.anwei || '暂无安慰文案可供';
      // 创建分享内容
      shareText = `【安慰文案】${comfortText} - 来自 https://djt.aolifu.org`;
    } else if (quoteType === 'kfc') {
      const kfcText = kfcQuote?.data || '暂无疯狂星期四文案可供';
      // 创建分享内容
      shareText = `【疯狂星期四】${kfcText} - 来自 https://djt.aolifu.org`;
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
        // 预加载安慰文案
        const newComfortQuote = await fetchComfortQuote();
        setComfortQuote(newComfortQuote);

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

  // 获取当前显示的引用内容
  const getCurrentQuoteContent = () => {
    if (quoteType === 'poison' && quote) {
      return quote.data?.content?.content || quote.content || quote.hitokoto || quote.text || '';
    } else if (quoteType === 'comfort' && comfortQuote) {
      return comfortQuote.anwei || '';
    } else if (quoteType === 'kfc' && kfcQuote) {
      return kfcQuote.data || '';
    }
    return '';
  };

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

  // 获取当前引用内容用于SEO
  const currentQuoteContent = getCurrentQuoteContent();

  // 根据引用类型生成SEO标题
  const getSEOTitle = () => {
    if (quoteType === 'poison') {
      return `毒鸡汤 - ${currentQuoteContent.substring(0, 20)}... | 有毒但有道理的心灵鸡汤`;
    } else if (quoteType === 'comfort') {
      return `安慰文案 - ${currentQuoteContent.substring(0, 20)}... | 毒鸡汤网站`;
    } else if (quoteType === 'kfc') {
      return `疯狂星期四文案 - ${currentQuoteContent.substring(0, 20)}... | 毒鸡汤网站`;
    }
    return '毒鸡汤 - 有毒但有道理的心灵鸡汤 | 安慰文案 | 疯狂星期四文案';
  };

  return (
    <>
      {/* 动态SEO更新 */}
      <SEO
        title={getSEOTitle()}
        quoteType={quoteType}
        quoteContent={currentQuoteContent}
      />
      <ToggleContainer>
        <ToggleButton
          active={quoteType === 'poison'}
          onClick={() => quoteType !== 'poison' && setQuoteTypeAndLoad('poison')}
        >
          毒鸡汤
        </ToggleButton>
        <ToggleButton
          active={quoteType === 'comfort'}
          onClick={() => quoteType !== 'comfort' && setQuoteTypeAndLoad('comfort')}
        >
          安慰文案
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

      {quoteType === 'comfort' && comfortQuote && (
        <QuoteCard>
          <QuoteText>
            {comfortQuote.anwei || '暂无安慰文案可供'}
          </QuoteText>
          <QuoteId>
            安慰文案
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
           quoteType === 'comfort' ? '分享安慰 👌' :
           '分享星期四 👌'}
        </ShareButton>
      </div>
    </>
  );
};

export default Quote;
