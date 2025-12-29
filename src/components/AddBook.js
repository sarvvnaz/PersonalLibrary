import { useState } from "react";
import "./AddBook.css";

export default function AddBook({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [cover, setCover] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !author || !year || !cover) return;

    // Convert image file to base64 for localStorage persistence
    const reader = new FileReader();
    reader.onloadend = () => {
      const book = {
        id: crypto.randomUUID(),
        title,
        author,
        year: parseInt(year),
        coverUrl: reader.result, // base64 data URL
      };

      onAdd(book);

      setTitle("");
      setAuthor("");
      setYear("");
      setCover(null);
    };
    reader.readAsDataURL(cover);
  }

  return (
    <section className="add-book">
      <h2>Add a Book</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
        />

        <button type="submit">Add</button>
      </form>
    </section>
  );
}
