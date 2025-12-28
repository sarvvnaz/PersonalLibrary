import "./Search.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <input
        className="searchbar__input"
        placeholder="Search by title or author..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
