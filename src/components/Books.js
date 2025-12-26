import "./Books.css";

export default function BooksNavbar({ books, selectedBookId, onSelect }) {
  if (!books.length) {
    return (
      <div className="books-navbar books-navbar--empty">
        No books added yet
      </div>
    );
  }

  return (
    <nav className="books-navbar">
      {books.map((book) => (
        <button
          key={book.id}
          className={`books-navbar__item ${
            selectedBookId === book.id ? "active" : ""
          }`}
          onClick={() => onSelect(book)}
        >
          <div className="books-navbar__cover">
            <img src={book.coverUrl} alt={book.title} />
          </div>

          <div className="books-navbar__title">{book.title}</div>
        </button>
      ))}
    </nav>
  );
}
