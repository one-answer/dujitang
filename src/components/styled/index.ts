import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global styles
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

  :root {
    --primary-color: #FF4D4D;
    --secondary-color: #2C3E50;
    --background-color: #ECF0F1;
    --text-color: #34495E;
    --accent-color: #3498DB;
    --accent-color-hover: #2980B9;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --card-bg: #FFFFFF;
    --card-bg-alt: #F8F9FA;
    --success-color: #2ECC71;
    --warning-color: #F39C12;
    --error-color: #E74C3C;
    --gradient-start: #6A11CB;
    --gradient-end: #2575FC;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans SC', 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
    color: var(--text-color);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    transition: opacity 0.5s ease;
    opacity: 0.4;

    &.loaded {
      opacity: 1;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  ::selection {
    background-color: var(--primary-color);
    color: white;
  }
`;

// App container animation
const fadeInApp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);

  &.mounted {
    animation: ${fadeInApp} 1s forwards ease-out;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Header component
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const titleAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  font-weight: 900;
  background: linear-gradient(90deg, #FF4D4D, #FF9F1C, #FFCC29, #3498DB, #6A11CB);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${titleAnimation} 10s ease infinite;
  text-shadow: none;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Main content area
export const MainContent = styled.main`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.5rem;
  }
`;

// Card animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
    box-shadow: 0 10px 20px var(--shadow-color);
  }
  50% {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px var(--shadow-color);
  }
  100% {
    transform: translateY(0px);
    box-shadow: 0 10px 20px var(--shadow-color);
  }
`;

// Quote card
export const QuoteCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.6s ease-out, ${float} 6s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.5);

  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 150px;
    color: rgba(0, 0, 0, 0.03);
    font-family: Georgia, serif;
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -100px;
    right: 20px;
    font-size: 150px;
    color: rgba(0, 0, 0, 0.03);
    font-family: Georgia, serif;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const QuoteText = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    font-size: 1.4rem;
    line-height: 1.6;
  }
`;

export const QuoteId = styled.span`
  display: block;
  text-align: right;
  font-size: 0.9rem;
  color: var(--secondary-color);
  opacity: 0.6;
  font-weight: 500;
  position: relative;
  z-index: 1;
  margin-top: 1rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
`;

// Button animation
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

// Button styles
export const Button = styled.button`
  background: linear-gradient(45deg, var(--accent-color), var(--accent-color-hover));
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: ${pulse} 2s infinite;
  letter-spacing: 1px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--accent-color-hover), var(--accent-color));
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 7px 20px rgba(52, 152, 219, 0.6);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
  }

  &:disabled {
    background: #b3b3b3;
    cursor: not-allowed;
    animation: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  }
`;

// Footer
export const Footer = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.9rem;
  color: white;
  opacity: 0.8;
  position: relative;
  z-index: 1;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  a {
    color: white;
    text-decoration: none;
    font-weight: 700;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: white;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

// Loading spinner animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite, ${breathe} 2s ease infinite;
  margin: 3rem auto;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

// Error message
export const ErrorMessage = styled.div`
  color: white;
  text-align: center;
  padding: 1.5rem;
  background-color: rgba(231, 76, 60, 0.2);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  width: 100%;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(231, 76, 60, 0.3);
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.2);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '⚠️';
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

// Share button
export const ShareButton = styled(Button)`
  background: linear-gradient(45deg, #25D366, #128C7E);
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  animation: none;

  &::before {
    background: linear-gradient(45deg, #128C7E, #25D366);
  }

  &:hover {
    box-shadow: 0 7px 20px rgba(37, 211, 102, 0.6);
  }
`;
