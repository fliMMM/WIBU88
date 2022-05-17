import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProductContextProvider from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import OrderContextProvider from "./context/OrderContext";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./components/AppLayouts/Header/Header";
import { SnackbarProvider } from "notistack";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ReadOnline from "./pages/ReadOnline";
import OrderHistory from "./pages/orderHistory";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ReadingTrial from "./pages/readingTrial";
const DangKi = React.lazy(() => import("./pages/DangKi/Dangki"));
const DangNhap = React.lazy(() => import("./pages/DangNhap/Dangnhap"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const User = React.lazy(() => import("./pages/UserAccount/User"));
const ProductList = React.lazy(() => import("./pages/ProductList/Products"));
const ThanhToan = React.lazy(() => import("./pages/ThanhToan/index"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return (
    <div style={{ position: "relative" }}>
      <SnackbarProvider maxSnack={4}>
        <ProductContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <Header />
              <Suspense
                fallback={
                  <div style={{ margin: "400px 50%", minWidth: "100%" }}>
                    <CircularProgress />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="sign-up" element={<DangKi />} />
                  <Route path="sign-in" element={<DangNhap />} />
                  <Route path="reading-trial" element={<ReadingTrial />} />
                  <Route path="all" element={<ProductList/>} />
                  <Route path="products">
                    <Route path=":id" element={<ProductDetail />} />
                  </Route>

                  
                  {isAuthenticated && <Route path="cart" element={<Cart />} />}
                  {isAuthenticated && (
                    <Route path="user-profile" element={<User />} />
                  )}
                  {isAuthenticated && (
                    <Route path="order" element={<ThanhToan />} />
                  )}
                  {isAuthenticated && (
                    <Route path="orderHistory" element={<OrderHistory />} />
                  )}
                  {isAuthenticated && (
                    <Route path="readOnline" element={<ReadOnline />} />
                  )}

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </OrderContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
