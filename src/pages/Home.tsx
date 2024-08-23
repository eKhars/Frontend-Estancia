import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CategoryList';
import tabletImage from '../assets/tablets.jpeg';
import telefonoImage from '../assets/telefono.jpeg';
import computadoraImage from '../assets/computadora.jpeg';
import audifonosImage from '../assets/audifonos.jpeg';



const popularCategories = [
  { id: 'Telefonos', name: 'Teléfonos', image: telefonoImage },
  { id: 'Tablets', name: 'Tablets', image: tabletImage },
  { id: 'Computadoras', name: 'Computadoras', image: computadoraImage },
  { id: 'Audifonos', name: 'Audifonos', image: audifonosImage },
];

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Categorías Populares</h2>
        <CategoryList categories={popularCategories} />
      </div>
    </div>
  );
};

export default Home;