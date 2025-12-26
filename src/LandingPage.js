import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__content">
        <h1 className="landing__title">Personal Library</h1>
        <p className="landing__subtitle">
          A simple place to add, search, and manage your books.
        </p>
      </div>
    </div>
  );
}
