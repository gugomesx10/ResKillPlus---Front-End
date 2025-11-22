import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import logo from '../../assets/ResKillPlus.png';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserMenuOpen(false);
    navigate('/login');
  };

  const user = authService.getUser();

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="ResKillPlus" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">ResKillPlus</span>
          </Link>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-3 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label="Menu"
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
            <Link to="/sobre" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Sobre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contato" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group">
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 relative group flex items-center gap-1"
              >
                Mais
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50">
                  <Link to="/usuarios" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Usuários
                  </Link>
                  <Link to="/habilidades" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Habilidades
                  </Link>
                  <Link to="/matriculas" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Matrículas
                  </Link>
                  <Link to="/recomendacoes" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Recomendações
                  </Link>
                  <Link to="/pagamentos" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Pagamentos
                  </Link>
                  <Link to="/integrantes" onClick={() => setMoreMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                    Integrantes
                  </Link>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Alternar tema"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-50">
                    <Link to="/perfil" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                      Ver Perfil
                    </Link>
                    <Link to="/meus-cursos" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                      Meus Cursos
                    </Link>
                    <Link to="/configuracoes" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
                      Configurações
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-800" />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm">
                  Entrar
                </button>
              </Link>
            )}
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
