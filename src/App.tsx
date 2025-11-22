import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './routes/Home';
import Sobre from './routes/Sobre';
import Integrantes from './routes/Integrantes';
import Contato from './routes/Contato';
import Cursos from './routes/Cursos';
import Usuarios from './routes/Usuarios';
import Habilidades from './routes/Habilidades';
import Matriculas from './routes/Matriculas';
import Recomendacoes from './routes/Recomendacoes';
import Pagamentos from './routes/Pagamentos';
import Login from './routes/Login';
import Perfil from './routes/Perfil';
import MeusCursos from './routes/MeusCursos';
import Configuracoes from './routes/Configuracoes';
import Callback from './routes/Callback';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const isAuthenticated = localStorage.getItem('accessToken');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isCallbackPage = location.pathname.startsWith('/callback');

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {!isLoginPage && !isCallbackPage && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/callback/:provider" element={<Callback />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/sobre" element={<ProtectedRoute><Sobre /></ProtectedRoute>} />
          <Route path="/integrantes" element={<ProtectedRoute><Integrantes /></ProtectedRoute>} />
          <Route path="/contato" element={<ProtectedRoute><Contato /></ProtectedRoute>} />
          <Route path="/cursos" element={<ProtectedRoute><Cursos /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          <Route path="/habilidades" element={<ProtectedRoute><Habilidades /></ProtectedRoute>} />
          <Route path="/matriculas" element={<ProtectedRoute><Matriculas /></ProtectedRoute>} />
          <Route path="/recomendacoes" element={<ProtectedRoute><Recomendacoes /></ProtectedRoute>} />
          <Route path="/pagamentos" element={<ProtectedRoute><Pagamentos /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/meus-cursos" element={<ProtectedRoute><MeusCursos /></ProtectedRoute>} />
          <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isLoginPage && !isCallbackPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
