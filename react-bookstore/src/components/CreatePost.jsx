import React, { useState } from "react";

const CreatePost = () => {
  const [bid, setBid] = useState("");
  const [title, setTitle] = useState("");
  const [imageAddress, setBookImage] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const addPostToAPI = async (
    bid,
    title,
    imageAddress,
    author,
    genre,
    price
  ) => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token"); // Get the JWT token from sessionStorage

      const response = await fetch("https://localhost:7295/api/Books", {
        method: "POST",
        body: JSON.stringify({
          bid: bid,
          title: title,
          imageAddress: imageAddress,
          author: author,
          genre: genre,
          price: parseFloat(price),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Post added:", data);

      setBid("");
      setTitle("");
      setBookImage("");
      setAuthor("");
      setGenre("");
      setPrice("");
    } catch (error) {
      console.log("Error adding post:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPostToAPI(bid, title, imageAddress, author, genre, price);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#313035] font-semibold text-center mb-6">
          Create New Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Book Id</label>
            <input
              type="text"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Book Image URL</label>
            <input
              type="text"
              value={imageAddress}
              onChange={(e) => setBookImage(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-300 text-white px-4 py-2 rounded-lg hover:bg-pink-500"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
