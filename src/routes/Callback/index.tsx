import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import Loading from '../../components/Loading/Loading';

const Callback = () => {
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        
        if (!code) {
          throw new Error('Código não recebido do provedor');
        }

        const response = await authService.handleCallback(provider as any, code);
        
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          
          if (response.nome && response.email) {
            localStorage.setItem('user', JSON.stringify({
              name: response.nome,
              email: response.email,
              avatar: response.avatarUrl
            }));
          }
          
          navigate('/');
        } else {
          throw new Error('Token não recebido');
        }
      } catch (err: any) {
        console.error('Erro no callback:', err);
        setError(err.message || 'Erro ao processar login. Tente novamente.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate, provider, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Erro no Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Redirecionando para a página de login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <Loading />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-2">
          Processando login...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Aguarde enquanto validamos suas credenciais
        </p>
      </div>
    </div>
  );
};

export default Callback;
