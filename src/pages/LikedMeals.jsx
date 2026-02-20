import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LikedMeals = ({ likedIds, removeLike }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (likedIds.length === 0) {
      setMeals([])
      return
    }
    setLoading(true)
    const fetches = likedIds.map(id =>
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => data.meals && data.meals[0])
        .catch(() => null)
    )
    Promise.all(fetches)
      .then(results => setMeals(results.filter(Boolean)))
      .finally(() => setLoading(false))
  }, [likedIds])

  if (loading) return <div className="loading"><div className="spinner" /> Loading liked meals…</div>

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Liked Meals ❤️</h1>
        <p className="page-subtitle">{likedIds.length} liked meal{likedIds.length !== 1 ? 's' : ''}</p>
      </div>

      {likedIds.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p className="empty-text">No liked meals yet.</p>
          <button className="btn-details" onClick={() => navigate('/')}>Explore Meals</button>
        </div>
      )}

      <div className="meals-grid">
        {meals.map(meal => (
          <div key={meal.idMeal} className="meal-card">
            <div className="meal-card-img-wrap">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-img" loading="lazy" />
              <span className="meal-category-badge">{meal.strCategory}</span>
            </div>
            <div className="meal-card-body">
              <h3 className="meal-card-title">{meal.strMeal}</h3>
              <div className="meal-card-actions">
                <button className="btn-details" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                  View Details →
                </button>
                <button className="btn-remove" onClick={() => removeLike(meal.idMeal)}>
                  🗑️ Remove
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
