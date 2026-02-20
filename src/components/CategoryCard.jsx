import { motion } from 'framer-motion'

const CategoryCard = ({ category, onClick, index }) => (
  <motion.div
    className="cat-card"
    onClick={onClick}
    whileHover={{ y: -4 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, delay: index * 0.03 }}
  >
    <div className="cat-card-img-wrap">
      <img src={category.strCategoryThumb} alt={category.strCategory} className="cat-card-img" loading="lazy" />
    </div>
    <div className="cat-card-body">
      <p className="cat-card-name">{category.strCategory}</p>
      <p className="cat-card-desc">
        {category.strCategoryDescription.length > 80
          ? category.strCategoryDescription.slice(0, 80) + '…'
          : category.strCategoryDescription}
      </p>
    </div>
  </motion.div>
)

export default CategoryCard
