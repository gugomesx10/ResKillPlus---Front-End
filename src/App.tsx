import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/integrantes" element={<Integrantes />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/habilidades" element={<Habilidades />} />
              <Route path="/matriculas" element={<Matriculas />} />
              <Route path="/recomendacoes" element={<Recomendacoes />} />
              <Route path="/pagamentos" element={<Pagamentos />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
