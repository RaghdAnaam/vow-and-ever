import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, imageUrl } from '../data/products'
import { useShop } from '../context/useShop'

export default function Checkout() {
  const { cart, clearCart } = useShop()
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const submitOrder = (event) => {
    event.preventDefault()
    if (!cart.length) return
    const data = new FormData(event.currentTarget)
    const order = { reference: `VE-${Date.now().toString().slice(-7)}`, name: data.get('name'), email: data.get('email'), total, createdAt: new Date().toISOString() }
    localStorage.setItem('vow-ever-last-order', JSON.stringify(order))
    clearCart()
    navigate('/order-confirmation')
  }
  if (!cart.length) return <div className="empty-state checkout-empty"><span className="eyebrow">YOUR BAG IS EMPTY</span><h2>Let’s find your something.</h2><Link className="button button-dark" to="/shop">Browse the collection</Link></div>

  return <div className="section checkout-page"><div className="page-intro"><span className="eyebrow">ONE LAST LOVELY DETAIL</span><h1>Make it <em>yours.</em></h1><p>Just a few details and these little things are on their way.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submitOrder}><span className="eyebrow">DELIVERY DETAILS</span><div className="form-grid"><label className="field full-field">Your name<input name="name" autoComplete="name" required minLength="2" /></label><label className="field">Email address<input name="email" type="email" autoComplete="email" required /></label><label className="field">Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><label className="field full-field">Delivery address<input name="address" autoComplete="street-address" required /></label><label className="field">City<input name="city" autoComplete="address-level2" required /></label><label className="field">State<input name="state" autoComplete="address-level1" required /></label><label className="field">Postcode<input name="postcode" inputMode="numeric" autoComplete="postal-code" required pattern="[0-9]{5}" title="Enter a 5-digit postcode" /></label><label className="field full-field">A note for us <span className="optional">Optional</span><textarea name="notes" rows="3" /></label></div><label className="demo-payment"><input type="checkbox" required /><span><strong>Simulated payment</strong><small>This is a portfolio demo. No payment will be collected and no card details are requested.</small></span></label><button type="submit" className="button button-dark submit-order">Place demo order <ArrowRight size={16} /></button><Link to="/cart" className="continue-link">Return to your bag</Link></form><aside className="checkout-summary"><span className="eyebrow">YOUR ORDER</span>{cart.map((item) => <div className="checkout-product" key={item.id}><img src={imageUrl(item.image, 180)} alt="" /><div><strong>{item.name}</strong><span>Qty {item.quantity}</span></div><b>{formatPrice(item.price * item.quantity)}</b></div>)}<div className="summary-row"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><div className="summary-row"><span>Delivery</span><span>Complimentary</span></div><div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div><p className="summary-note">Prices shown in Malaysian Ringgit (RM).</p></aside></div></div>
}
