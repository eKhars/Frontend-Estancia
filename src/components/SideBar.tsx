import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';

interface SidebarProps {
  selectedCategory: string | null;
  onFilterChange: (filters: FilterState) => void;
  availableBrands: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onFilterChange, availableBrands }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [freeShipping, setFreeShipping] = useState(false);

  const platforms = ['Coppel', 'Mercado Libre', 'eBay'];

  useEffect(() => {
    onFilterChange({
      priceRange,
      selectedPlatforms,
      selectedBrands,
      freeShipping
    });
  }, [priceRange, selectedPlatforms, selectedBrands, freeShipping, onFilterChange]);

  const handlePriceChange = (value: number, index: number) => {
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const handleCheckboxChange = (
    item: string, 
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="bg-white shadow-md p-4 w-64">
      <h3 className="font-bold text-lg mb-4">Filtros</h3>
      
      {selectedCategory && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Categoría seleccionada</h4>
          <p>{selectedCategory}</p>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Rango de Precio</h4>
        <input 
          type="range" 
          min="0" 
          max="50000" 
          value={priceRange[1]} 
          onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
          className="w-full"
        />
        <div className="flex justify-between">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(parseInt(e.target.value), 0)}
            className="w-20 p-1 border rounded"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(parseInt(e.target.value), 1)}
            className="w-20 p-1 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Plataformas</h4>
        {platforms.map(platform => (
          <label key={platform} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handleCheckboxChange(platform, setSelectedPlatforms)}
              className="mr-2"
            />
            {platform}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Envío</h4>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
            className="mr-2"
          />
          Envío gratis
        </label>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Marcas</h4>
        {availableBrands.map(brand => (
          <label key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleCheckboxChange(brand, setSelectedBrands)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
