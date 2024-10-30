import './App.css';
import React from 'react' 
import Header from './Components/header/header';
import MainPhoto from './Components/mainPhoto/mainPhoto';
import MainContent from './Components/mainContent/mainContent';
import Feedback from './Components/feedBack/feedBack';
import Footer from './Components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainPhoto/>
      <MainContent/>
      <Feedback/>
      <Footer/>
    </div>
  );
}

export default App;
