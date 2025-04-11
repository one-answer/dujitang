import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global styles
export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #ff4757;
    --secondary-color: #2f3542;
    --background-color: #f1f2f6;
    --text-color: #2f3542;
    --accent-color: #5352ed;
    --shadow-color: rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

// Container for the entire app
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

// Header component
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px var(--shadow-color);
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--secondary-color);
  opacity: 0.8;
`;

// Main content area
export const MainContent = styled.main`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Card animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Quote card
export const QuoteCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-shadow: 0 10px 20px var(--shadow-color);
  animation: ${fadeIn} 0.5s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px var(--shadow-color);
  }
`;

export const QuoteText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 500;
`;

export const QuoteId = styled.span`
  display: block;
  text-align: right;
  font-size: 0.9rem;
  color: var(--secondary-color);
  opacity: 0.6;
`;

// Button styles
export const Button = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px var(--shadow-color);
  
  &:hover {
    background-color: #4040e2;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px var(--shadow-color);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px var(--shadow-color);
  }
  
  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;

// Footer
export const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--secondary-color);
  opacity: 0.7;
`;

// Loading spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--accent-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;

// Error message
export const ErrorMessage = styled.div`
  color: var(--primary-color);
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 71, 87, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
`;
