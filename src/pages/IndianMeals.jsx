import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { filterByArea } from '../api/mealApi'
import MealCard from '../components/MealCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const card = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }

const IndianMeals = ({ likedIds, toggleLike }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    filterByArea('Indian')
      .then(d => setMeals(d.meals || []))
      .catch(() => setError('Failed to load Indian meals.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="page-header">
        <h1>Indian Cuisine 🇮🇳</h1>
        <p>Explore {meals.length > 0 ? meals.length : ''} delicious Indian recipes</p>
      </div>

      {loading && <LoadingSpinner text="Loading Indian dishes…" />}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && meals.length === 0 && (
        <EmptyState icon="🍛" title="No meals found" subtitle="Could not load Indian meals at this time." />
      )}

      {!loading && !error && meals.length > 0 && (
        <motion.div className="meals-grid" variants={grid} initial="hidden" animate="show">
          {meals.map(meal => (
            <motion.div key={meal.idMeal} variants={card}>
              <MealCard
                meal={meal}
                isLiked={likedIds.includes(meal.idMeal)}
                onToggleLike={toggleLike}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default IndianMeals
