import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { matriculaService } from '../../services/matriculaService';
import type { Matricula } from '../../types';

const Matriculas = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Matricula>({
    cpfUsuario: '',
    nomeCurso: '',
    dataMatricula: '',
    status: 'ATIVA',
    progresso: 0,
  });

  useEffect(() => {
    carregarMatriculas();
  }, []);

  const carregarMatriculas = async () => {
    setLoading(true);
    try {
      const data = await matriculaService.listarTodas();
      setMatriculas(data);
    } catch (error) {
      console.error('Erro ao carregar matrículas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        await matriculaService.atualizar(formData);
      } else {
        await matriculaService.criar(formData);
      }
      setShowForm(false);
      setEditMode(false);
      setFormData({ cpfUsuario: '', nomeCurso: '', dataMatricula: '', status: 'ATIVA', progresso: 0 });
      carregarMatriculas();
    } catch (error) {
      console.error('Erro ao salvar matrícula:', error);
      alert('Erro ao salvar matrícula');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (matricula: Matricula) => {
    setFormData(matricula);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (cpfUsuario: string, nomeCurso: string) => {
    if (confirm('Tem certeza que deseja excluir esta matrícula?')) {
      setLoading(true);
      try {
        await matriculaService.excluir(cpfUsuario, nomeCurso);
        carregarMatriculas();
      } catch (error) {
        console.error('Erro ao excluir matrícula:', error);
        alert('Erro ao excluir matrícula');
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
          Gerenciar Matrículas
        </h1>
        <Button onClick={() => { setShowForm(!showForm); setEditMode(false); setFormData({ cpfUsuario: '', nomeCurso: '', dataMatricula: '', status: 'ATIVA', progresso: 0 }); }}>
          {showForm ? 'Cancelar' : 'Nova Matrícula'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {editMode ? 'Editar Matrícula' : 'Nova Matrícula'}
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="CPF do Usuário"
              name="cpfUsuario"
              value={formData.cpfUsuario}
              onChange={handleChange}
              required
              disabled={editMode}
              placeholder="000.000.000-00"
            />
            <Input
              label="Nome do Curso"
              name="nomeCurso"
              value={formData.nomeCurso}
              onChange={handleChange}
              required
              disabled={editMode}
            />
            <Input
              label="Data da Matrícula"
              type="date"
              name="dataMatricula"
              value={formData.dataMatricula}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="ATIVA">Ativa</option>
                <option value="CONCLUIDA">Concluída</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>
            <Input
              label="Progresso (%)"
              type="number"
              name="progresso"
              value={formData.progresso?.toString() || '0'}
              onChange={handleChange}
              placeholder="0-100"
            />
            <Button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matriculas.map((matricula, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {matricula.nomeCurso}
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>CPF: {matricula.cpfUsuario}</p>
              <p>Data: {new Date(matricula.dataMatricula).toLocaleDateString()}</p>
              <p>Status: <span className={`font-semibold ${matricula.status === 'ATIVA' ? 'text-green-600' : matricula.status === 'CONCLUIDA' ? 'text-blue-600' : 'text-red-600'}`}>{matricula.status}</span></p>
              {matricula.progresso !== undefined && <p>Progresso: {matricula.progresso}%</p>}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(matricula)} variant="secondary">
                Editar
              </Button>
              <Button onClick={() => handleDelete(matricula.cpfUsuario, matricula.nomeCurso)} variant="danger">
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Matriculas;
