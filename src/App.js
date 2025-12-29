import { useMemo, useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import AddBook from "./components/AddBook";
import BooksNavbar from "./components/Books";
import SearchBar from "./components/Search";

import animalFarmCover from "./assets/anim.jpg";

const defaultBook = {
  id: "animal-farm",
  title: "Animal Farm",
  author: "George Orwell",
  year: 1945,
  coverUrl: animalFarmCover
};

const STORAGE_KEY = "personalLibrary_books";
const SELECTED_BOOK_KEY = "personalLibrary_selectedBookId";

function App() {
  // Load books from localStorage on initial mount
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem(STORAGE_KEY);
      if (savedBooks) {
        return JSON.parse(savedBooks);
      }
    } catch (error) {
      console.error("Error loading books from localStorage:", error);
    }
    return [defaultBook];
  });

  // Initialize selectedBook - will be set properly in useEffect after books load
  const [selectedBook, setSelectedBook] = useState(null);

  const [query, setQuery] = useState("");

  // Initialize selectedBook from localStorage on mount
  useEffect(() => {
    try {
      const savedSelectedBookId = localStorage.getItem(SELECTED_BOOK_KEY);
      if (savedSelectedBookId && books.length > 0) {
        const book = books.find((b) => b.id === savedSelectedBookId);
        setSelectedBook(book || books[0] || null);
      } else if (books.length > 0) {
        setSelectedBook(books[0]);
      }
    } catch (error) {
      console.error("Error loading selected book from localStorage:", error);
      if (books.length > 0) {
        setSelectedBook(books[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Save books to localStorage whenever books change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Error saving books to localStorage:", error);
    }
  }, [books]);

  // Save selected book ID to localStorage whenever selectedBook changes
  useEffect(() => {
    try {
      if (selectedBook) {
        localStorage.setItem(SELECTED_BOOK_KEY, selectedBook.id);
      } else {
        localStorage.removeItem(SELECTED_BOOK_KEY);
      }
    } catch (error) {
      console.error("Error saving selected book to localStorage:", error);
    }
  }, [selectedBook]);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;

    return books.filter((b) => {
      const title = b.title.toLowerCase();
      const author = b.author.toLowerCase();
      return title.includes(q) || author.includes(q);
    });
  }, [books, query]);

  return (
    <>
      <LandingPage />

      <AddBook
        onAdd={(book) => {
          setBooks((prev) => [book, ...prev]);
          setSelectedBook(book);
          setQuery("");
        }}
      />

      <SearchBar value={query} onChange={setQuery} />

      <BooksNavbar
        books={filteredBooks}
        selectedBookId={selectedBook?.id}
        onSelect={setSelectedBook}
      />

      {selectedBook && (
        <div style={{ padding: 20 }}>
          <h3>{selectedBook.title}</h3>
          <p>
            {selectedBook.author} — {selectedBook.year}
          </p>
          <img
            src={selectedBook.coverUrl}
            alt={selectedBook.title}
            style={{ width: 160, borderRadius: 12 }}
          />
        </div>
      )}
    </>
  );
}

export default App;
