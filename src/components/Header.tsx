import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ResKillPlus
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Início
            </Link>
            <Link to="/cursos" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Cursos
            </Link>
            <Link to="/usuarios" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Usuários
            </Link>
            <Link to="/integrantes" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Integrantes
            </Link>
            <Link to="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Sobre
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              aria-label="Alternar tema"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
