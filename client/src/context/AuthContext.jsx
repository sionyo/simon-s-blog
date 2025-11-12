import { createContext, useState, useContext, useEffect } from "react";
import api from '../utils/api'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');
        if(token) {
            try {
                const response = await api.get('/auth/me');
                setAdmin(response.data.admin);
            } catch(error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('adminToken');
                localStorage.removeItem('admin');
            }
        }
        setLoading(false);
    }

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', {email, password});
            const {token, admin} = response.data;
            localStorage.setItem('adminToken', token);
            localStorage.setItem('admin', JSON.stringify(admin));
            setAdmin(admin);

            return { success: true};
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        setAdmin(null);
    }

    const value = {
        admin,
        login,
        logout,
        loading,
        isAuthenticated: !!admin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}