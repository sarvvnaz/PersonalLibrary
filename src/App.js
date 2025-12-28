import { useState } from "react";
import LandingPage from "./LandingPage";
import AddBook from "./components/AddBook";
import BooksNavbar from "./components/Books";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <LandingPage />

      <AddBook
        onAdd={(book) => {
          setBooks((prev) => [...prev, book]);
          setSelectedBook(book);
        }}
      />

      <BooksNavbar
        books={books}
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
