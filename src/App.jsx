import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import RestaurantMenu from './components/RestaurantMenu';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
function App() {
  return (
 <Provider store={appStore}>
     <BrowserRouter>
      <Header />


      <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
</Routes>
    </BrowserRouter>
 </Provider>
  );
}

export default App;



