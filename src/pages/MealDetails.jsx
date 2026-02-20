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
      .then(r => r.json())
      .then(data => {
        setMeal(data.meals?.[0] || null)
        if (!data.meals) setError('Meal not found.')
      })
      .catch(() => setError('Failed to load meal.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>
  if (error) return <div className="error-box page" style={{ marginTop: 40 }}>{error}</div>
  if (!meal) return null

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    const meas = meal[`strMeasure${i}`]
    if (ing?.trim()) ingredients.push(`${meas?.trim() || ''} ${ing.trim()}`.trim())
  }

  const isLiked = likedIds.includes(meal.idMeal)
  const instructions = meal.strInstructions || ''

  return (
    <div className="page">
      <button className="btn btn-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-layout">
        <div className="detail-img-sticky">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="detail-content">
          <div className="detail-header">
            <h1 className="detail-title">{meal.strMeal}</h1>
            <button className={`btn btn-like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(meal.idMeal)}>
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>

          <div className="tags">
            {meal.strCategory && <span className="tag accent">{meal.strCategory}</span>}
            {meal.strArea && <span className="tag blue">{meal.strArea}</span>}
          </div>

          <div>
            <p className="section-title">Ingredients</p>
            <ul className="ingredients-grid">
              {ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ingredient-dot" />{ing}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-title">Instructions</p>
            <p className="instructions">
              {instructions.length > 600 ? instructions.slice(0, 600) + '…' : instructions}
            </p>
          </div>

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="yt-link">
              ▶ Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealDetails
