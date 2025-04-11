import React, { useState, useEffect } from 'react';
import Quote from './components/Quote';
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

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyle />
      <AppContainer className={mounted ? 'mounted' : ''}>
        <Header>
          <Title>毒鸡汤</Title>
          <Subtitle>有毒，但是很有道理</Subtitle>
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
