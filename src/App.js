import React from 'react'
import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

const arr = [
  {
    title: "Men's sneakers Nike Blazer Mid Suede",
    price: 199,
    imageUrl: './img/sneakers/1.jpg',
  },
  {
    title: "Men's sneakers Nike Air Max 270",
    price: 129,
    imageUrl: './img/sneakers/2.jpg',
  },
  {
    title: "Men's sneakers Nike Blazer Mid Suede",
    price: 99,
    imageUrl: './img/sneakers/3.jpg',
  },
  {
    title: "Men's sneakers Puma X Aka Boku Future Rider",
    price: 59,
    imageUrl: './img/sneakers/4.jpg',
  },
  {
    title: "Men's sneakers Under Armour Curry 8",
    price: 79,
    imageUrl: './img/sneakers/5.jpg',
  },
  {
    title: "Men's sneakers Nike Kyrie 7",
    price: 329,
    imageUrl: './img/sneakers/6.jpg',
  },
  {
    title: "Men's sneakers Jordan Air Jordan 11",
    price: 69,
    imageUrl: './img/sneakers/7.jpg',
  },
  {
    title: "Men's sneakers Nike LeBron XVIII",
    price: 89,
    imageUrl: './img/sneakers/8.jpg',
  },
  {
    title: "Men's sneakers Nike Lebron XVIII Low",
    price: 139,
    imageUrl: './img/sneakers/9.jpg',
  },
  {
    title: "Men's sneakers Nike Kyrie Flytrap IV",
    price: 149,
    imageUrl: './img/sneakers/10.jpg',
  },
  {
    title: "Men's sneakers Nike Blazer Mid Suede Low",
    price: 129,
    imageUrl: './img/sneakers/11.jpg',
  },
  {
    title: "Men's sneakers Puma Sport Aka Boku Future Rider",
    price: 39,
    imageUrl: './img/sneakers/12.jpg',
  },
]

function App() {
  const [cartOpened, setCartOpened] = React.useState(false)

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer onClose={() => setCartOpened(false)} /> : null}

      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Searching..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={() => console.log('Add to favorite')}
              onPlus={() => console.log('Add to cart')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
