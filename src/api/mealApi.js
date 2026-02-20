/* All TheMealDB API calls live here — keep components clean */
const BASE = 'https://www.themealdb.com/api/json/v1/1'

const get = url => fetch(url).then(r => r.json())

export const searchByName   = name     => get(`${BASE}/search.php?s=${encodeURIComponent(name)}`)
export const searchByLetter = letter   => get(`${BASE}/search.php?f=${letter}`)
export const getMealById    = id       => get(`${BASE}/lookup.php?i=${id}`)
export const getCategories  = ()       => get(`${BASE}/categories.php`)
export const filterByCategory = cat   => get(`${BASE}/filter.php?c=${encodeURIComponent(cat)}`)
