import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            ResKillPlus
          </Link>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/cursos" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Cursos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/usuarios" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Usuários
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/habilidades" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Habilidades
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/matriculas" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Matrículas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/recomendacoes" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Recomendações
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/pagamentos" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Pagamentos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/integrantes" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Integrantes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/sobre" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contato" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Alternar tema"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Início
            </Link>
            <Link to="/cursos" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Cursos
            </Link>
            <Link to="/usuarios" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Usuários
            </Link>
            <Link to="/habilidades" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Habilidades
            </Link>
            <Link to="/matriculas" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Matrículas
            </Link>
            <Link to="/recomendacoes" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Recomendações
            </Link>
            <Link to="/pagamentos" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Pagamentos
            </Link>
            <Link to="/integrantes" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Integrantes
            </Link>
            <Link to="/sobre" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Sobre
            </Link>
            <Link to="/contato" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors">
              Contato
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-left transition-colors"
              aria-label="Alternar tema"
            >
              {isDarkMode ? '🌞 Modo Claro' : '🌙 Modo Escuro'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
