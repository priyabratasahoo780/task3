import { useNavigate } from 'react-router-dom'

const MealCard = ({ meal, likedIds, toggleLike }) => {
  const navigate = useNavigate()
  const isLiked = likedIds.includes(meal.idMeal)

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img" loading="lazy" />
        <span className="card-badge">{meal.strCategory}</span>
      </div>
      <div className="card-body">
        <p className="card-title">{meal.strMeal}</p>
        <div className="card-actions">
          <button className={`btn btn-like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(meal.idMeal)}>
            {isLiked ? '❤️' : '🤍'} {isLiked ? 'Liked' : 'Like'}
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/meal/${meal.idMeal}`)}>
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}

export default MealCard
