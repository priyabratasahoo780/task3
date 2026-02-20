import { useState, useEffect } from 'react'
import { getMealById } from '../api/mealApi'

/* Fetches a single meal by ID. Re-fetches if id changes. */
const useMealDetails = id => {
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getMealById(id)
      .then(d => { setMeal(d.meals?.[0] || null); if (!d.meals) setError('Meal not found.') })
      .catch(() => setError('Failed to load meal.'))
      .finally(() => setLoading(false))
  }, [id])

  return { meal, loading, error }
}

export default useMealDetails
