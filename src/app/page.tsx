"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';

type Book = {
  id: number;
  title: string;
  author: string;
  available: boolean;
  image: string;
};



const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", available: true, image: "" });
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [message, setMessage] = useState("");

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      setMessage("Failed to fetch books");
    }
  };

  // Add a book
  const addBook = async () => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      if (res.ok) {
        setMessage("Book added successfully!");
        setNewBook({ title: "", author: "", available: true, image: "" });
        fetchBooks();
      }
    } catch (error) {
      setMessage("Failed to add book");
    }
  };

  // Update a book
  const updateBook = async () => {
    try {
      const res = await fetch("/api/books", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBook),
      });
      if (res.ok) {
        setMessage("Book updated successfully!");
        setEditBook(null);
        fetchBooks();
      }
    } catch (error) {
      setMessage("Failed to update book");
    }
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    try {
      const res = await fetch("/api/books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessage("Book deleted successfully!");
        fetchBooks();
      }
    } catch (error) {
      setMessage("Failed to delete book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Books Management</h1>

      {/* Message */}
      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Add Book */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            className="p-2 border rounded"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="p-2 border rounded"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
          />
          <button
            onClick={addBook}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Books List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <img src={book.image} alt={book.title} className="w-[400px] h-[350px] object-content rounded mb-4 ml-[33px]" />
            <h3 className="text-3xl font-semibold ml-[150px]">{book.title}</h3>
            <p className="text-gray-700 ml-[160px]">Author: {book.author}</p>
            <p className="text-gray-700 ml-[167px]">Available: {book.available ? "Yes" : "No"}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setEditBook(book)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 ml-[170px]"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Book */}
      {editBook && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="p-2 border rounded"
              value={editBook.title}
              onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              className="p-2 border rounded"
              value={editBook.author}
              onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="p-2 border rounded"
              value={editBook.image}
              onChange={(e) => setEditBook({ ...editBook, image: e.target.value })}
            />
            <button
              onClick={updateBook}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
