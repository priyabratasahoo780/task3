import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { filterByCategory } from '../api/mealApi'
import MealCard from '../components/MealCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const card = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }

const CategoryMeals = ({ likedIds, toggleLike }) => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    filterByCategory(name)
      .then(d => setMeals(d.meals || []))
      .catch(() => setError('Failed to load meals.'))
      .finally(() => setLoading(false))
  }, [name])

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <button className="btn-back" onClick={() => navigate('/categories')}>← Categories</button>
      <div className="page-header">
        <h1>{name}</h1>
        <p>{meals.length} recipes in this category</p>
      </div>

      {loading && <LoadingSpinner text="Loading meals…" />}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && meals.length === 0 && (
        <EmptyState icon="🍽️" title="No meals found" subtitle="This category seems empty." />
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

export default CategoryMeals
