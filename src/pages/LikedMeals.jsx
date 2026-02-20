import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMealById } from '../api/mealApi'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const card = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }

const LikedMeals = ({ likedIds, removeLike }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (likedIds.length === 0) { setMeals([]); return }
    setLoading(true)
    Promise.all(likedIds.map(id => getMealById(id).then(d => d.meals?.[0]).catch(() => null)))
      .then(results => setMeals(results.filter(Boolean)))
      .finally(() => setLoading(false))
  }, [likedIds])

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="page-header">
        <h1>Liked Meals ❤️</h1>
        <p>{likedIds.length} saved recipe{likedIds.length !== 1 ? 's' : ''}</p>
      </div>

      {loading && <LoadingSpinner text="Loading saved meals…" />}

      {!loading && likedIds.length === 0 && (
        <EmptyState
          icon="💔"
          title="No liked meals yet."
          subtitle="Go explore and like some recipes!"
          action={<button className="btn btn-orange" onClick={() => navigate('/')}>Explore Meals</button>}
        />
      )}

      {!loading && meals.length > 0 && (
        <motion.div className="meals-grid" variants={grid} initial="hidden" animate="show">
          {meals.map(meal => (
            <motion.div key={meal.idMeal} variants={card} className="liked-card">
              <div className="meal-card-img-wrap" style={{ aspectRatio: '4/3' }}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-card-img" loading="lazy" />
                <span className="card-category">{meal.strCategory}</span>
              </div>
              <div className="meal-card-body">
                <p className="meal-card-title">{meal.strMeal}</p>
                <div className="meal-card-footer">
                  <button className="btn btn-orange" style={{ flex: 1 }} onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                    View Recipe →
                  </button>
                  <button className="btn btn-ghost-red" onClick={() => removeLike(meal.idMeal)}>
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default LikedMeals
