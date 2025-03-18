import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";


const AdminRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/admin"/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
            </Routes>
        </Router>
    )
}
export default AdminRouter;