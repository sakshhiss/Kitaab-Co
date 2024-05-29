import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Loading from "./Loading";

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    bid: "",
    title: "",
    imageAddress: "",
    author: "",
    genre: "",
    price: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEditClick = (post) => {
    setEditPostId(post.bid);
    setEditFormData({ ...post });
  };

  const handleCancelClick = () => {
    setEditPostId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://localhost:7295/api/Books/${editPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating post: ${response.statusText}`);
      }

      const updatedPost = await response.json();
      setPosts(
        posts.map((post) => (post.bid === editPostId ? updatedPost : post))
      );
      setEditPostId(null);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`https://localhost:7295/api/Books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }

      setPosts(posts.filter((post) => post.bid !== id));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 bg-gray-100 min-h-screen flex-1 justify-between items-center">
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-pink-500 w-full">
              Posts
            </h2>
            <Link
              to="/createpost"
              className="bg-blue-500 mr-2 text-white rounded-3xl hover:bg-pink-400"
            >
              <IoIosAddCircle size={30} />
            </Link>
          </div>
          <table className="min-w-full bg-white border border-gray-200 ">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-[#313035]">ID</th>
                <th className="px-4 py-2 border-b text-[#313035]">Title</th>
                <th className="px-4 py-2 border-b text-[#313035]">
                  Book Image
                </th>
                <th className="px-4 py-2 border-b text-[#313035]">Author</th>
                <th className="px-4 py-2 border-b text-[#313035]">Genre</th>
                <th className="px-4 py-2 border-b text-[#313035]">Price</th>
                <th className="px-4 py-2 border-b text-[#313035]">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {posts.map((post) => (
                <tr key={post.bid}>
                  {editPostId === post.bid ? (
                    <>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="text"
                          name="bid"
                          value={editFormData.bid}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="text"
                          name="imageAddress"
                          value={editFormData.imageAddress}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="text"
                          name="author"
                          value={editFormData.author}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="text"
                          name="genre"
                          value={editFormData.genre}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <input
                          type="number"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditFormChange}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={handleSaveClick}
                          className="text-green-500 hover:bg-gray-200 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="text-red-500 hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border-b">{post.bid}</td>
                      <td className="px-4 py-2 border-b">{post.title}</td>
                      <td className="px-4 py-2 border-b">
                        <div className="flex justify-center">
                          <img
                            src={post.imageAddress}
                            alt={post.title}
                            className="h-16 w-16 object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b">{post.author}</td>
                      <td className="px-4 py-2 border-b">{post.genre}</td>
                      <td className="px-4 py-2 border-b">
                        Rs.{post.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() => handleEditClick(post)}
                          className="text-green-500 hover:bg-gray-200 mr-2"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(post.bid)}
                          className="text-red-500 hover:bg-gray-200"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
