import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMeals from '../hooks/useMeals'
import MealCard from '../components/MealCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Stagger animation for the grid
const grid = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const card = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }

const SearchMeals = ({ likedIds, toggleLike }) => {
  const [query, setQuery] = useState('')
  const { meals, loading, error, fetchByLetter, fetchByName } = useMeals()

  const handleSearch = () => {
    const q = query.trim()
    q ? fetchByName(q) : fetchByLetter('a')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <div className="hero">
        <p className="hero-tag">🌍 World Recipes</p>
        <h1>Find Your Next<br />Favourite Meal</h1>
        <p>Search thousands of recipes from every cuisine worldwide.</p>
        <div className="search-bar">
          <input
            className="search-input"
            placeholder='Try "Chicken", "Pasta", "Sushi"…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Letter Filter */}
      <div className="letter-filter">
        {LETTERS.map(l => (
          <button key={l} className="letter-btn" onClick={() => { setQuery(''); fetchByLetter(l) }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="page">
        {loading && <LoadingSpinner text="Searching recipes…" />}
        {error && !loading && <div className="error-box">{error}</div>}

        {!loading && !error && meals.length === 0 && (
          <EmptyState icon="🔍" title="No meals found" subtitle="Try a different search term." />
        )}

        {!loading && !error && meals.length > 0 && (
          <>
            <div className="section-row">
              <span className="section-title">Results</span>
              <span className="section-count">{meals.length} meals</span>
            </div>
            <motion.div className="meals-grid" variants={grid} initial="hidden" animate="show">
              {meals.map(meal => (
                <motion.div key={meal.idMeal} variants={card}>
                  <MealCard
                    meal={meal}
                    isLiked={likedIds.includes(meal.idMeal)}
                    onToggleLike={toggleLike}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default SearchMeals
