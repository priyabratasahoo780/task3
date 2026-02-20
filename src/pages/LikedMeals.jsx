import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LikedMeals = ({ likedIds, removeLike }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (likedIds.length === 0) { setMeals([]); return }
    setLoading(true)
    Promise.all(
      likedIds.map(id =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then(r => r.json())
          .then(d => d.meals?.[0])
          .catch(() => null)
      )
    )
      .then(results => setMeals(results.filter(Boolean)))
      .finally(() => setLoading(false))
  }, [likedIds])

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Liked Meals</h1>
        <p className="page-subtitle">{likedIds.length} saved meal{likedIds.length !== 1 ? 's' : ''}</p>
      </div>

      {likedIds.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p className="empty-text">No liked meals yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Explore Meals</button>
        </div>
      )}

      <div className="meals-grid">
        {meals.map(meal => (
          <div key={meal.idMeal} className="card">
            <div className="card-img-wrap">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" loading="lazy" />
              <span className="card-badge">{meal.strCategory}</span>
            </div>
            <div className="card-body">
              <p className="card-title">{meal.strMeal}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                  Details →
                </button>
                <button className="btn btn-remove" onClick={() => removeLike(meal.idMeal)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LikedMeals
