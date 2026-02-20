import { useState, useEffect } from 'react'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        setCategories(data.categories || [])
      } catch {
        setError('Failed to load categories.')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Meal Categories 📂</h1>
        <p className="page-subtitle">Explore meals by category</p>
      </div>

      {loading && <div className="loading"><div className="spinner" /> Loading categories…</div>}
      {error && <div className="error-msg">{error}</div>}

      {!loading && !error && (
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.idCategory} className="category-card">
              <div className="category-img-wrap">
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="category-img"
                  loading="lazy"
                />
              </div>
              <div className="category-body">
                <h3 className="category-name">{cat.strCategory}</h3>
                <p className="category-desc">
                  {cat.strCategoryDescription.length > 100
                    ? cat.strCategoryDescription.slice(0, 100) + '…'
                    : cat.strCategoryDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
