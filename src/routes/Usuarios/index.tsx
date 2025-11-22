import { useState } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { usuarioService } from '../../services/usuarioService';
import type { Usuario } from '../../types';

const Usuarios = () => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [buscaCpf, setBuscaCpf] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Usuario>({
    cpf_usuario: '',
    nome_usuario: '',
    mail_usuario: '',
    senha: '',
    dt_nasc: '',
    end_usuario: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (editMode) {
        await usuarioService.atualizar(formData);
        setSuccess('Usuário atualizado com sucesso!');
      } else {
        await usuarioService.criar(formData);
        setSuccess('Usuário cadastrado com sucesso!');
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ cpf_usuario: '', nome_usuario: '', mail_usuario: '', senha: '', dt_nasc: '', end_usuario: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      setError(error.message || 'Erro ao salvar usuário. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = async () => {
    if (!buscaCpf || buscaCpf.length < 11) {
      setError('Digite um CPF válido (mínimo 11 dígitos)');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await usuarioService.buscarPorCpf(buscaCpf);
      setFormData(data);
      setEditMode(true);
      setShowForm(true);
      setSuccess('Usuário encontrado!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      setError(error.message || 'Usuário não encontrado. Verifique o CPF digitado.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cpf: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        await usuarioService.excluir(cpf);
        setFormData({ cpf_usuario: '', nome_usuario: '', mail_usuario: '', senha: '', dt_nasc: '', end_usuario: '' });
        setEditMode(false);
        setShowForm(false);
        setBuscaCpf('');
        setSuccess('Usuário excluído com sucesso!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error: any) {
        console.error('Erro ao excluir usuário:', error);
        setError(error.message || 'Erro ao excluir usuário. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Gerenciar Usuários
        </h1>
        <Button onClick={() => { 
          setShowForm(!showForm); 
          setEditMode(false); 
          setFormData({ cpf_usuario: '', nome_usuario: '', mail_usuario: '', senha: '', dt_nasc: '', end_usuario: '' });
          setError('');
          setSuccess('');
        }}>
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">❌ {error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400">✅ {success}</p>
        </div>
      )}

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="CPF"
              name="cpf_usuario"
              value={formData.cpf_usuario}
              onChange={handleChange}
              required
              disabled={editMode}
              placeholder="000.000.000-00"
            />
            <Input
              label="Nome"
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="mail_usuario"
              value={formData.mail_usuario}
              onChange={handleChange}
              required
            />
            <Input
              label="Senha"
              type="password"
              name="senha"
              value={formData.senha || ''}
              onChange={handleChange}
              required={!editMode}
            />
            <Input
              label="Endereço"
              name="end_usuario"
              value={formData.end_usuario || ''}
              onChange={handleChange}
              placeholder="Rua, número, bairro"
            />
            <Input
              label="Data de Nascimento"
              type="date"
              name="dt_nasc"
              value={formData.dt_nasc || ''}
              onChange={handleChange}
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <Card>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Buscar/Excluir Usuário
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="Digite o CPF para buscar"
                name="buscaCpf"
                value={buscaCpf}
                onChange={(e) => setBuscaCpf(e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>
            <div className="pt-8">
              <Button onClick={handleBuscar} variant="primary">
                🔍 Buscar
              </Button>
            </div>
          </div>
          {editMode && (
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button onClick={() => handleDelete(formData.cpf_usuario)} variant="danger">
                🗑️ Excluir Usuário
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Usuarios;
