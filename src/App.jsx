import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SearchMeals from './pages/SearchMeals.jsx'
import MealDetails from './pages/MealDetails.jsx'
import LikedMeals from './pages/LikedMeals.jsx'
import Categories from './pages/Categories.jsx'

const App = () => {
  const [likedIds, setLikedIds] = useState(() => {
    return JSON.parse(localStorage.getItem('likedMeals')) || []
  })

  const toggleLike = (id) => {
    let updated
    if (likedIds.includes(id)) {
      updated = likedIds.filter(x => x !== id)
    } else {
      updated = [...likedIds, id]
    }
    localStorage.setItem('likedMeals', JSON.stringify(updated))
    setLikedIds(updated)
  }

  const removeLike = (id) => {
    const updated = likedIds.filter(x => x !== id)
    localStorage.setItem('likedMeals', JSON.stringify(updated))
    setLikedIds(updated)
  }

  return (
    <div className="app">
      <Navbar likedCount={likedIds.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SearchMeals likedIds={likedIds} toggleLike={toggleLike} />} />
          <Route path="/meal/:id" element={<MealDetails likedIds={likedIds} toggleLike={toggleLike} />} />
          <Route path="/liked" element={<LikedMeals likedIds={likedIds} removeLike={removeLike} />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
