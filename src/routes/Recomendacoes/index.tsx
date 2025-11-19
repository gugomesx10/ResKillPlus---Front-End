import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { recomendacaoService } from '../../services/recomendacaoService';
import { Recomendacao } from '../../types';

const Recomendacoes = () => {
  const [recomendacoes, setRecomendacoes] = useState<Recomendacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Recomendacao>({
    cpf: '',
    nomeCurso: '',
    motivo: '',
    dataRecomendacao: '',
  });

  useEffect(() => {
    carregarRecomendacoes();
  }, []);

  const carregarRecomendacoes = async () => {
    setLoading(true);
    try {
      const data = await recomendacaoService.listarTodas();
      setRecomendacoes(data);
    } catch (error) {
      console.error('Erro ao carregar recomendações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        await recomendacaoService.atualizar(formData);
      } else {
        await recomendacaoService.criar(formData);
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ cpf: '', nomeCurso: '', motivo: '', dataRecomendacao: '' });
      carregarRecomendacoes();
    } catch (error) {
      console.error('Erro ao salvar recomendação:', error);
      alert('Erro ao salvar recomendação');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (recomendacao: Recomendacao) => {
    setFormData(recomendacao);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta recomendação?')) {
      setLoading(true);
      try {
        await recomendacaoService.excluir(id);
        carregarRecomendacoes();
      } catch (error) {
        console.error('Erro ao excluir recomendação:', error);
        alert('Erro ao excluir recomendação');
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
          Gerenciar Recomendações
        </h1>
        <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ cpf: '', nomeCurso: '', motivo: '', dataRecomendacao: '' }); }}>
          {showForm ? 'Cancelar' : 'Nova Recomendação'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Recomendação' : 'Nova Recomendação'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="CPF do Usuário"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              placeholder="000.000.000-00"
            />
            <Input
              label="Nome do Curso"
              name="nomeCurso"
              value={formData.nomeCurso}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Motivo da Recomendação <span className="text-red-500">*</span>
              </label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Input
              label="Data da Recomendação"
              type="date"
              name="dataRecomendacao"
              value={formData.dataRecomendacao || ''}
              onChange={handleChange}
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recomendacoes.map((recomendacao, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {recomendacao.nomeCurso}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {recomendacao.motivo}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>CPF: {recomendacao.cpf}</p>
              {recomendacao.dataRecomendacao && (
                <p>Data: {new Date(recomendacao.dataRecomendacao).toLocaleDateString()}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(recomendacao)} variant="secondary">
                Editar
              </Button>
              {recomendacao.id && (
                <Button onClick={() => handleDelete(recomendacao.id!)} variant="danger">
                  Excluir
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recomendacoes;
