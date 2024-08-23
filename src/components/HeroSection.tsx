import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra tienda</h1>
        <p className="text-xl mb-8">Encuentra los mejores productos al mejor precio</p>
        <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
          Explorar ahora
        </button>
      </div>
    </div>
  );
};

export default HeroSection;