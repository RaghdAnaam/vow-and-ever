import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useShop } from '../context/useShop'

export default function Wishlist() {
  const { wishlist } = useShop()
  return <div className="section collection-page"><div className="page-intro"><span className="eyebrow">YOUR LITTLE SHORTLIST</span><h1>Things you <em>love.</em></h1><p>Keep your favourite details close while you plan.</p></div>{wishlist.length ? <div className="product-grid">{wishlist.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><Heart size={25} strokeWidth={1.3} /><h2>A little space for lovely things</h2><p>Save the pieces you love and they’ll be waiting right here.</p><Link className="button button-dark" to="/shop">Find your favourites</Link></div>}</div>
}
