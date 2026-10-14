import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import ProductList from "./components/ProductList/ProductList";

function App() {
  const [showProductList, setShowProductList] = useState(false);
  
  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app">
      {!showProductList ? (
        <LandingPage onGetStarted={handleGetStarted}/>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
