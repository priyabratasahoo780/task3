import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const MealDetails = ({ likedIds, toggleLike }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data.meals ? data.meals[0] : null)
        if (!data.meals) setError('Meal not found.')
      })
      .catch(() => setError('Failed to load meal details.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>
  if (error) return <div className="error-msg page-pad">{error}</div>
  if (!meal) return null

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`)
    }
  }

  const isLiked = likedIds.includes(meal.idMeal)
  const instructions = meal.strInstructions || ''
  const shortInstructions = instructions.length > 500 ? instructions.slice(0, 500) + '...' : instructions

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-container">
        <div className="detail-img-wrap">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-img" />
        </div>
        <div className="detail-info">
          <div className="detail-header">
            <h1 className="detail-title">{meal.strMeal}</h1>
            <button className={`btn-like large ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(meal.idMeal)}>
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>

          <div className="detail-tags">
            <span className="tag category-tag">📂 {meal.strCategory}</span>
            {meal.strArea && <span className="tag area-tag">🌍 {meal.strArea}</span>}
          </div>

          <div className="detail-section">
            <h2>🥘 Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-dot" />{ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2>📋 Instructions</h2>
            <p className="instructions-text">{shortInstructions}</p>
          </div>

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-link">
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealDetails
