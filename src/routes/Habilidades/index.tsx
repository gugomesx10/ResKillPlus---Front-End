import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { habilidadeService } from '../../services/habilidadeService';
import type { Habilidade } from '../../types';

const Habilidades = () => {
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Habilidade>({
    nome_habilidade: '',
    descricao_habilidade: '',
    nivel: '',
    area: '',
  });

  useEffect(() => {
    carregarHabilidades();
  }, []);

  const carregarHabilidades = async () => {
    setLoading(true);
    try {
      const data = await habilidadeService.listarTodas();
      setHabilidades(data);
    } catch (error) {
      console.error('Erro ao carregar habilidades:', error);
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
        await habilidadeService.atualizar(formData);
        alert('✅ Habilidade atualizada com sucesso!');
      } else {
        await habilidadeService.criar(formData);
        alert('✅ Habilidade cadastrada com sucesso!');
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ nome_habilidade: '', descricao_habilidade: '', nivel: '', area: '' });
      await carregarHabilidades();
    } catch (error: any) {
      console.error('Erro ao salvar habilidade:', error);
      alert('❌ ' + (error.message || 'Erro ao salvar habilidade'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (habilidade: Habilidade) => {
    setFormData(habilidade);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (nome: string) => {
    if (confirm('Tem certeza que deseja excluir esta habilidade?')) {
      setLoading(true);
      try {
        await habilidadeService.excluir(nome);
        await carregarHabilidades();
        alert('✅ Habilidade excluída com sucesso!');
      } catch (error: any) {
        console.error('Erro ao excluir habilidade:', error);
        alert('❌ ' + (error.message || 'Erro ao excluir habilidade'));
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
          Gerenciar Habilidades
        </h1>
        <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ nome_habilidade: '', descricao_habilidade: '', nivel: '', area: '' }); }}>
          {showForm ? 'Cancelar' : 'Nova Habilidade'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Habilidade' : 'Nova Habilidade'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome da Habilidade"
              name="nome_habilidade"
              value={formData.nome_habilidade}
              onChange={handleChange}
              required
              disabled={editMode}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descricao_habilidade"
                value={formData.descricao_habilidade}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Input
              label="Área"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
            <Input
              label="Nível"
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              placeholder="Básico, Intermediário ou Avançado"
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habilidades.map((habilidade, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {habilidade.nome_habilidade}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {habilidade.descricao_habilidade}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Área: {habilidade.area}</p>
              <p>Nível: {habilidade.nivel}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(habilidade)} variant="secondary">
                Editar
              </Button>
              <Button onClick={() => handleDelete(habilidade.nome_habilidade)} variant="danger">
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Habilidades;
