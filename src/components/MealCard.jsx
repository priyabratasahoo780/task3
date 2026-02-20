import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MealCard = ({ meal, isLiked, onToggleLike }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      className="meal-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="meal-card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-img" loading="lazy" />
        <span className="card-category">{meal.strCategory}</span>
        <button
          className={`card-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleLike(meal.idMeal) }}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Body */}
      <div className="meal-card-body">
        <p className="meal-card-title">{meal.strMeal}</p>
        <div className="meal-card-footer">
          <button className="btn btn-orange" style={{ flex: 1 }} onClick={() => navigate(`/meal/${meal.idMeal}`)}>
            View Recipe →
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default MealCard
