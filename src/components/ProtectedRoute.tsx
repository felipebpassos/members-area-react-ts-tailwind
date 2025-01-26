import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { validateToken } from '../api/auth'; // Função para validar o token

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Pegando o token do Redux
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                const isValid = await validateToken(token);
                setIsAuthenticated(isValid);
            } else {
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="loading-overlay">
                <img src="/spinner.png" alt="Loading..." className="spinner" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />; // Redireciona para o login se não estiver autenticado
    }

    return <>{element}</>; // Retorna o componente da rota caso esteja autenticado
};

export default ProtectedRoute;
