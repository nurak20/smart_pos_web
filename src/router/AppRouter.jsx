// src/routers/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import RecentTransactionsTable from "../page/dasboard/layouts/RecentTransactionsTable";
import Product from "../page/products/Product";
import Category from "../page/category/Category";
import Login from "../page/login/Login";
import NotFound from "../page/not-found/NotFound";
import Profile from "../page/profile/Profile";
import POSAdminSystem from "../pos/Pos";
import ImprovedOrderDetails from "../page/order-detail/Order-detail";
import OrderDetailsPage from "../page/product-detail/Product-Detail";


export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<RecentTransactionsTable />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category" element={<Category/>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pos" element={<POSAdminSystem />} />
        <Route path="/order" element={<ImprovedOrderDetails />} />
        <Route path="/productd" element={<OrderDetailsPage />} />

    </Routes>
);
