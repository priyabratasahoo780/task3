import { NavLink } from 'react-router-dom'

const Navbar = ({ likedCount }) => {
  return (
    <nav className="navbar">
      <div className="brand-name">Meal<span>Explorer</span></div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Search
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Categories
        </NavLink>
        <NavLink to="/liked" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Liked {likedCount > 0 && <span className="liked-badge">{likedCount}</span>}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
