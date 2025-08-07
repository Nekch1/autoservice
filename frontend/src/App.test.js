import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './pages/Home';
import '@testing-library/jest-dom';

jest.mock('./components/Carousel', () => () => <div data-testid="carousel" />);
jest.mock('./components/CategoryBlock', () => () => <div data-testid="category-block" />);
jest.mock('./components/AboutBlock', () => ({ textContent }) => (
  <div data-testid="about-block">{textContent}</div>
));
jest.mock('./components/AdvantegesBlock', () => () => <div data-testid="advantages-block" />);
jest.mock('./components/BrandsBlock', () => () => <div data-testid="brands-block" />);


  
test('TestCase №1', () => { 
  render(<Home />);
  
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('category-block')).toBeInTheDocument();
  expect(screen.getByTestId('about-block')).toBeInTheDocument();
  expect(screen.getByTestId('advantages-block')).toBeInTheDocument();
  expect(screen.getByTestId('brands-block')).toBeInTheDocument();
});

  test('TestCase №2', () => {
  render(<Home />);
  
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('category-block')).toBeInTheDocument();
  expect(screen.getByTestId('about-block')).toBeInTheDocument();
  expect(screen.getByTestId('advantages-block')).toBeInTheDocument();
  expect(screen.getByTestId('brands-block')).toBeInTheDocument();
});

  test('TestCase №3', () => {
  render(<Home />);
  
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('category-block')).toBeInTheDocument();
  expect(screen.getByTestId('about-block')).toBeInTheDocument();
  expect(screen.getByTestId('advantages-block')).toBeInTheDocument();
  expect(screen.getByTestId('brands-block')).toBeInTheDocument();
});

  test('TestCase №4', () => {
  render(<Home />);
  
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('category-block')).toBeInTheDocument();
  expect(screen.getByTestId('about-block')).toBeInTheDocument();
  expect(screen.getByTestId('advantages-block')).toBeInTheDocument();
  expect(screen.getByTestId('brands-block')).toBeInTheDocument();
});

  test('TestCase №5', () => {
  render(<Home />);
  
  expect(screen.getByTestId('carousel')).toBeInTheDocument();
  expect(screen.getByTestId('category-block')).toBeInTheDocument();
  expect(screen.getByTestId('about-block')).toBeInTheDocument();
  expect(screen.getByTestId('advantages-block')).toBeInTheDocument();
  expect(screen.getByTestId('brands-block')).toBeInTheDocument();
});


