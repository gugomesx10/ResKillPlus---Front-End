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
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Integrantes do Projeto
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-md mx-auto">
        {integrantes.map((integrante, index) => (
          <Card key={index}>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white font-bold">
                  {integrante.nome.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {integrante.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                {integrante.rm}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Turma: {integrante.turma}
              </p>
              <a
                href={integrante.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub
              </a>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
          Sobre o Projeto
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center">
          Este projeto foi desenvolvido como parte da Global Solution da FIAP, 
          com o objetivo de criar uma plataforma completa de requalificação profissional 
          utilizando as melhores práticas de desenvolvimento web.
        </p>
      </Card>
    </div>
  );
};

export default Integrantes;
