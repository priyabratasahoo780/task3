import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useMealDetails from '../hooks/useMealDetails'
import LoadingSpinner from '../components/LoadingSpinner'

const MealDetails = ({ likedIds, toggleLike }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { meal, loading, error } = useMealDetails(id)
  const [showFull, setShowFull] = useState(false)

  if (loading) return <LoadingSpinner text="Loading recipe…" />
  if (error || !meal) return <div className="error-box page">{error || 'Meal not found.'}</div>

  // Parse ingredients (max 20 slots in API)
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing  = meal[`strIngredient${i}`]
    const meas = meal[`strMeasure${i}`]
    if (ing?.trim()) ingredients.push(`${meas?.trim() ? meas.trim() + ' ' : ''}${ing.trim()}`)
  }

  const isLiked = likedIds.includes(meal.idMeal)
  const instructions = meal.strInstructions || ''
  const shortInstructions = instructions.length > 600 ? instructions.slice(0, 600) + '…' : instructions

  return (
    <motion.div className="page" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-grid">
        {/* Left column — sticky image */}
        <div className="detail-img-sticky">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="detail-tags">
            {meal.strCategory && <span className="tag tag-orange">🍴 {meal.strCategory}</span>}
            {meal.strArea     && <span className="tag tag-blue">🌍 {meal.strArea}</span>}
            {meal.strTags && meal.strTags.split(',').slice(0, 2).map(t => (
              <span key={t} className="tag tag-green">{t.trim()}</span>
            ))}
          </div>
        </div>

        {/* Right column — details */}
        <div className="detail-content">
          <div className="detail-top">
            <h1 className="detail-name">{meal.strMeal}</h1>
            <button
              className={`btn ${isLiked ? 'btn-orange' : 'btn-outline'}`}
              style={{ flexShrink: 0 }}
              onClick={() => toggleLike(meal.idMeal)}
            >
              {isLiked ? '❤️ Saved' : '🤍 Save'}
            </button>
          </div>

          <div className="divider" />

          {/* Ingredients */}
          <div>
            <p className="sub-heading">Ingredients ({ingredients.length})</p>
            <ul className="ingredients-grid">
              {ingredients.map((ing, i) => (
                <li key={i} className="ing-item"><span className="ing-dot" />{ing}</li>
              ))}
            </ul>
          </div>

          <div className="divider" />

          {/* Instructions */}
          <div>
            <p className="sub-heading">Instructions</p>
            <p className="instructions">{showFull ? instructions : shortInstructions}</p>
            {instructions.length > 600 && (
              <button className="read-more-btn" onClick={() => setShowFull(v => !v)}>
                {showFull ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>

          {/* YouTube */}
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="yt-btn">
              ▶ Watch Video Tutorial
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MealDetails
