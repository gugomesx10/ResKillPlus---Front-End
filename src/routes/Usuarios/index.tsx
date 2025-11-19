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
  const [formData, setFormData] = useState<Usuario>({
    cpf: '',
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    dataNascimento: '',
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
    try {
      if (editMode) {
        await usuarioService.atualizar(formData);
      } else {
        await usuarioService.criar(formData);
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ cpf: '', nome: '', email: '', senha: '', telefone: '', dataNascimento: '' });
      alert('Usuário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = async (cpf: string) => {
    setLoading(true);
    try {
      const data = await usuarioService.buscarPorCpf(cpf);
      setFormData(data);
      setEditMode(true);
      setShowForm(true);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      alert('Usuário não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cpf: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setLoading(true);
      try {
        await usuarioService.excluir(cpf);
        setFormData({ cpf: '', nome: '', email: '', senha: '', telefone: '', dataNascimento: '' });
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário');
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
        <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ cpf: '', nome: '', email: '', senha: '', telefone: '', dataNascimento: '' }); }}>
          {showForm ? 'Cancelar' : 'Novo Usuário'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              disabled={editMode}
              placeholder="000.000.000-00"
            />
            <Input
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
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
              label="Telefone"
              name="telefone"
              value={formData.telefone || ''}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
            <Input
              label="Data de Nascimento"
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento || ''}
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
          <div>
            <Input
              label="Digite o CPF para buscar"
              name="buscaCpf"
              value=""
              onChange={(e) => {
                if (e.target.value.length >= 11) {
                  handleBuscar(e.target.value);
                }
              }}
              placeholder="000.000.000-00"
            />
          </div>
          {editMode && (
            <div className="flex gap-2">
              <Button onClick={() => handleDelete(formData.cpf)} variant="danger">
                Excluir Usuário
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Usuarios;
