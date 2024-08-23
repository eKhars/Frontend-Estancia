import React from 'react';
import { useParams } from 'react-router-dom';
import PriceHistory from '../components/PriceHistory';

const dummyProduct = {
  id: '1',
  title: 'Producto de Ejemplo',
  description: 'Esta es una descripción detallada del producto de ejemplo.',
  price: 99.99,
  image: 'https://via.placeholder.com/400',
  rating: 4.5,
  store: 'amazon'
};

const dummyPriceHistory = [
  { date: '2023-01-01', price: 120 },
  { date: '2023-02-01', price: 110 },
  { date: '2023-03-01', price: 100 },
  { date: '2023-04-01', price: 99.99 },
];

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // En una aplicación real, aquí cargarías los datos del producto basándote en el ID

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pr-4">
          <img src={dummyProduct.image} alt={dummyProduct.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h1 className="text-3xl font-bold mb-4">{dummyProduct.title}</h1>
          <p className="text-xl mb-4">${dummyProduct.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{dummyProduct.rating.toFixed(1)}</span>
          </div>
          <p className="mb-4">{dummyProduct.description}</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Comprar ahora
          </button>
        </div>
      </div>
      <PriceHistory data={dummyPriceHistory} />
    </div>
  );
};

export default Product;