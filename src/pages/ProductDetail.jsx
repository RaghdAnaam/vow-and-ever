import { useState } from 'react'
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { formatPrice, imageUrl, products } from '../data/products'
import { useShop } from '../context/useShop'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, wishlist, toggleWishlist } = useShop()
  if (!product) return <div className="not-found section"><span className="eyebrow">OH, DEAR</span><h1>We couldn’t find that piece.</h1><Link to="/shop" className="button button-dark">Back to the shop</Link></div>
  const saved = wishlist.some((item) => item.id === product.id)
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  return (
    <div className="section detail-page">
      <Link to="/shop" className="back-link"><ArrowLeft size={15} /> Back to the collection</Link>
      <div className="detail-grid">
        <div className="detail-image"><img src={imageUrl(product.image, 1200)} alt={product.name} /></div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="detail-description">{product.description}</p>
          <p className={`stock-note ${product.stock ? '' : 'out-of-stock'}`}>{product.stock ? `${product.stock} lovely pieces available` : 'Currently out of stock'}</p>
          <div className="detail-actions"><div className="quantity-stepper"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(product.stock || 1, value + 1))} aria-label="Increase quantity" disabled={quantity >= product.stock}><Plus size={15} /></button></div><button className="button button-dark add-detail" disabled={!product.stock} onClick={() => addToCart(product, quantity)}><ShoppingBag size={16} /> Add to your bag</button><button className={`detail-heart ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button></div>
          <div className="detail-note"><span>✳</span><p>Thoughtfully chosen for the moments you’ll keep close. Packed with care, always.</p></div>
        </div>
      </div>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><span className="eyebrow">A LITTLE MORE TO LOVE</span><h2>More from {product.category.toLowerCase()}</h2></div><Link className="text-link" to={`/shop?category=${encodeURIComponent(product.category)}`}>See all <ArrowLeft className="arrow-forward" size={15} /></Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  )
}
