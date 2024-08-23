import React from 'react';
import { Product } from '../types';

interface ComparisonBarProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onCompare: () => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ products, onRemoveProduct, onCompare }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="font-bold text-lg">Comparar Productos</h3>
        <div className="flex space-x-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center bg-gray-100 p-2 rounded">
              <img src={product.imagen_url || product.imagen} alt={product.titulo} className="w-12 h-12 object-cover mr-2" />
              <div>
                <p className="font-semibold">{product.titulo}</p>
                <p>{typeof product.precio === 'number' ? `$${product.precio.toFixed(2)}` : product.precio}</p>
              </div>
              <button 
                onClick={() => onRemoveProduct(product.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
        {products.length === 2 && (
          <button 
            onClick={onCompare}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Comparar
          </button>
        )}
      </div>
    </div>
  );
};

export default ComparisonBar;