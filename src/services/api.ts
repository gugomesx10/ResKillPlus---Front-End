const API_BASE_URL = 'https://sua-api-no-render.com';
const API_KEY = 'reskillplus123';

interface RequestOptions extends RequestInit {
  data?: any;
}

const api = {
  async request(endpoint: string, options: RequestOptions = {}) {
    const token = localStorage.getItem('accessToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    if (options.data) {
      config.body = JSON.stringify(options.data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
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