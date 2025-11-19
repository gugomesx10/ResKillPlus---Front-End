import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

const Home = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Bem-vindo ao ResKillPlus
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Plataforma de requalificação profissional para o futuro do trabalho
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/cursos">
            <Button>Explorar Cursos</Button>
          </Link>
          <Link to="/sobre">
            <Button variant="secondary">Saiba Mais</Button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            Cursos Especializados
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Acesse cursos desenvolvidos para as demandas do mercado de trabalho atual e futuro.
          </p>
        </Card>

        <Card>
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            Recomendações Personalizadas
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Receba sugestões de cursos baseadas no seu perfil e objetivos profissionais.
          </p>
        </Card>

        <Card>
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            Acompanhamento de Progresso
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Monitore sua evolução e conquiste novas habilidades para sua carreira.
          </p>
        </Card>
      </section>

      <section className="bg-blue-600 dark:bg-blue-800 rounded-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-lg mb-6">
          Cadastre-se agora e dê o primeiro passo para transformar sua carreira
        </p>
        <Link to="/usuarios">
          <Button variant="secondary">Criar Conta</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
