import { useState } from 'react'

const KEY = 'likedMeals'

/* Manages liked meal IDs in localStorage. */
const useLikedMeals = () => {
  const [likedIds, setLikedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  const save = ids => { localStorage.setItem(KEY, JSON.stringify(ids)); setLikedIds(ids) }

  const toggle = id => save(likedIds.includes(id) ? likedIds.filter(x => x !== id) : [...likedIds, id])
  const remove  = id => save(likedIds.filter(x => x !== id))
  const isLiked = id => likedIds.includes(id)

  return { likedIds, toggle, remove, isLiked }
}

export default useLikedMeals
