import Card from '../../components/Card/Card';

const Integrantes = () => {
  const integrantes = [
    {
      nome: 'Gustavo Gomes Martins',
      rm: 'RM555999',
      turma: '1TDSPO',
      github: 'https://github.com/gugomesx10',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Equipe do Projeto
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center">
          Conheça quem está por trás do ResKillPlus
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto mb-16">
          {integrantes.map((integrante, index) => (
            <Card key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-900 dark:bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-5xl text-white dark:text-gray-900 font-bold">
                  {integrante.nome.charAt(0)}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {integrante.nome}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                {integrante.rm}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Turma: {integrante.turma}
              </p>
              <a
                href={integrante.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Ver GitHub →
              </a>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Sobre o Projeto
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed max-w-3xl mx-auto">
            Este projeto foi desenvolvido como parte da Global Solution da FIAP, 
            com o objetivo de criar uma plataforma completa de requalificação profissional 
            utilizando as melhores práticas de desenvolvimento web moderno com React, TypeScript e Tailwind CSS.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Integrantes;
