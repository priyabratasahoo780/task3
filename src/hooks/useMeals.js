import { useState, useEffect } from 'react'
import { searchByName, searchByLetter } from '../api/mealApi'

/* Handles search + default load. Components just call the returned helpers. */
const useMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = promise => {
    setLoading(true)
    setError(null)
    promise
      .then(d => { setMeals(d.meals || []); if (!d.meals) setError('No meals found.') })
      .catch(() => setError('Something went wrong.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(searchByLetter('a')) }, [])

  return {
    meals,
    loading,
    error,
    fetchByLetter: letter => load(searchByLetter(letter)),
    fetchByName:   name   => load(searchByName(name)),
  }
}

export default useMeals
