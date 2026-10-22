import { useCallback, useEffect, useMemo, useState } from 'react'
import { ShopContext } from './shop-context-value'

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStored('vow-ever-cart', []))
  const [wishlist, setWishlist] = useState(() => readStored('vow-ever-wishlist', []))
  const [notice, setNotice] = useState('')

  useEffect(() => localStorage.setItem('vow-ever-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('vow-ever-wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const addToCart = useCallback((product, quantity = 1) => {
    if (product.stock < 1) {
      setNotice('This piece is currently out of stock.')
      return false
    }
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      const currentQuantity = existing?.quantity ?? 0
      if (currentQuantity + quantity > product.stock) {
        setNotice(`Only ${product.stock} available right now.`)
        return current
      }
      setNotice(`${product.name} added to your bag`)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    return true
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: Math.min(item.stock, quantity) } : item)
      .filter((item) => item.quantity > 0))
  }, [])

  const removeFromCart = useCallback((id) => setCart((current) => current.filter((item) => item.id !== id)), [])
  const toggleWishlist = useCallback((product) => {
    const saved = wishlist.some((item) => item.id === product.id)
    setWishlist((current) => saved
      ? current.filter((item) => item.id !== product.id)
      : [...current, product])
    setNotice(saved ? 'Removed from your wishlist' : 'Saved to your wishlist')
  }, [wishlist])
  const clearCart = useCallback(() => setCart([]), [])

  const value = useMemo(() => ({
    cart,
    wishlist,
    notice,
    setNotice,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    clearCart,
  }), [cart, wishlist, notice, addToCart, updateQuantity, removeFromCart, toggleWishlist, clearCart])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
