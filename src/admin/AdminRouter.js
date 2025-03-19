import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { isAdminAuthenticated } from "../auth/AuthService";
import AdminHeader from "./AdminHeader";
import ProductsManager from "./adminComponents/products/ProductsManager";
import ProductsCategory from "./adminComponents/products/ProductsCategory";
import ProductInfo from "./adminComponents/products/ProductInfo";

const AdminRoutes = () => {
    return (
        <>
            <AdminHeader />
            <Routes>
                <Route path="/productsmgr" element={isAdminAuthenticated() ?<ProductsManager />  : <Navigate to="/admin/login" />} />
                <Route path="/productinfo/:id" element={isAdminAuthenticated() ? <ProductInfo /> : <Navigate to="/admin/login" />} />
                <Route path="/productscategory" element={isAdminAuthenticated() ? <ProductsCategory /> : <Navigate to="/admin/login" />} />   
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/dashboard" element={isAdminAuthenticated() ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
            </Routes>
        </>
    );
};

export default AdminRoutes;
