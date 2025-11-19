const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-blue-400">ResKillPlus</h3>
            <p className="text-gray-400 text-sm mt-2">
              Plataforma de requalificação profissional
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2025 ResKillPlus. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Desenvolvido para Global Solution - FIAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
