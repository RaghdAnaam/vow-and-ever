import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/SiteLayout'
import { ShopProvider } from './context/ShopContext'
import { useShop } from './context/useShop'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Shop from './pages/Shop'
import Wishlist from './pages/Wishlist'

function AppContent() {
  const { notice } = useShop()
  return (
    <>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<Confirmation />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      {notice && <div className="toast" role="status">{notice}</div>}
    </>
  )
}

export default function App() {
  return <BrowserRouter><ShopProvider><AppContent /></ShopProvider></BrowserRouter>
}
