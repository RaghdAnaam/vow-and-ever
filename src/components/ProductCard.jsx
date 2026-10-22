import { Heart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, imageUrl } from '../data/products'
import { useShop } from '../context/useShop'

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop()
  const saved = wishlist.some((item) => item.id === product.id)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img src={imageUrl(product.image, 700)} alt={product.name} loading="lazy" />
        </Link>
        {product.label && <span className="product-label">{product.label}</span>}
        <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" onClick={() => addToCart(product)} disabled={product.stock === 0} aria-label={`Add ${product.name} to bag`}>
          <Plus size={15} /> <span>{product.stock ? 'Add to bag' : 'Sold out'}</span>
        </button>
      </div>
      <div className="product-meta"><span>{product.category}</span><span>{product.stock ? 'In stock' : 'Sold out'}</span></div>
      <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
      <p className="product-price">{formatPrice(product.price)}</p>
    </article>
  )
}
