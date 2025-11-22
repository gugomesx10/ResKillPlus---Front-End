import { Link } from 'react-router-dom';
import logo from '../../assets/ResKillPlus.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="ResKillPlus" className="h-32 w-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transforme sua carreira com <span className="text-gray-600 dark:text-gray-400">ResKillPlus</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Plataforma completa de requalificação profissional com cursos especializados e recomendações personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/cursos" 
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Explorar Cursos
            </Link>
            <Link 
              to="/sobre" 
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-900 dark:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cursos Especializados</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Acesse cursos desenvolvidos para as demandas do mercado de trabalho atual e futuro.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recomendações Personalizadas</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Receba sugestões de cursos baseadas no seu perfil e objetivos profissionais.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acompanhamento de Progresso</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Monitore sua evolução e conquiste novas habilidades para sua carreira.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 text-gray-300 dark:text-gray-600 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram suas carreiras com o ResKillPlus.
          </p>
          <Link 
            to="/usuarios" 
            className="inline-block bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
