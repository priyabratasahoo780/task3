import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCategories from '../hooks/useCategories'
import CategoryCard from '../components/CategoryCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Categories = () => {
  const { categories, loading, error } = useCategories()
  const navigate = useNavigate()

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="page-header">
        <h1>Browse by Category</h1>
        <p>Select a category to explore its recipes</p>
      </div>

      {loading && <LoadingSpinner text="Loading categories…" />}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && (
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.idCategory}
              category={cat}
              index={i}
              onClick={() => navigate(`/category/${encodeURIComponent(cat.strCategory)}`)}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Categories
