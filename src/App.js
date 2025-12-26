import { useState } from "react";
import LandingPage from "./LandingPage";
import AddBook from "./components/AddBook";

function App() {
  const [books, setBooks] = useState([]);

  return (
    <>
      <LandingPage />

      <AddBook
        onAdd={(book) => {
          setBooks((prev) => [...prev, book]);
          console.log("Books:", books);
        }}
      />
    </>
  );
}

export default App;
