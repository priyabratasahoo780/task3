import { useState, useEffect } from 'react'
import MealCard from '../components/MealCard.jsx'

const SearchMeals = ({ likedIds, toggleLike }) => {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchByLetter = async (letter = 'a') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      setMeals(data.meals || [])
    } catch {
      setError('Failed to load meals. Please try again.')
      setMeals([])
    } finally {
      setLoading(false)
    }
  }

  const fetchByName = async (name) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      setMeals(data.meals || [])
      if (!data.meals) setError(`No meals found for "${name}"`)
    } catch {
      setError('Failed to search meals. Please try again.')
      setMeals([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchByLetter('a')
  }, [])

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) {
      fetchByLetter('a')
    } else {
      fetchByName(trimmed)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="page">
      <div className="search-hero">
        <h1 className="page-title">Discover Meals 🍜</h1>
        <p className="page-subtitle">Search from thousands of meals worldwide</p>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a meal…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="letter-filters">
          {'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => (
            <button
              key={letter}
              className="letter-btn"
              onClick={() => {
                setQuery('')
                fetchByLetter(letter)
              }}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="loading"><div className="spinner" /> Loading meals…</div>}
      {error && !loading && <div className="error-msg">{error}</div>}

      {!loading && !error && (
        <>
          <p className="results-count">{meals.length} meal{meals.length !== 1 ? 's' : ''} found</p>
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
