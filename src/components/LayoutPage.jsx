import { useState } from "react";
import NavBar from "./NavBar";
import CartItems from "./CartItems";
import ProductList from "./ProductList";


function LayoutPage(){
  const [showPlants, setShowPlants]=useState(true);

  return(
      <div className="layout_page" id="layout">
        <NavBar onShowPlants={()=>{setShowPlants(true)}} onShowCartItems={()=>{setShowPlants(false)}}/>  
        <div className="content-area">
        {/* ProductList or CartItems renders here */}
          {showPlants?<ProductList/>:<CartItems onShowPlants={()=>{setShowPlants(true)}} />}

        </div>
      </div >
  );
}

export default LayoutPage;