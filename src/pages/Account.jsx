import { ArrowRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Account() {
  return <div className="account-page"><div className="account-card"><div className="account-icon"><LockKeyhole size={21} /></div><span className="eyebrow">YOUR OWN LITTLE CORNER</span><h1>Good things<br />are <em>coming.</em></h1><p>Your account will be ready in the next project stage, with a place for your profile, wishlist and order history.</p><div className="account-note">For now, your wishlist and shopping bag are saved on this device.</div><Link className="button button-dark" to="/shop">Keep exploring <ArrowRight size={16} /></Link></div></div>
}
