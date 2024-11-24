import './App.css';
import React from 'react';
import { ItemsProvider } from './allGrocieries/allGrocieries';
import Header from './Components/homePage/header/header';
import MainPhoto from './Components/homePage/mainPhoto/mainPhoto';
import MainContent from './Components/homePage/mainContent/mainContent';
import Feedback from './Components/homePage/feedBack/feedBack';
import Footer from './Components/homePage/footer/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import BrowserRouter
import ItemPage from './Components/Catalog/ItemPage/ItemPage';
import Catalog from './Components/Catalog/CatalogPage/CatalogPage';
import CartPage from './Components/CartPage/CartPage';

function App() {
  return (
    <div className="App">
      <Router>
        <ItemsProvider>
          <Header />

          <Routes>
            <Route
              path="/" 
              element={
                <>
                  <MainPhoto />
                  <MainContent />
                  <Feedback />
                </>
              }
            />
            <Route path="/services" element={<Catalog />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="/CartPage" element={<CartPage />} />
          </Routes>

        </ItemsProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
