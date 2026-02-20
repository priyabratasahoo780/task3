import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(r => r.json())
      .then(data => setCategories(data.categories || []))
      .catch(() => setError('Failed to load categories.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        <p className="page-subtitle">Click a category to explore its meals</p>
      </div>

      {loading && <div className="loading"><div className="spinner" /> Loading…</div>}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && (
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.idCategory} className="card" onClick={() => navigate(`/category/${encodeURIComponent(cat.strCategory)}`)}>
              <div className="card-img-wrap">
                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="card-img" loading="lazy" />
              </div>
              <div className="cat-body">
                <p className="cat-name">{cat.strCategory}</p>
                <p className="cat-desc">
                  {cat.strCategoryDescription.length > 90
                    ? cat.strCategoryDescription.slice(0, 90) + '…'
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
