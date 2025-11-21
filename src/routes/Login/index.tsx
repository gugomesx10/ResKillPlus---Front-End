import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Login = () => {
  const navigate = useNavigate();
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleGitHubLogin = () => {
    authService.loginGitHub();
  };

  const handleGoogleLogin = () => {
    authService.loginGoogle();
  };

  const handleMicrosoftLogin = () => {
    authService.loginMicrosoft();
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const token = `temp-token-${Date.now()}`;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify({ name: email.split('@')[0], email }));
      navigate('/');
    } catch (err) {
      setError('Email ou senha inválidos');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    try {
      const token = `temp-token-${Date.now()}`;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify({ name, email }));
      navigate('/');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 p-12 flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white dark:text-gray-900 mb-4">
            ResKillPlus
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-600 leading-relaxed">
            A plataforma que transforma carreiras através da educação continuada e requalificação profissional.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 dark:bg-gray-900/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-1">Cursos Especializados</h3>
              <p className="text-gray-300 dark:text-gray-600 text-sm">Acesse conteúdos desenvolvidos por especialistas</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 dark:bg-gray-900/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-1">Recomendações Personalizadas</h3>
              <p className="text-gray-300 dark:text-gray-600 text-sm">IA que entende seus objetivos profissionais</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 dark:bg-gray-900/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-1">Acompanhamento em Tempo Real</h3>
              <p className="text-gray-300 dark:text-gray-600 text-sm">Monitore seu progresso e evolução</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              ResKillPlus
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Entre para transformar sua carreira
            </p>
          </div>

          <div className="lg:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bem-vindo de volta!
            </h2>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isSignUp ? 'Criar sua conta' : 'Entrar na plataforma'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Comece sua jornada de aprendizado' : 'Escolha seu método de autenticação preferido'}
            </p>
          </div>

          {!showManualLogin ? (
          <>
          <div className="space-y-4">
            <button
              onClick={handleGitHubLogin}
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="relative z-10">Continuar com GitHub</span>
            </button>

            <button
              onClick={handleGoogleLogin}
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-800/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">Continuar com Google</span>
            </button>

            <button
              onClick={handleMicrosoftLogin}
              className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="w-6 h-6 relative z-10" viewBox="0 0 23 23" fill="currentColor">
                <path d="M0 0h11v11H0z"/>
                <path d="M12 0h11v11H12z"/>
                <path d="M0 12h11v11H0z"/>
                <path d="M12 12h11v11H12z"/>
              </svg>
              <span className="relative z-10">Continuar com Microsoft</span>
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                  ou
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowManualLogin(true);
              setIsSignUp(false);
            }}
            className="mt-6 w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
          >
            Entrar com email e senha
          </button>
          </>
          ) : (
          <>
          <form onSubmit={isSignUp ? handleSignUp : handleManualLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {isSignUp && (
              <Input
                label="Nome completo"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
              />
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {isSignUp && (
              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                  />
                  <span className="text-gray-600 dark:text-gray-400">Lembrar de mim</span>
                </label>
                <a href="#" className="text-gray-900 dark:text-white hover:underline font-medium">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full">
              {isSignUp ? 'Criar conta' : 'Entrar'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setName('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {isSignUp ? 'Já tem uma conta? ' : 'Não tem uma conta? '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {isSignUp ? 'Entrar' : 'Cadastre-se'}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                  ou
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowManualLogin(false)}
            className="mt-6 w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
          >
            Voltar para login social
          </button>
          </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              🔒 Seus dados estão seguros e protegidos
            </p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-3">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-gray-900 dark:text-white hover:underline font-medium">termos</a>
              {' '}e{' '}
              <a href="#" className="text-gray-900 dark:text-white hover:underline font-medium">política de privacidade</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
