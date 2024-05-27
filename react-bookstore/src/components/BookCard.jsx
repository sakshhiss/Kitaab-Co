import React, { useState, useEffect } from "react";
import "./BookCard.css";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("https://localhost:7295/api/Books", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  const BookCard = ({ book }) => {
    return (
      <div className="relative bg-white rounded-t-full shadow-md flex flex-col justify-between items-center p-4 w-50">
        <div className="absolute -top-20 w-full flex justify-center overflow-visible">
          <img
            className="w-32 h-48 object-cover shadow-lg"
            src={book.imageAddress}
            alt={book.title}
          />
        </div>
        <div className="mt-20 flex flex-col justify-between items-center w-full pt-5">
          <div className="text-center">
            <h5 className="text-xl md:text-xl font-bold mt-1">{book.title}</h5>
            <p className="text-sm mt-1 text-gray-700">{book.author}</p>
          </div>
          <p className="text-sm font-medium">Genre: {book.genre}</p>
          <p class="price" className="text-pink-500 text-xl font-bold">
            Rs.{book.price.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-[20%] bg-gradient-to-b from-pink-500 to-pink-300">
      <h1 className="text-3xl font-bold font-sans text-white mb-3 mt-10">
        Our Books Catalog
      </h1>
      <hr className="separator1" />
      <div className="flex text-[#313035] items-center justify-center container mx-auto mt-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-y-24 sm:gap-y-24 items-center justify-center p-20">
          {books.map((book) => (
            <BookCard key={book.Bid} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
