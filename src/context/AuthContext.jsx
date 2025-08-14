import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // Si hay un token, el usuario está autenticado
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token); // Guardar el token en localStorage
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
