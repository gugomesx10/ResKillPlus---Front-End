import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Perfil = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Usuário');
  const [email, setEmail] = useState('usuario@email.com');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna esquerda - Avatar e informações básicas */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 flex items-center justify-center text-white dark:text-gray-900 text-4xl font-bold mb-4">
                  {name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {email}
                </p>
                <Button variant="secondary" className="w-full">
                  Alterar Foto
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Membro desde
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Novembro 2025
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Cursos concluídos
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      0 cursos
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Horas de estudo
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      0 horas
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Coluna direita - Formulário de edição */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Informações Pessoais
                </h3>
                {!isEditing ? (
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      💾 Salvar
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <Input
                  label="Nome completo"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  required
                />

                <Input
                  label="Telefone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Biografia
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Conte um pouco sobre você..."
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-lg focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-950 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </Card>

            {/* Seção de Segurança */}
            <Card className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Segurança
              </h3>
              <div className="space-y-4">
                <Button variant="secondary" className="w-full justify-between">
                  <span>🔒 Alterar Senha</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="secondary" className="w-full justify-between">
                  <span>🔐 Autenticação em duas etapas</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </Card>

            {/* Seção de Perigo */}
            <Card className="mt-6 border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                Zona de Perigo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Esta ação é irreversível. Todos os seus dados serão permanentemente deletados.
              </p>
              <Button variant="danger" className="w-full">
                🗑️ Deletar Conta
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
