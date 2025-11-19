import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const MeusCursos = () => {
  const navigate = useNavigate();
  const [cursos] = useState([
    {
      id: 1,
      titulo: 'React Avançado',
      descricao: 'Aprenda React do zero ao avançado com projetos reais',
      progresso: 75,
      horasCompletas: 18,
      horasTotais: 24,
      thumbnail: '🎓',
      categoria: 'Desenvolvimento Web',
      status: 'em_andamento'
    },
    {
      id: 2,
      titulo: 'TypeScript na Prática',
      descricao: 'Domine TypeScript e crie aplicações type-safe',
      progresso: 45,
      horasCompletas: 9,
      horasTotais: 20,
      thumbnail: '📘',
      categoria: 'Programação',
      status: 'em_andamento'
    },
    {
      id: 3,
      titulo: 'Node.js e APIs REST',
      descricao: 'Construa APIs profissionais com Node.js e Express',
      progresso: 100,
      horasCompletas: 16,
      horasTotais: 16,
      thumbnail: '✅',
      categoria: 'Backend',
      status: 'concluido'
    },
  ]);

  useEffect(() => {
  }, [navigate]);

  const getProgressColor = (progresso: number) => {
    if (progresso === 100) return 'bg-green-500';
    if (progresso >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'concluido') {
      return (
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
          ✓ Concluído
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
        Em Andamento
      </span>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Meus Cursos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe seu progresso e continue aprendendo
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {cursos.length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cursos Inscritos
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {cursos.filter(c => c.status === 'concluido').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Concluídos
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {cursos.filter(c => c.status === 'em_andamento').length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Em Andamento
            </p>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {cursos.reduce((acc, c) => acc + c.horasCompletas, 0)}h
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Horas de Estudo
            </p>
          </Card>
        </div>

        {/* Lista de Cursos */}
        <div className="space-y-6">
          {cursos.map((curso) => (
            <Card key={curso.id} className="hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail */}
                <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center text-4xl">
                  {curso.thumbnail}
                </div>

                {/* Informações */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {curso.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {curso.descricao}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        📚 {curso.categoria}
                      </span>
                    </div>
                    {getStatusBadge(curso.status)}
                  </div>

                  {/* Barra de Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Progresso: {curso.progresso}%
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {curso.horasCompletas}h / {curso.horasTotais}h
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(curso.progresso)} transition-all duration-500`}
                        style={{ width: `${curso.progresso}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3">
                    {curso.status === 'em_andamento' ? (
                      <Button variant="primary" className="flex-1 md:flex-none">
                        ▶️ Continuar Curso
                      </Button>
                    ) : (
                      <Button variant="secondary" className="flex-1 md:flex-none">
                        🔄 Revisar Conteúdo
                      </Button>
                    )}
                    <Button variant="secondary">
                      📋 Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Explorar mais cursos */}
        <Card className="mt-8 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Quer aprender mais?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore nosso catálogo completo de cursos especializados
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/cursos')}
          >
            🔍 Explorar Cursos
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MeusCursos;
