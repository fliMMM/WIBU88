import React from "react";
import SachMoi from "./components/SachMoi/SachMoi";
import Banner from "./components/Banner/Banner";
import SachBanChay from "./components/SachBanChay/SachBanChay";


function Home() {
  return (
    <div>
      <Banner/>
      <SachMoi/>
      <SachBanChay/>
    </div>
  );
}

export default Home;
