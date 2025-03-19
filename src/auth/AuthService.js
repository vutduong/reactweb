import config from "../config";

export const adminLogin = async (email, password) => {
    try {
        const response = await fetch(`${config.API_URL}/admins?email=${email}&password=${password}`);
        const admins = await response.json();

        if (admins.length > 0) { // If matching admin exists
            localStorage.setItem("adminToken", "admin-authenticated");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error logging in:", error);
        return false;
    }
};

export const adminLogout = () => {
    localStorage.removeItem("adminToken");
};

export const isAdminAuthenticated = () => {
    return localStorage.getItem("adminToken") !== null;
};
