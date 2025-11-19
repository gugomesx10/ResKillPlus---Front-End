import Card from '../../components/Card/Card';

const Sobre = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Sobre o ResKillPlus
      </h1>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Nossa Missão
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          O ResKillPlus é uma plataforma inovadora de requalificação profissional, desenvolvida para 
          enfrentar os desafios do mercado de trabalho em constante transformação. Nossa missão é 
          capacitar profissionais com as habilidades necessárias para prosperar na economia digital.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Através de cursos especializados, recomendações personalizadas e acompanhamento contínuo, 
          ajudamos nossos usuários a se manterem competitivos e preparados para as oportunidades do futuro.
        </p>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Objetivos
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
          <li>Facilitar a requalificação profissional através de tecnologia</li>
          <li>Oferecer cursos alinhados com as demandas do mercado</li>
          <li>Proporcionar recomendações personalizadas baseadas no perfil do usuário</li>
          <li>Acompanhar o progresso e desenvolvimento de habilidades</li>
          <li>Conectar profissionais com oportunidades de crescimento</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Tecnologia
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Esta plataforma foi desenvolvida utilizando tecnologias modernas e robustas:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-900 dark:text-white">React 19</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-900 dark:text-white">TypeScript</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Vite</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
            <p className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Sobre;
