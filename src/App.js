import React from 'react'
import axios from 'axios'
import Card from './components/Card/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    // fetch('https://64d9fc1fe947d30a260a97e2.mockapi.io/Items')
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((json) => {
    //     setItems(json)
    //   })
    axios
      .get('https://64d9fc1fe947d30a260a97e2.mockapi.io/Items')
      .then((res) => {
        setItems(res.data)
      })
    axios
      .get('https://64d9fc1fe947d30a260a97e2.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data)
      })
  }, [])
  // добавили новый объект к старым данным в массиве
  const onAddToCart = (obj) => {
    axios.post('https://64d9fc1fe947d30a260a97e2.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    // console.log(id)
    // axios.delete(`https://64d9fc1fe947d30a260a97e2.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      ) : null}

      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Searching by request: "${searchValue}"`
              : 'All sneakers'}
          </h1>
          <div className="search-block d-flex">
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Searching..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.imageUrl}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Add to favorite')}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
