import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import BookList from '../components/BookCard';

// Mock sessionStorage
global.sessionStorage = {
  getItem: () => 'mock-token',
};

// Mock fetch
global.fetch = (url) => {
  return new Promise((resolve, reject) => {
    if (url === 'https://localhost:7295/api/Books') {
      resolve({
        ok: true,
        json: () => Promise.resolve([
          { title: 'Book 1', author: 'Author 1', genre: 'Genre 1', price: 100, imageAddress: 'image1.jpg', Bid: 1 },
          { title: 'Book 2', author: 'Author 2', genre: 'Genre 2', price: 200, imageAddress: 'image2.jpg', Bid: 2 },
        ]),
      });
    } else {
      reject(new Error('Invalid URL'));
    }
  });
};

describe('BookList component', () => {
  it('displays book cards with correct information', async () => {
    render(<BookList />);

    await waitFor(() => {
      const book1TitleElement = screen.getByText('Book 1');
      const book2TitleElement = screen.getByText('Book 2');
      const book1AuthorElement = screen.getByText('Author 1');
      const book2AuthorElement = screen.getByText('Author 2');
      const book1GenreElement = screen.getByText('Genre: Genre 1');
      const book2GenreElement = screen.getByText('Genre: Genre 2');
      const book1PriceElement = screen.getByText('Rs.100.00');
      const book2PriceElement = screen.getByText('Rs.200.00');

      expect(book1TitleElement).toBeInTheDocument();
      expect(book2TitleElement).toBeInTheDocument();
      expect(book1AuthorElement).toBeInTheDocument();
      expect(book2AuthorElement).toBeInTheDocument();
      expect(book1GenreElement).toBeInTheDocument();
      expect(book2GenreElement).toBeInTheDocument();
      expect(book1PriceElement).toBeInTheDocument();
      expect(book2PriceElement).toBeInTheDocument();
    });
  });
});
