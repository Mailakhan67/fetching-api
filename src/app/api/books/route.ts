import { NextResponse, NextRequest } from "next/server";

// Simulate book data
let books = [
  { id: 1, title: "Bang-e-Dara", author: "Allama Iqbal", available: true, image: "/Bang-e-Dara.jpeg" },
  { id: 2, title: "Bal-e-Jibril", author: "Allama Iqbal", available: true, image: "/Bal-e-Jibril.jpeg" },
  { id: 3, title: "Zarb-e-Kaleem", author: "Allama Iqbal", available: false, image: "/Zarb-e-Kaleem.jpeg" },
  { id: 4, title: "Armaghan-e-Hijaz", author: "Allama Iqbal", available: true, image: "/Armaghan-e-Hijaz.jpeg" },
  { id: 5, title: "Asrar-e-Khudi", author: "Allama Iqbal", available: true, image: "/Asrar-e-Khudi.jpeg" },
  { id: 6, title: "Rumuz-e-Bekhudi", author: "Allama Iqbal", available: false, image: "/Rumuz-e-Bekhudi.jpg" },
];

export async function GET() {
  try {
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching books" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const newBook = await request.json();
    books.push(newBook); 
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding book" }, { status: 500 });
  }
}

// PUT Method
export async function PUT(request: Request) {
  try {


    const { id, title, author, available, image } = await request.json();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    books[bookIndex] = { id, title, author, available, image };
    return NextResponse.json(books[bookIndex], { status: 200 });

    
  } catch (error) {
    return NextResponse.json({ message: "Error updating book" }, { status: 500 });
  }
}

// DELETE Method 
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    books.splice(bookIndex, 1);
    return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book" }, { status: 500 });
  }
}
