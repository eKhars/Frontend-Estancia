import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  selectedProductIds: string[];
  onSelectProduct: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, selectedProductIds = [], onSelectProduct }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          <div className="relative pt-[100%] bg-gray-100">
            <img 
              src={product.imagen_url || product.imagen} 
              alt={product.titulo} 
              className="absolute inset-0 w-full h-full object-contain p-4"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.titulo}</h3>
              {product.marca && <p className="text-gray-600 mb-2">{product.marca}</p>}
              <p className="text-blue-600 font-bold mb-2">
                {typeof product.precio === 'number' ? `$${product.precio.toFixed(2)}` : product.precio}
              </p>
              {product.envio && <p className="text-green-600 mb-2">{product.envio}</p>}
              {product.calificacion !== undefined && (
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{product.calificacion.toFixed(1)}</span>
                </div>
              )}
              {product.plataforma && <p className="text-gray-600 mb-2 font-bold">Plataforma: {product.plataforma}</p>}
            </div>
            <div className="flex justify-between items-center mt-4">
              <a 
                href={product.url || product.redireccion} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 text-center"
              >
                Ver producto
              </a>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="compareProduct"
                  value={product.id}
                  checked={selectedProductIds.includes(product.id)}
                  onChange={() => onSelectProduct(product.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                  disabled={selectedProductIds.length >= 2 && !selectedProductIds.includes(product.id)}
                />
                <span className="ml-2">Comparar</span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
