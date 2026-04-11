import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/Header.css';

export default function Header({ onSearch, likedCount, onSidebarToggle, onRecommend }) {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value.trim());
  };

  return (
    <header className="header">
      <div className="logo">Cine<span>Graph</span></div>

      <div className="search-wrap">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search 9,000+ movies…"
          autoComplete="off"
          value={input}
          onChange={handleInput}
        />
      </div>

      <div className="header-actions">
        <button className="liked-pill" onClick={onSidebarToggle}>
          <span className="heart">♥</span>
          <span>{likedCount}</span> liked
        </button>
        <button
          className="btn-recommend"
          disabled={likedCount === 0}
          onClick={onRecommend}
        >
          ✦ Get Recommendations
        </button>
      </div>
    </header>
  );
}
