import { useState } from 'react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  const faqs = [
    {
      pergunta: 'Como faço para me cadastrar?',
      resposta: 'Acesse a página de Usuários e preencha o formulário com seus dados.',
    },
    {
      pergunta: 'Como me matriculo em um curso?',
      resposta: 'Após se cadastrar, acesse a página de Cursos, escolha o curso desejado e realize a matrícula.',
    },
    {
      pergunta: 'Os cursos são gratuitos?',
      resposta: 'A plataforma oferece cursos gratuitos e pagos. Verifique as informações de cada curso.',
    },
    {
      pergunta: 'Como funciona o sistema de recomendações?',
      resposta: 'O sistema analisa seu perfil e histórico para sugerir cursos adequados aos seus objetivos.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Fale Conosco
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 text-center">
          Estamos aqui para ajudar você
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Envie sua Mensagem
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full">Enviar Mensagem</Button>
            </form>
          </Card>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    {faq.pergunta}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.resposta}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">contato@reskillplus.com.br</p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Telefone</h3>
            <p className="text-gray-600 dark:text-gray-400">(11) 99999-9999</p>
          </Card>
          <Card className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Endereço</h3>
            <p className="text-gray-600 dark:text-gray-400">São Paulo - SP</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contato;
