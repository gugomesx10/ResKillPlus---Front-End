import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Usuário');
  const [email, setEmail] = useState('usuario@email.com');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name || 'Usuário');
      setEmail(user.email || 'usuario@email.com');
    }
  }, []);

  const handleSave = () => {
    const userData = { name, email, phone, bio };
    localStorage.setItem('user', JSON.stringify(userData));
    setIsEditing(false);
    alert('✅ Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name || 'Usuário');
      setEmail(user.email || 'usuario@email.com');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-5xl mb-4">
                  {name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {email}
                </p>
                <Button variant="secondary" className="w-full mb-2">
                  📷 Alterar Foto
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Estatísticas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cursos Concluídos</span>
                    <span className="font-semibold text-gray-900 dark:text-white">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Em Andamento</span>
                    <span className="font-semibold text-gray-900 dark:text-white">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Horas de Estudo</span>
                    <span className="font-semibold text-gray-900 dark:text-white">248h</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Informações Pessoais
                </h2>
                {!isEditing ? (
                  <Button variant="secondary" onClick={() => setIsEditing(true)}>
                    ✏️ Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                      💾 Salvar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome Completo
                  </label>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50 dark:bg-gray-900' : ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50 dark:bg-gray-900' : ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefone
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    placeholder="(00) 00000-0000"
                    className={!isEditing ? 'bg-gray-50 dark:bg-gray-900' : ''}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-lg focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${!isEditing ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Segurança
              </h2>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-between">
                  <span>🔑 Alterar Senha</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button variant="secondary" className="w-full justify-between">
                  <span>🔐 Autenticação em Duas Etapas</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                Cuidado para Deletar Conta 
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Tem certeza?
                Absoluta?
                Nós te magoamos? Porque se for o caso, podemos conversar...
              </p>
              <Button variant="danger" className="w-full">
                Deletar Conta
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
