import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            ResKillPlus
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

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 font-semibold text-sm">
                    U
                  </div>
                  <svg className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Minha Conta</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">usuario@email.com</p>
                    </div>
                    <Link
                      to="/perfil"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Ver Perfil
                    </Link>
                    <Link
                      to="/meus-cursos"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Meus Cursos
                    </Link>
                    <Link
                      to="/configuracoes"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Configurações
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                Entrar
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
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>
                <Link to="/perfil" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Meu Perfil
                </Link>
                <Link to="/meus-cursos" onClick={() => setMenuOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Meus Cursos
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-2 transition-colors flex items-center gap-2 w-full text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all text-center"
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
