import { useState } from 'react';
import Icon from './Icon';
import '../styles/Header.css';

export default function Header({ onSearch, likedCount }) {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value.trim());
  };

  return (
    <header className="header">
      <a className="logo" href="/">CineGraph</a>

      <label className="search">
        <span className="visually-hidden">Search movies by title</span>
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder="Search 9,000+ movies"
          autoComplete="off"
          value={input}
          onChange={handleInput}
        />
      </label>

      <span className="header-count" aria-live="polite">
        <b>{likedCount}</b> in your stack
      </span>
    </header>
  );
}
