import './App.css';
import React from 'react';
import { ItemsProvider } from './allGrocieries/allGrocieries';
import Header from './Components/homePage/header/header';
import MainPhoto from './Components/homePage/mainPhoto/mainPhoto';
import MainContent from './Components/homePage/mainContent/mainContent';
import Feedback from './Components/homePage/feedBack/feedBack';
import Footer from './Components/homePage/footer/footer';
import { Route, Routes } from 'react-router-dom';
import ItemPage from './Components/Catalog/ItemPage/ItemPage';
import Catalog from './Components/Catalog/CatalogPage/CatalogPage'

function App() {
  return (
    <div className="App">
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
          <Route path="/services" element={<Catalog/>} />
          <Route path="item/:id" element={<ItemPage/>} />
        </Routes>

      </ItemsProvider>
      <Footer />
    </div>
  );
}

export default App;
