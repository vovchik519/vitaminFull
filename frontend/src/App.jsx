import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import FirstPage from './pages/FirstPage/FirstPage';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Article from './pages/Article/Article';
import Item from './pages/Item/Item';
import Gallery from './pages/Gallery/Gallery';
import Pantry from './pages/Pantry/Pantry';
import PoemItem from './pages/PoemItem/PoemItem';
import Preloader from './components/Preloader/Preloader';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product/Product';
import OrderPlacement from './pages/OrderPlacement/OrderPlacement';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  let server = 'http://185.251.88.31:1337';
  let lang = localStorage.getItem('selectedLanguage');
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500)
  }, [navigation]);

  const location = useLocation().pathname;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='app'>
      {isLoading ? (
        <Preloader />
      ) : null}
      <div className={isLoading ? 'hidden' : null}>
        <Routes>
          <Route path="/" index element={<FirstPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/for-kids" element={<Article />} />
          <Route path="/item" element={<Item />} />
          <Route path="/poem" element={<PoemItem />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/store" element={<Shop />} />
          <Route path="/store/item" element={<Product />} />
          <Route path="/store/order-placement" element={<OrderPlacement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;