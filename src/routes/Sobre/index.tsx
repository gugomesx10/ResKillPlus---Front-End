import Card from '../../components/Card/Card';

const Sobre = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Sobre o ResKillPlus
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center max-w-3xl mx-auto">
          Transformando carreiras através da tecnologia e educação continuada
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              O ResKillPlus é uma plataforma inovadora de requalificação profissional, desenvolvida para 
              enfrentar os desafios do mercado de trabalho em constante transformação.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Capacitamos profissionais com as habilidades necessárias para prosperar na economia digital.
            </p>
          </Card>

          <Card>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nossa Visão
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Ser a principal referência em requalificação profissional no Brasil, conectando pessoas 
              a oportunidades de crescimento e desenvolvimento.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Democratizar o acesso à educação de qualidade e preparar profissionais para o futuro.
            </p>
          </Card>
        </div>

        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">✔️ Inovação</h3>
              <p className="text-gray-600 dark:text-gray-400">Utilizamos tecnologia de ponta para criar soluções educacionais eficazes</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">✔️ Qualidade</h3>
              <p className="text-gray-600 dark:text-gray-400">Cursos desenvolvidos por especialistas alinhados com o mercado</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">✔️ Acessibilidade</h3>
              <p className="text-gray-600 dark:text-gray-400">Democratizamos o acesso à educação de qualidade</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Tecnologias Utilizadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">React 19</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Framework</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">TypeScript</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Linguagem</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Vite</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Build Tool</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Tailwind</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">CSS</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sobre;
