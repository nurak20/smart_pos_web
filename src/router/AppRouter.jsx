// src/routers/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import RecentTransactionsTable from "../page/dasboard/layouts/RecentTransactionsTable";
import Product from "../page/products/Product";


export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<RecentTransactionsTable />} />
        <Route path="/product" element={<Product />} />
    </Routes>
);
