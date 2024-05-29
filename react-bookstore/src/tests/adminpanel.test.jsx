import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
//import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import Loading from "../components/Loading";

// Mock sessionStorage
global.sessionStorage = {
  getItem: () => "mock-token",
};

// Mock fetch
beforeAll(() => {
  global.fetch = (url, options) => {
    if (
      url === "https://localhost:7295/api/Books" &&
      options.method === "GET"
    ) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              bid: 1,
              title: "Book 1",
              imageAddress: "image1.jpg",
              author: "Author 1",
              genre: "Genre 1",
              price: 100,
            },
            {
              bid: 2,
              title: "Book 2",
              imageAddress: "image2.jpg",
              author: "Author 2",
              genre: "Genre 2",
              price: 200,
            },
          ]),
      });
    }
    return Promise.reject(new Error("Invalid URL or Method"));
  };
});

afterAll(() => {
  delete global.fetch;
});

describe("AdminPanel component", () => {
  it("displays book posts with correct information", async () => {
    render(
      <Router>
        <AdminPanel />
      </Router>
    );

    // Debug to print DOM structure before waitFor
    screen.debug();

    await waitFor(() => {
      const book1TitleElement = screen.getByText(/Book 1/i);
      const book2TitleElement = screen.getByText(/Book 2/i);
      const book1AuthorElement = screen.getByText(/Author 1/i);
      const book2AuthorElement = screen.getByText(/Author 2/i);
      const book1GenreElement = screen.getByText(/Genre 1/i);
      const book2GenreElement = screen.getByText(/Genre 2/i);
      const book1PriceElement = screen.getByText(/Rs.100.00/i);
      const book2PriceElement = screen.getByText(/Rs.200.00/i);

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
