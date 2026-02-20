import { NavLink } from 'react-router-dom'

const Navbar = ({ likedCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🍽️</span>
        <span className="brand-name">MealExplorer</span>
      </div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          end
        >
          🔍 Search
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          📂 Categories
        </NavLink>
        <NavLink
          to="/liked"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          ❤️ Liked Meals
          {likedCount > 0 && (
            <span className="liked-badge">{likedCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
