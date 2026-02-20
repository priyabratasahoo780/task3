import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const CategoryMeals = ({ likedIds, toggleLike }) => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(data => setMeals(data.meals || []))
      .catch(() => setError('Failed to load meals.'))
      .finally(() => setLoading(false))
  }, [name])

  return (
    <div className="page">
      <button className="btn btn-back" onClick={() => navigate('/categories')}>← Categories</button>
      <div className="page-header">
        <h1 className="page-title">{name}</h1>
        <p className="page-subtitle">{meals.length} meals in this category</p>
      </div>

      {loading && <div className="loading"><div className="spinner" /> Loading…</div>}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && (
        <div className="meals-grid">
          {meals.map(meal => (
            <div key={meal.idMeal} className="card">
              <div className="card-img-wrap">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" loading="lazy" />
              </div>
              <div className="card-body">
                <p className="card-title">{meal.strMeal}</p>
                <div className="card-actions">
                  <button
                    className={`btn btn-like ${likedIds.includes(meal.idMeal) ? 'liked' : ''}`}
                    onClick={() => toggleLike(meal.idMeal)}
                  >
                    {likedIds.includes(meal.idMeal) ? '❤️ Liked' : '🤍 Like'}
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryMeals
