// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importando o Provider
import { PersistGate } from 'redux-persist/integration/react'; // Importando o PersistGate
import { store, persistor } from './redux/store'; // Importando o store e o persistor
import Login from './pages/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ModuloPage from './pages/Dashboard/ModuloPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/modulo/:id" element={<ProtectedRoute element={<ModuloPage />} />} />
            <Route path="*" element={<ProtectedRoute element={<NotFoundPage />} />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
