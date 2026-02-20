import { useNavigate } from 'react-router-dom'

const MealCard = ({ meal, likedIds, toggleLike }) => {
  const navigate = useNavigate()
  const isLiked = likedIds.includes(meal.idMeal)

  return (
    <div className="meal-card">
      <div className="meal-card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-img" loading="lazy" />
        <span className="meal-category-badge">{meal.strCategory}</span>
      </div>
      <div className="meal-card-body">
        <h3 className="meal-card-title">{meal.strMeal}</h3>
        <div className="meal-card-actions">
          <button className={`btn-like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(meal.idMeal)}>
            {isLiked ? '❤️ Liked' : '🤍 Like'}
          </button>
          <button className="btn-details" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
            View Details →
          </button>
        </div>
      </div>
    </div>
  )
}

export default MealCard
