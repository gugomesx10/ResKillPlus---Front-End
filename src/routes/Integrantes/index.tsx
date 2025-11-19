import Card from '../../components/Card/Card';
import profilePic from '../../assets/profile_pic.png';
import verifiedIcon from '../../assets/verified_icon.svg';

const Integrantes = () => {
  const integrantes = [
    {
      nome: 'Gustavo Gomes Martins',
      rm: 'RM555999',
      turma: '1TDSPO',
      github: 'https://github.com/gugomesx10',
      foto: profilePic,
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
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-900 dark:border-white shadow-xl">
                <img 
                  src={integrante.foto} 
                  alt={integrante.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback se a imagem não carregar
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gray-900 dark:bg-white flex items-center justify-center"><span class="text-5xl text-white dark:text-gray-900 font-bold">${integrante.nome.charAt(0)}</span></div>`;
                  }}
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-center gap-2">
                {integrante.nome}
                <img src={verifiedIcon} alt="Verificado" className="w-7 h-7" title="Perfil Verificado" />
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
                className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Ver GitHub
                </span>
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
