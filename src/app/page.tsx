'use client';

import { useEffect, useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  available: boolean;
  image: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Error fetching books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold mb-4 text-center text-6xl mt-14">Books List</h1>

      <div className="mt-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border flex flex-col items-center border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-[400px] mx-auto"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-[400px] object-content rounded-lg mb-4"
            />
            <h3 className="text-2xl font-semibold text-center">{book.title}</h3>
            <p className="text-gray-600 text-center text-xl">{book.author}</p>
            <p className={`mt-2 text-xl ${book.available ? 'text-green-500' : 'text-red-500'} text-center`}>
              {book.available ? 'Available' : 'Unavailable'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

