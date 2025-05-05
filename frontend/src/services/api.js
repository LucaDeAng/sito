import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_BACKEND_URL || '/api';

// Create an axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle specific error codes if needed
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// API service functions
const apiService = {
  // Newsletter API
  subscribeToNewsletter: async (email) => {
    try {
      const response = await apiClient.post('/api/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  unsubscribeFromNewsletter: async (email) => {
    try {
      const response = await apiClient.post('/api/newsletter/unsubscribe', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Contact Form API
  submitContactForm: async (contactData) => {
    try {
      const response = await apiClient.post('/api/contact/submit', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Prompts API
  getPrompts: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/prompts', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getPromptById: async (id) => {
    try {
      const response = await apiClient.get(`/api/prompts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createPrompt: async (promptData) => {
    try {
      const response = await apiClient.post('/api/prompts', promptData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updatePrompt: async (id, promptData) => {
    try {
      const response = await apiClient.put(`/api/prompts/${id}`, promptData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  likePrompt: async (id) => {
    try {
      const response = await apiClient.post(`/api/prompts/${id}/like`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deletePrompt: async (id) => {
    try {
      await apiClient.delete(`/api/prompts/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;