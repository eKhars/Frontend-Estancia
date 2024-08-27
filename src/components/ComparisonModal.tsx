import React from 'react';
import { Product } from '../types';

interface ComparisonModalProps {
  comparisonResult: {
    product1: Product;
    product2: Product;
    comparison: string;
  };
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ comparisonResult, onClose }) => {
  const { product1, product2, comparison } = comparisonResult;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Comparación de Productos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">{product1.titulo}</h3>
            <img src={product1.imagen_url} alt={product1.titulo} className="w-full h-48 object-contain mb-2" />
            <p>Precio: {product1.precio}</p>
            <p>Marca: {product1.marca || 'N/A'}</p>
            <p>Plataforma: {product1.plataforma || 'N/A'}</p>
            <p>Envío: {product1.envio || 'N/A'}</p>
            <p>Calificación: {product1.calificacion?.toFixed(1) || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-bold">{product2.titulo}</h3>
            <img src={product2.imagen_url} alt={product2.titulo} className="w-full h-48 object-contain mb-2" />
            <p>Precio: {product2.precio}</p>
            <p>Marca: {product2.marca || 'N/A'}</p>
            <p>Plataforma: {product2.plataforma || 'N/A'}</p>
            <p>Envío: {product2.envio || 'N/A'}</p>
            <p>Calificación: {product2.calificacion?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Comparación:</h3>
          <p>{comparison}</p>
        </div>
        <button 
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ComparisonModal;