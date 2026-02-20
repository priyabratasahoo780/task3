import { useState, useEffect } from 'react'
import MealCard from '../components/MealCard.jsx'

const SearchMeals = ({ likedIds, toggleLike }) => {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchByLetter = (letter) => {
    setLoading(true)
    setError(null)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(r => r.json())
      .then(data => setMeals(data.meals || []))
      .catch(() => setError('Failed to load meals.'))
      .finally(() => setLoading(false))
  }

  const fetchByName = (name) => {
    setLoading(true)
    setError(null)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(data => {
        setMeals(data.meals || [])
        if (!data.meals) setError(`No results for "${name}"`)
      })
      .catch(() => setError('Search failed.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchByLetter('a') }, [])

  const handleSearch = () => {
    const q = query.trim()
    q ? fetchByName(q) : fetchByLetter('a')
  }

  return (
    <div className="page">
      <div className="search-hero">
        <h1 className="page-title">Discover <span className="highlight">Meals</span></h1>
        <p className="page-subtitle">Search thousands of recipes from around the world</p>
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search meals…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="letter-filters">
          {'abcdefghijklmnopqrstuvwxyz'.split('').map(l => (
            <button key={l} className="letter-btn" onClick={() => { setQuery(''); fetchByLetter(l) }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="loading"><div className="spinner" /> Loading…</div>}
      {error && !loading && <div className="error-box">{error}</div>}

      {!loading && !error && (
        <>
          <p className="section-label">{meals.length} Meals found</p>
          <div className="meals-grid">
            {meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} likedIds={likedIds} toggleLike={toggleLike} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchMeals
