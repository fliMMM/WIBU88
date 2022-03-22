import React from "react";
import { Outlet } from "react-router-dom";
function Products(){
    return(
        <div style={{paddingTop: "50px"}}>
        <Outlet/>
        </div>
    )
}

export default Products;