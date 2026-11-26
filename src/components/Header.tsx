
function Header() {
  return (
    <header className="header">
      <a href="/" className="logo">
        <span className="logo-icon">🐾</span>
        <span>Fetch<span className="logo-highlight">.</span></span>
      </a>

      <nav className="navigation">
        <a href="#home">Home</a>
        <a href="#finder">Dog Finder</a>
        <a href="#about">About</a>
      </nav>

      <div className="header-label">
        <span className="status-dot"></span>
        DOG LOVERS CLUB
      </div>
    </header>
  );
}

export default Header;
