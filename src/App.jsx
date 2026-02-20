import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import useLikedMeals from './hooks/useLikedMeals'

const App = () => {
  const { likedIds, toggle, remove } = useLikedMeals()

  // Theme: persist in localStorage
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar likedCount={likedIds.length} isDark={isDark} toggleTheme={() => setIsDark(v => !v)} />
        <main className="main">
          <AppRoutes likedIds={likedIds} toggleLike={toggle} removeLike={remove} />
        </main>
        <footer className="footer">
          <span className="footer-brand">Meal<span>Explorer</span></span>
          <span className="footer-note">Powered by TheMealDB · {new Date().getFullYear()}</span>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
