import { useState, useEffect, useRef } from 'react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Usuário');
  const [email, setEmail] = useState('usuario@email.com');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name || 'Usuário');
      setEmail(user.email || 'usuario@email.com');
      setPhone(user.phone || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || null);
      setTwoFactorEnabled(user.twoFactorEnabled || false);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.profileImage = reader.result as string;
        localStorage.setItem('user', JSON.stringify(userData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    delete userData.profileImage;
    localStorage.setItem('user', JSON.stringify(userData));
  };

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
      setPhone(user.phone || '');
      setBio(user.bio || '');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('❌ Preencha todos os campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('❌ As senhas não coincidem');
      return;
    }
    if (newPassword.length < 6) {
      alert('❌ A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.password = newPassword;
    localStorage.setItem('user', JSON.stringify(userData));
    
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('✅ Senha alterada com sucesso!');
  };

  const handleToggle2FA = () => {
    const newStatus = !twoFactorEnabled;
    setTwoFactorEnabled(newStatus);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.twoFactorEnabled = newStatus;
    localStorage.setItem('user', JSON.stringify(userData));
    
    setShow2FAModal(false);
    alert(newStatus ? '✅ Autenticação de dois fatores ativada!' : '✅ Autenticação de dois fatores desativada!');
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setShowDeleteModal(false);
    alert('❌ Conta deletada com sucesso. Sentiremos sua falta!');
    navigate('/login');
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
                <div className="relative group">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt={name}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-5xl mb-4">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-4 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
                    title="Alterar foto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {email}
                </p>
                {profileImage && (
                  <Button variant="danger" onClick={handleRemoveImage} className="w-full mb-2">
                    🗑️ Remover Foto
                  </Button>
                )}
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
                <Button 
                  variant="secondary" 
                  className="w-full justify-between"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <span>🔑 Alterar Senha</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-between"
                  onClick={() => setShow2FAModal(true)}
                >
                  <span>🔐 Autenticação em Duas Etapas</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${twoFactorEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                      {twoFactorEnabled ? 'Ativado' : 'Desativado'}
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
              <Button variant="danger" className="w-full" onClick={() => setShowDeleteModal(true)}>
                Deletar Conta
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Alterar Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Alterar Senha
            </h3>
            <div className="space-y-4">
              <Input
                label="Senha Atual"
                name="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Input
                label="Nova Senha"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Input
                label="Confirmar Nova Senha"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleChangePassword}
                  className="flex-1"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Modal 2FA */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Autenticação em Duas Etapas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {twoFactorEnabled 
                ? 'A autenticação em duas etapas adiciona uma camada extra de segurança à sua conta. Deseja desativar?'
                : 'A autenticação em duas etapas adiciona uma camada extra de segurança à sua conta. Ao ativar, você precisará de um código adicional para fazer login.'
              }
            </p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setShow2FAModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                variant={twoFactorEnabled ? "danger" : "primary"}
                onClick={handleToggle2FA}
                className="flex-1"
              >
                {twoFactorEnabled ? 'Desativar' : 'Ativar'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal Deletar Conta */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full border-red-200 dark:border-red-800">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              ⚠️ Deletar Conta Permanentemente
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Esta ação não pode ser desfeita. Todos os seus dados, cursos, progresso e certificados serão permanentemente deletados.
            </p>
            <p className="text-gray-900 dark:text-white font-semibold mb-6">
              Você tem certeza absoluta que deseja continuar?
            </p>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1"
              >
                Não, manter conta
              </Button>
              <Button 
                variant="danger"
                onClick={handleDeleteAccount}
                className="flex-1"
              >
                Sim, deletar tudo
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Perfil;
