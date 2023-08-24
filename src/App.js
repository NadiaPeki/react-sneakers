import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Drawer from './components/Drawer/Drawer'
import AppContext from './contex'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://64d9fc1fe947d30a260a97e2.mockapi.io/cart'),
            axios.get('https://64ddf2d1825d19d9bfb1c4c7.mockapi.io/favorites'),
            axios.get('https://64d9fc1fe947d30a260a97e2.mockapi.io/Items'),
          ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Something get wrong!')
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.parentId) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://64d9fc1fe947d30a260a97e2.mockapi.io/cart/${obj.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        await axios.post(
          'https://64d9fc1fe947d30a260a97e2.mockapi.io/cart',
          obj
        )
      }
    } catch (error) {
      alert('Something get wrong!')
    }
  }

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(
        `https://64d9fc1fe947d30a260a97e2.mockapi.io/cart/${id}`
      )
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(id))
      )
    } catch (error) {
      alert('Something get wrong!')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://64ddf2d1825d19d9bfb1c4c7.mockapi.io/favorites/${obj.id}`
        )
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
      alert('Something get wrong!')
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path="/favorites" exact element={<Favorites />}></Route>

          <Route path="/orders" exact element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
