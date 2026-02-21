import { NavLink } from 'react-router-dom'

const Navbar = ({ likedCount, isDark, toggleTheme }) => (
  <nav className="navbar">
    <div className="navbar-inner">
      {/* Logo */}
      <NavLink to="/" className="navbar-logo">
        <div className="logo-icon">🍽️</div>
        <span className="logo-text">Meal<span>Explorer</span></span>
      </NavLink>

      {/* Links + Theme toggle */}
      <div className="navbar-right">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Search
        </NavLink>
        <NavLink to="/indian" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Indian
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Categories
        </NavLink>
        <NavLink to="/liked" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Liked {likedCount > 0 && <span className="badge">{likedCount}</span>}
        </NavLink>

        {/* Day / Night toggle */}
        <button
          className="theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle day/night mode"
          title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </nav>
)

export default Navbar
