import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { cursoService } from '../../services/cursoService';
import { Curso } from '../../types';

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Curso>({
    nome: '',
    descricao: '',
    cargaHoraria: 0,
    categoria: '',
    nivel: '',
  });

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    setLoading(true);
    try {
      const data = await cursoService.listarTodos();
      setCursos(data);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
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
        await cursoService.atualizar(formData);
      } else {
        await cursoService.criar(formData);
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ nome: '', descricao: '', cargaHoraria: 0, categoria: '', nivel: '' });
      carregarCursos();
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      alert('Erro ao salvar curso');
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
      try {
        await cursoService.excluir(nome);
        carregarCursos();
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
        alert('Erro ao excluir curso');
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
          Gerenciar Cursos
        </h1>
        <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ nome: '', descricao: '', cargaHoraria: 0, categoria: '', nivel: '' }); }}>
          {showForm ? 'Cancelar' : 'Novo Curso'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Curso' : 'Novo Curso'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome do Curso"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={editMode}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Input
              label="Carga Horária"
              type="number"
              name="cargaHoraria"
              value={formData.cargaHoraria.toString()}
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
            <Input
              label="Nível"
              name="nivel"
              value={formData.nivel || ''}
              onChange={handleChange}
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {curso.nome}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {curso.descricao}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Carga Horária: {curso.cargaHoraria}h</p>
              <p>Categoria: {curso.categoria}</p>
              {curso.nivel && <p>Nível: {curso.nivel}</p>}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(curso)} variant="secondary">
                Editar
              </Button>
              <Button onClick={() => handleDelete(curso.nome)} variant="danger">
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cursos;
