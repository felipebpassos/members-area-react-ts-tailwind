import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="text-lg">Desculpe, a página que você está procurando não existe.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

