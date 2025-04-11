import React from 'react';
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
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>毒鸡汤</Title>
          <Subtitle>有毒，但是很有道理</Subtitle>
        </Header>
        <MainContent>
          <Quote />
        </MainContent>
        <Footer>
          &copy; {new Date().getFullYear()} 毒鸡汤 - 做更好的自己
        </Footer>
      </AppContainer>
    </>
  )
}

export default App
