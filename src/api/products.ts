import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    let endpoint;
    switch (category.toLowerCase()) {
      case 'tablets':
        endpoint = '/tablets';
        break;
      case 'computadoras':
        endpoint = '/computers';
        break;
      case 'telefonos':
        endpoint = '/phones';
        break;
      case 'audifonos':
        endpoint = '/headphones';
        break;
      default:
        throw new Error('Categoría no soportada');
    }
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const compareProducts = async (category: string, id1: string, id2: string) => {
  try {
    let endpoint;
    switch (category.toLowerCase()) {
      case 'tablets':
        endpoint = '/tablets/compare';
        break;
      case 'computadoras':
        endpoint = '/computers/compare';
        break;
      case 'telefonos':
        endpoint = '/phones/compare';
        break;
      case 'audifonos':
        endpoint = '/headphones/compare';
        break;
      default:
        throw new Error('Categoría no soportada');
    }
    const response = await axios.get(`${API_BASE_URL}${endpoint}/${id1}/${id2}`);
    return response.data;
  } catch (error) {
    console.error('Error comparing products:', error);
    throw error;
  }
};