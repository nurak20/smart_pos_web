// src/routers/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import RecentTransactionsTable from "../page/dasboard/layouts/RecentTransactionsTable";
import Product from "../page/products/Product";
import Category from "../page/category/Category";
import Login from "../page/login/Login";
import NotFound from "../page/not-found/NotFound";


export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<RecentTransactionsTable />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="*" element={<NotFound />} />
        {/* Add more routes as needed */}
    </Routes>
);
