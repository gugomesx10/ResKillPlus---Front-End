const API_BASE_URL = 'https://reskillplus-java.onrender.com';
const API_KEY = 'reskillplus123';

interface RequestOptions extends RequestInit {
  data?: any;
}

const api = {
  async request(endpoint: string, options: RequestOptions = {}) {
    const token = localStorage.getItem('accessToken');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      mode: 'cors',
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status} - ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar à API. Verifique sua conexão ou aguarde o servidor acordar.');
      }
      throw error;
    }
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data: any) {
    return this.request(endpoint, { method: 'POST', data });
  },

  put(endpoint: string, data: any) {
    return this.request(endpoint, { method: 'PUT', data });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default api;