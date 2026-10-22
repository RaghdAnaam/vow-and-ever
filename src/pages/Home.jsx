import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, imageUrl, products } from '../data/products'

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-image" src={imageUrl('photo-1519741497674-611481863552', 2200)} alt="Sunlit wedding tables dressed with delicate florals" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow light-eyebrow"><Sparkles size={13} /> FOR YOUR BEAUTIFUL BEGINNING</span>
          <h1>The little things<br />make it <em>yours.</em></h1>
          <p>Thoughtful details, keepsake pieces and lovely finds for the day that feels like you.</p>
          <Link className="button button-light" to="/shop">Find your something <ArrowRight size={16} /></Link>
        </div>
        <span className="hero-caption">A celebration, thoughtfully collected · 2025</span>
        <a href="#categories" className="hero-scroll" aria-label="Scroll to categories"><ArrowDownRight size={19} /></a>
      </section>

      <section className="intro-strip">
        <span className="eyebrow">A LITTLE MORE YOU</span>
        <p>For the vows, the tables, the happy tears<br className="desktop-break" /> and all the lovely bits in between.</p>
        <span className="intro-flower">✳</span>
      </section>

      <section className="section category-section" id="categories">
        <div className="section-heading">
          <div><span className="eyebrow">FIND YOUR FEELING</span><h2>Made for your moment</h2></div>
          <Link className="text-link" to="/shop">Explore everything <ArrowRight size={15} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link key={category.name} to={`/shop?category=${encodeURIComponent(category.name)}`} className={`category-card category-card-${index + 1}`}>
              <img src={imageUrl(category.image, 750)} alt="" loading="lazy" />
              <span>{category.name}<ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section">
          <div className="section-heading">
            <div><span className="eyebrow">LOVED, FOR A REASON</span><h2>A few favourites</h2></div>
            <Link className="text-link" to="/shop">View all pieces <ArrowRight size={15} /></Link>
          </div>
          <div className="product-grid">
            {products.filter((product) => product.featured).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-image"><img src={imageUrl('photo-1464366400600-7168b8af9bc3', 1200)} alt="A beautifully styled table with flowers and candlelight" loading="lazy" /></div>
        <div className="story-copy"><span className="eyebrow">THE ART OF GATHERING</span><h2>Let the day<br />feel like <em>you.</em></h2><p>From the first envelope to the last dance, we believe your celebration should be filled with things that tell your story.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={16} /></Link></div>
      </section>
      <section className="quote-band"><span>“</span><p>For all the moments that<br />become <em>memories.</em></p><span className="eyebrow">VOW & EVER · THE CELEBRATION EDIT</span></section>
    </>
  )
}
