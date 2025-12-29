import { useMemo, useState } from "react";
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

function App() {
  const [books, setBooks] = useState([defaultBook]);
  const [selectedBook, setSelectedBook] = useState(defaultBook);
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;

    return books.filter((b) => {
      const title = b.title.toLowerCase();
      const author = b.author.toLowerCase();
      return title.includes(q) || author.includes(q);
    });
  }, [books, query]);
  
  function handleDeleteSelectedBook() {
    if (!selectedBook) return;
    setBooks((prev) => prev.filter((b) => b.id !== selectedBook.id));
    setSelectedBook(null); 
  }

  function handleDeleteBook(bookId) {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    if (selectedBook?.id === bookId) {
      setSelectedBook(null);
    }
  }

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
        onDelete={handleDeleteBook}
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
          <br />
          <button onClick={handleDeleteSelectedBook} style={{ marginTop: 10, color: 'red' }}>
            Delete Book
          </button>
        </div>
      )}
    </>
  );
}

export default App;
