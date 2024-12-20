// GoogleAuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

export const GoogleAuthContext = createContext();

export const GoogleAuthProvider = ({ children }) => {
    const [gg_token, setGgToken] = useState(null);
    const [gg_isLogin, setGgIsLogin] = useState(false);
    const [gg_loading, setGgLoading] = useState(false);
    const [gg_error, setGgError] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('app_token');
        const savedIsLogin = localStorage.getItem('isLogin') === 'true';
        if (savedToken) {
            setGgToken(savedToken);
            setGgIsLogin(savedIsLogin);
        }
    }, []);

    useEffect(() => {
        if (gg_token !== null) {
            localStorage.setItem('app_token', gg_token);
        } else {
            localStorage.removeItem('app_token');
        }

        if (gg_isLogin !== false) {
            localStorage.setItem('isLogin', gg_isLogin);
        } else {
            localStorage.removeItem('isLogin');
        }
    }, [gg_token, gg_isLogin]);

    const gg_logout = () => {
        setGgToken(null);
        setGgIsLogin(false);
        setGgLoading(false);
        setGgError(null);
       
        localStorage.removeItem('gg_token');
    localStorage.removeItem('gg_isLogin');
    };

    const authenticateWithGoogle = async (credential) => {
        setGgLoading(true);
        try {
            const response = await fetch("http://localhost:8080/auth/google", {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: credential,
            });

            if (!response.ok) {
                throw new Error(`Failed to authenticate. Status: ${response.status}`);
            }

            const GGtoken = await response.text();
            setGgToken(GGtoken);
            setGgIsLogin(true);
        } catch (err) {
            setGgError("Có lỗi xảy ra khi đăng nhập: " + err.message);
            setGgIsLogin(false);
        } finally {
            setGgLoading(false);
        }
    };



    return (
        <GoogleAuthContext.Provider
            value={{
                gg_token,
                gg_isLogin,
                gg_loading,
                gg_error,
                authenticateWithGoogle,
                gg_logout,
            }}
        >
            {children}
        </GoogleAuthContext.Provider>
    );
};
