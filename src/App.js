import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [favorites, setFavorites] = React.useState([])
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
    axios
      .get('https://64d9fc1fe947d30a260a97e2.mockapi.io/favorites')
      .then((res) => {
        setFavorites(res.data)
      })
  }, [])
  // добавили новый объект к старым данным в массиве
  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://64d9fc1fe947d30a260a97e2.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      )
    } else {
      axios.post('https://64d9fc1fe947d30a260a97e2.mockapi.io/cart', obj)
      setCartItems((prev) => [...prev, obj])
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`/favorites/${obj.id}`)
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://64ddf2d1825d19d9bfb1c4c7.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Failed to add to favorites')
    }
  }

  const onRemoveItem = (id) => {
    console.log(id)
    axios.delete(`https://64d9fc1fe947d30a260a97e2.mockapi.io/cart/${id}`)
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    )
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
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
      </Routes>
      <Routes>
        <Route
          path="/favorites"
          exact
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default App
