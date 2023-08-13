import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

const arr = [
  {
    title: 'Nike Blazer Mid Suede',
    price: 500,
    imageUrl: '/img/sneakers/1.jpg',
  },
  {
    title: 'Nike Air Max 270',
    price: 555,
    imageUrl: '/img/sneakers/2.jpg',
  },
  {
    title: '550 White Pink Sea Salt',
    price: 533,
    imageUrl: '/img/sneakers/3.jpg',
  },
  {
    title: '9060 Rain Cloud',
    price: 566,
    imageUrl: '/img/sneakers/4.jpg',
  },
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
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
            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
