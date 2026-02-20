import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SearchMeals from '../pages/SearchMeals'
import MealDetails from '../pages/MealDetails'
import LikedMeals from '../pages/LikedMeals'
import Categories from '../pages/Categories'
import CategoryMeals from '../pages/CategoryMeals'

/* AnimatePresence requires key=location.pathname so pages animate out properly */
const AppRoutes = ({ likedIds, toggleLike, removeLike }) => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<SearchMeals   likedIds={likedIds} toggleLike={toggleLike} />} />
        <Route path="/meal/:id"       element={<MealDetails   likedIds={likedIds} toggleLike={toggleLike} />} />
        <Route path="/liked"          element={<LikedMeals    likedIds={likedIds} removeLike={removeLike} />} />
        <Route path="/categories"     element={<Categories />} />
        <Route path="/category/:name" element={<CategoryMeals likedIds={likedIds} toggleLike={toggleLike} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes
