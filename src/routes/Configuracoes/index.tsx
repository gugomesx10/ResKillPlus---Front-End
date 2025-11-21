import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const Configuracoes = () => {
  const navigate = useNavigate();
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesPush, setNotificacoesPush] = useState(false);
  const [modoEscuroAuto, setModoEscuroAuto] = useState(false);
  const [idiomaPreferido, setIdiomaPreferido] = useState('pt-BR');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('idioma');
    if (savedLang) setIdiomaPreferido(savedLang);
    
    const savedNotifEmail = localStorage.getItem('notificacoesEmail');
    if (savedNotifEmail) setNotificacoesEmail(savedNotifEmail === 'true');
    
    const saved2FA = localStorage.getItem('2fa');
    if (saved2FA) setTwoFAEnabled(saved2FA === 'true');
  }, [navigate]);

  const handleSaveSettings = () => {
    localStorage.setItem('idioma', idiomaPreferido);
    localStorage.setItem('notificacoesEmail', notificacoesEmail.toString());
    localStorage.setItem('notificacoesPush', notificacoesPush.toString());
    localStorage.setItem('modoEscuroAuto', modoEscuroAuto.toString());
    
    alert('Configurações salvas com sucesso!');
  };

  const handleChangePassword = () => {
    const senhaAtual = prompt('Digite sua senha atual:');
    if (!senhaAtual) return;
    
    const novaSenha = prompt('Digite sua nova senha (mínimo 6 caracteres):');
    if (!novaSenha || novaSenha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }
    
    const confirmarSenha = prompt('Confirme sua nova senha:');
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    alert('Senha alterada com sucesso!');
  };

  const handleToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
    localStorage.setItem('2fa', (!twoFAEnabled).toString());
    alert(twoFAEnabled ? '🔓 Autenticação em duas etapas desativada!' : '🔐 Autenticação em duas etapas ativada!');
  };

  const handleDownloadData = () => {
    const userData = {
      usuario: authService.getUser(),
      configuracoes: {
        idioma: idiomaPreferido,
        notificacoesEmail,
        notificacoesPush,
        modoEscuroAuto,
        twoFA: twoFAEnabled
      },
      dataExportacao: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-dados-reskillplus.json';
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Download dos seus dados iniciado!');
  };

  const handleDeactivateAccount = () => {
    const confirmacao = window.confirm(
      'Tem certeza que deseja desativar sua conta?\n\nVocê pode reativá-la fazendo login novamente dentro de 30 dias.'
    );
    
    if (confirmacao) {
      alert('🚫 Conta desativada. Você será redirecionado para o login.');
      authService.logout();
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    const confirmacao1 = window.confirm(
      'ATENÇÃO: Esta ação é IRREVERSÍVEL!\n\nTodos os seus dados, cursos e progresso serão PERMANENTEMENTE deletados.\n\nDeseja continuar?'
    );
    
    if (!confirmacao1) return;
    
    const confirmacao2 = window.confirm(
      '⚠️ ÚLTIMA CHANCE!\n\nDigite "DELETAR" no próximo prompt para confirmar.'
    );
    
    if (!confirmacao2) return;
    
    const digitado = prompt('Digite "DELETAR" para confirmar:');
    
    if (digitado === 'DELETAR') {
      alert('Conta deletada permanentemente. Sentiremos sua falta!');
      authService.logout();
      navigate('/login');
    } else {
      alert('Ação cancelada. Ainda bem que você ficou!');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Configurações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalize sua experiência na plataforma
          </p>
        </div>

        <div className="space-y-6">
          {/* Notificações */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🔔 Notificações
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notificações por Email
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receba atualizações sobre seus cursos e novidades
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificacoesEmail}
                    onChange={(e) => setNotificacoesEmail(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notificações Push
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receba alertas no navegador sobre atividades importantes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificacoesPush}
                    onChange={(e) => setNotificacoesPush(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Aparência */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🎨 Aparência
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Modo Escuro Automático
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ativar modo escuro automaticamente à noite
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modoEscuroAuto}
                    onChange={(e) => setModoEscuroAuto(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="py-3">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Idioma Preferido
                </h3>
                <select
                  value={idiomaPreferido}
                  onChange={(e) => {
                    setIdiomaPreferido(e.target.value);
                    alert(`🌍 Idioma alterado para ${e.target.value === 'pt-BR' ? 'Português' : e.target.value === 'en-US' ? 'English' : 'Español'}!\n\n(Funcionalidade de tradução será implementada em breve)`);
                  }}
                  className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-lg focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                >
                  <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                  <option value="en-US">🇺🇸 English (US)</option>
                  <option value="es-ES">🇪🇸 Español</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Privacidade */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Privacidade e Segurança
            </h2>
            
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-between" onClick={handleChangePassword}>
                <span>Alterar Senha</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              
              <Button variant="secondary" className="w-full justify-between" onClick={handleToggle2FA}>
                <span>Autenticação em Duas Etapas {twoFAEnabled ? '(Ativada)' : '(Desativada)'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              
              <Button variant="secondary" className="w-full justify-between" onClick={() => alert('📱 Página de dispositivos em desenvolvimento')}>
                <span>Dispositivos Conectados</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              
              <Button variant="secondary" className="w-full justify-between" onClick={handleDownloadData}>
                <span>Baixar Meus Dados</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Card>

          {/* Conta */}
          <Card className="border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Atenção nesta Área
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Ações irreversíveis que afetam permanentemente sua conta
            </p>
            
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-between text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleDeactivateAccount}>
                <span>Desativar Conta</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              
              <Button variant="danger" className="w-full" onClick={handleDeleteAccount}>
                Deletar Conta Permanentemente
              </Button>
            </div>
          </Card>

          {/* Botão Salvar */}
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveSettings}>
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
