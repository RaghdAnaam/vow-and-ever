import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
  let order = null
  try { order = JSON.parse(localStorage.getItem('vow-ever-last-order') ?? 'null') } catch { order = null }
  return <div className="confirmation-page"><div className="confirmation-icon"><Check size={26} /></div><span className="eyebrow">A MOMENT TO REMEMBER</span><h1>Thank you, <em>{order?.name?.split(' ')[0] || 'lovely'}.</em></h1><p>Your demo order is all wrapped up. We’re so glad you found something that feels like you.</p>{order && <div className="confirmation-reference"><span>YOUR ORDER REFERENCE</span><strong>{order.reference}</strong></div>}<div className="demo-disclaimer">This is a simulated checkout for demonstration only. No payment was taken and this order was not sent to a store.</div><Link to="/shop" className="button button-dark">Back to the collection</Link></div>
}
