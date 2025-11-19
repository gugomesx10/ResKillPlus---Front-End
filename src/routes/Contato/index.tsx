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
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Contato e FAQ
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Entre em Contato
          </h2>
          <form onSubmit={handleSubmit}>
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mensagem <span className="text-red-500">*</span>
              </label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button type="submit">Enviar Mensagem</Button>
          </form>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {faq.pergunta}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {faq.resposta}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
