import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { cursoService } from '../../services/cursoService';
import type { Curso } from '../../types';

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<Curso>({
    nome_curso: '',
    descricao_curso: '',
    carga_horaria: 0,
    categoria: '',
  });

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await cursoService.listarTodos();
      setCursos(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Erro ao carregar cursos:', error);
      if (error.message && !error.message.includes('Failed to fetch')) {
        setError(error.message);
      }
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
    setError('');
    setSuccess('');
    try {
      if (editMode) {
        await cursoService.atualizar(formData);
        setSuccess('Curso atualizado com sucesso!');
      } else {
        await cursoService.criar(formData);
        setSuccess('Curso cadastrado com sucesso!');
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ nome_curso: '', descricao_curso: '', carga_horaria: 0, categoria: '' });
      await carregarCursos();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: any) {
      console.error('Erro ao salvar curso:', error);
      setError(error.message || 'Erro ao salvar curso. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (curso: Curso) => {
    setFormData(curso);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (nome: string) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      setLoading(true);
      setError('');
      setSuccess('');
      try {
        await cursoService.excluir(nome);
        setSuccess('Curso excluído com sucesso!');
        await carregarCursos();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error: any) {
        console.error('Erro ao excluir curso:', error);
        setError(error.message || 'Erro ao excluir curso. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Gerenciar Cursos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Cadastre e gerencie os cursos da plataforma</p>
          </div>
          <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ nome_curso: '', descricao_curso: '', carga_horaria: 0, categoria: '' }); setError(''); setSuccess(''); }}>
            {showForm ? '✕ Cancelar' : '+ Novo Curso'}
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
            {editMode ? 'Editar Curso' : 'Novo Curso'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome do Curso"
              name="nome_curso"
              value={formData.nome_curso}
              onChange={handleChange}
              required
              disabled={editMode}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descricao_curso"
                value={formData.descricao_curso}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Input
              label="Carga Horária"
              type="number"
              name="carga_horaria"
              value={formData.carga_horaria.toString()}
              onChange={handleChange}
              required
            />
            <Input
              label="Categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {curso.nome_curso}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              {curso.descricao_curso}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 space-y-1">
              <p>⏱️ Carga Horária: {curso.carga_horaria}h</p>
              <p>📚 Categoria: {curso.categoria}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(curso)} variant="secondary">
                ✏️ Editar
              </Button>
              <Button onClick={() => handleDelete(curso.nome_curso)} variant="danger">
                🗑️ Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Cursos;
