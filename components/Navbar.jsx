import React from 'react'
import Link from 'next/Link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, setUser } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Crop N' Stop</Link>
      </p>
      <p>
        {user ? (
          <h5>{user.username}</h5>
        ) : (
          <Link href="/register">
            <a className="nav-link">Sign up</a>
          </Link>
        )}
      </p>
      <p>
        {user ? (
          <Link href="/">
            <a
              className="nav-link"
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              Logout
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="nav-link">Sign in</a>
          </Link>
        )}
      </p>
      <button type="button"
      className="cart-icon"
      onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar