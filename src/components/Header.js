import React from 'react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'

function Header(props) {
  const { totalPrice } = useCart()
  return (
    <header className="d-flex justify-between align-center p-40 ">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Sneaker's shop</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex flex-row">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img
            className="mr-20 cu-p"
            width={20}
            height={20}
            src="img/cart.svg"
            alt="Cart"
          />
          <span>{totalPrice} $</span>
        </li>
        <li>
          <Link to="favorites">
            <img
              className="mr-20 cu-p"
              width={20}
              height={20}
              src="img/favorite.svg"
              alt="Favorites"
            />
          </Link>
        </li>
        <li>
          <Link to="orders">
            <img width={20} height={20} src="img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
