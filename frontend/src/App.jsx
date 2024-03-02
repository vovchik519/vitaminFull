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
import FeedbackPage from './pages/Feedback/Feedback';

const App = () => {
  let server = 'https://vitamin-art.ru:4444';
  let lang = localStorage.getItem('selectedLanguage');
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleDataLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100)
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
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
          <Route path="/" index element={<FirstPage onLoading={handleDataLoaded} />} />
          <Route path="/home" element={<Home onLoading={handleDataLoaded} />} />
          <Route path="/about" element={<About onLoading={handleDataLoaded} />} />
          <Route path="/for-kids" element={<Article onLoading={handleDataLoaded} />} />
          <Route path="/item" element={<Item onLoading={handleDataLoaded} />} />
          <Route path="/poem" element={<PoemItem onLoading={handleDataLoaded} />} />
          <Route path="/gallery" element={<Gallery onLoading={handleDataLoaded} />} />
          <Route path="/storeroom" element={<Pantry onLoading={handleDataLoaded} />} />
          <Route path="/feedback" element={<FeedbackPage onLoading = { handleDataLoaded } />} />
          <Route path="/store" element={<Shop onLoading={handleDataLoaded} />} />
          <Route path="/store/item" element={<Product onLoading={handleDataLoaded} />} />
          <Route path="/store/order-placement" element={<OrderPlacement onLoading={handleDataLoaded} />} />
          <Route path="*" element={<NotFound onLoading={handleDataLoaded} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;