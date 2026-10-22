import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Heart, Menu, ShoppingBag, X } from 'lucide-react'
import { useShop } from '../context/useShop'

const copyrightYear = new Date().getFullYear()

export function SiteLayout() {
  const { cart, wishlist } = useShop()
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="announcement">A little something lovely, for your once-in-a-lifetime day</div>
      <header className="site-header">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="Vow and Ever home">
          <span className="brand-mark">v.</span>
          <span>vow <i>&</i> ever<small>THE CELEBRATION EDIT</small></span>
        </Link>
        <button className="menu-toggle icon-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/shop" onClick={closeMenu}>Shop all</NavLink>
          <a href="/#categories" onClick={closeMenu}>Categories</a>
          <NavLink to="/wishlist" onClick={closeMenu}>Our edit</NavLink>
          <NavLink to="/account" onClick={closeMenu}>Account</NavLink>
        </nav>
        <div className="header-actions">
          <NavLink to="/wishlist" className="icon-button" aria-label={`Wishlist, ${wishlist.length} saved`}>
            <Heart size={19} />
            {wishlist.length > 0 && <span className="count-badge">{wishlist.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="icon-button bag-link" aria-label={`Shopping bag, ${cartCount} items`}>
            <ShoppingBag size={19} />
            <span>Bag</span>
            <span className="count-badge">{cartCount}</span>
          </NavLink>
        </div>
      </header>
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">v.</span>
            <span>vow <i>&</i> ever<small>THE CELEBRATION EDIT</small></span>
          </Link>
          <p>Thoughtful little details for the day you’ll remember forever.</p>
        </div>
        <div><h3>Explore</h3><Link to="/shop">Shop all</Link><Link to="/shop?category=Invitations">Invitations</Link><Link to="/wishlist">Our edit</Link></div>
        <div><h3>Here to help</h3><a href="mailto:hello@vowandever.example">Contact us</a><Link to="/account">Your account</Link><Link to="/cart">Your bag</Link></div>
        <div className="newsletter"><h3>A note from us</h3><p>Little ideas, new arrivals and inspiration for your celebration.</p><form onSubmit={(event) => { event.preventDefault(); window.alert('Thank you for joining our little list!') }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button aria-label="Subscribe">Join <span>↗</span></button></form></div>
      </div>
      <div className="footer-bottom"><span>© {copyrightYear} Vow & Ever. Made with love.</span><span>Thoughtfully chosen, always.</span></div>
    </footer>
  )
}
