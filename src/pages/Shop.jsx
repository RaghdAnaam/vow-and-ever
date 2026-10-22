import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [inStock, setInStock] = useState(false)
  const category = searchParams.get('category') ?? 'All pieces'

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === 'All pieces' || product.category === category
      const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch && (!inStock || product.stock > 0)
    })
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [category, search, sort, inStock])

  return (
    <div className="shop-page section">
      <div className="page-intro"><span className="eyebrow">THE CELEBRATION EDIT</span><h1>Find your <em>something.</em></h1><p>Little details, chosen with love. Take a look around.</p></div>
      <div className="shop-toolbar">
        <div className="category-tabs" aria-label="Filter by category">
          {['All pieces', ...categories.map(({ name }) => name)].map((name) => (
            <button key={name} className={category === name ? 'active' : ''} onClick={() => setSearchParams(name === 'All pieces' ? {} : { category: name })}>{name}</button>
          ))}
        </div>
        <div className="shop-filters">
          <label className="search-field"><Search size={16} /><span className="sr-only">Search products</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a little something" /></label>
          <label className="stock-toggle"><input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} /><span>In stock</span></label>
          <label className="sort-select"><SlidersHorizontal size={15} /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name</option></select></label>
        </div>
      </div>
      <div className="results-line">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} to fall for</div>
      {filtered.length ? <div className="product-grid shop-product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span>✳</span><h2>Nothing here just yet</h2><p>Try another search or browse all of our lovely pieces.</p><button className="button button-dark" onClick={() => { setSearch(''); setInStock(false); setSearchParams({}) }}>Show me everything</button></div>}
    </div>
  )
}
