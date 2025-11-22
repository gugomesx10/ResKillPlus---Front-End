import { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { pagamentoService } from '../../services/pagamentoService';
import type { Pagamento } from '../../types';

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Pagamento>({
    corporacao_id: 0,
    user_id: 0,
    quantia: 0,
    status: 'PENDENTE',
    dt_criacao: '',
  });

  useEffect(() => {
    carregarPagamentos();
  }, []);

  const carregarPagamentos = async () => {
    setLoading(true);
    try {
      const data = await pagamentoService.listarTodos();
      setPagamentos(data);
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pagamentoService.criar(formData);
      setShowForm(false);
      setFormData({ corporacao_id: 0, user_id: 0, quantia: 0, status: 'PENDENTE', dt_criacao: '' });
      await carregarPagamentos();
      alert('✅ Pagamento cadastrado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao salvar pagamento:', error);
      alert('❌ ' + (error.message || 'Erro ao salvar pagamento'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, novoStatus: string) => {
    setLoading(true);
    try {
      await pagamentoService.atualizarStatus(id, novoStatus);
      await carregarPagamentos();
      alert('✅ Status atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error);
      alert('❌ ' + (error.message || 'Erro ao atualizar status'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este pagamento?')) {
      setLoading(true);
      try {
        await pagamentoService.excluir(id);
        await carregarPagamentos();
        alert('✅ Pagamento excluído com sucesso!');
      } catch (error: any) {
        console.error('Erro ao excluir pagamento:', error);
        alert('❌ ' + (error.message || 'Erro ao excluir pagamento'));
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Gerenciar Pagamentos
        </h1>
        <Button onClick={() => { setShowForm(!showForm); setFormData({ corporacao_id: 0, user_id: 0, quantia: 0, status: 'PENDENTE', dt_criacao: '' }); }}>
          {showForm ? 'Cancelar' : 'Novo Pagamento'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Novo Pagamento
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="ID da Corporação"
              type="number"
              name="corporacao_id"
              value={formData.corporacao_id.toString()}
              onChange={handleChange}
              required
            />
            <Input
              label="ID do Usuário"
              type="number"
              name="user_id"
              value={formData.user_id.toString()}
              onChange={handleChange}
              required
            />
            <Input
              label="Quantia (R$)"
              type="number"
              name="quantia"
              value={formData.quantia.toString()}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="PENDENTE">Pendente</option>
                <option value="APROVADO">Aprovado</option>
                <option value="RECUSADO">Recusado</option>
              </select>
            </div>
            <Input
              label="Data do Pagamento"
              type="date"
              name="dt_criacao"
              value={formData.dt_criacao || ''}
              onChange={handleChange}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagamentos.map((pagamento, index) => (
          <Card key={index}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Pagamento #{pagamento.id}
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <p>Corporação ID: {pagamento.corporacao_id}</p>
              <p>Usuário ID: {pagamento.user_id}</p>
              <p className="text-lg font-bold text-green-600">R$ {(pagamento.quantia || 0).toFixed(2)}</p>
              <p>Status: <span className={`font-semibold ${pagamento.status === 'APROVADO' ? 'text-green-600' : pagamento.status === 'PENDENTE' ? 'text-yellow-600' : 'text-red-600'}`}>{pagamento.status}</span></p>
              {pagamento.dt_criacao && (
                <p>Data: {new Date(pagamento.dt_criacao).toLocaleDateString()}</p>
              )}
            </div>
            {pagamento.id && (
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => handleUpdateStatus(pagamento.id!, 'APROVADO')} variant="primary" className="text-xs">
                  Aprovar
                </Button>
                <Button onClick={() => handleUpdateStatus(pagamento.id!, 'RECUSADO')} variant="secondary" className="text-xs">
                  Recusar
                </Button>
                <Button onClick={() => handleDelete(pagamento.id!)} variant="danger" className="text-xs">
                  Excluir
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pagamentos;
