import React, { useState, useEffect } from 'react';
import Quote from './components/Quote';
import SEO from './components/SEO';
import {
  AppContainer,
  GlobalStyle,
  Header,
  Title,
  Subtitle,
  MainContent,
  Footer
} from './components/styled';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 添加页面加载动画
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);

    // 添加响应式处理
    const handleResize = () => {
      // 添加设备类型的类名
      if (window.innerWidth <= 575) {
        document.body.classList.add('mobile-xs');
        document.body.classList.remove('mobile-sm', 'tablet', 'desktop');
      } else if (window.innerWidth <= 767) {
        document.body.classList.add('mobile-sm');
        document.body.classList.remove('mobile-xs', 'tablet', 'desktop');
      } else if (window.innerWidth <= 991) {
        document.body.classList.add('tablet');
        document.body.classList.remove('mobile-xs', 'mobile-sm', 'desktop');
      } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile-xs', 'mobile-sm', 'tablet');
      }

      // 添加横屏/竖屏类名
      if (window.innerHeight < window.innerWidth) {
        document.body.classList.add('landscape');
        document.body.classList.remove('portrait');
      } else {
        document.body.classList.add('portrait');
        document.body.classList.remove('landscape');
      }
    };

    // 初始化时调用一次
    handleResize();

    // 添加事件监听
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <>
      <SEO
        title="毒鸡汤 - 有毒但有道理的心灵鸡汤 | 安慰文案 | 疯狂星期四文案"
        description="毒鸡汤、安慰文案、疯狂星期四文案，一网打尽，每日更新，治愈你的心灵"
        keywords="毒鸡汤,心灵鸡汤,安慰文案,疯狂星期四,肯德基文案,KFC文案,心灵治愈,文案生成,毒鸡汤网站"
      />
      <GlobalStyle />
      <AppContainer className={mounted ? 'mounted' : ''}>
        <Header>
          <Title>毒鸡汤</Title>
          <Subtitle>毒鸡汤、安慰文案、疯狂星期四，一网打尽</Subtitle>
        </Header>
        <MainContent>
          <Quote />
        </MainContent>
        <Footer>
          <div>
            &copy; {new Date().getFullYear()} 毒鸡汤 - 做更好的自己
          </div>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span>用 ❤️ 制作</span>
          </div>
        </Footer>
      </AppContainer>
    </>
  )
}

export default App
