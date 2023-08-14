function Header(props) {
  console.log(props)
  return (
    <header className="d-flex justify-between align-center p-40 ">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Sneaker's shop</p>
        </div>
      </div>

      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" />
          <span>333 dollars</span>
        </li>
        <li>
          <img width={20} height={20} src="/img/user.svg" />
        </li>
      </ul>
    </header>
  )
}

export default Header
