import { useState, useEffect } from 'react'
import { getCategories } from '../api/mealApi'

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories()
      .then(d => setCategories(d.categories || []))
      .catch(() => setError('Failed to load categories.'))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, error }
}

export default useCategories
