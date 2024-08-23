import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import ProductGrid from '../components/ProductGrid';
import Sidebar from '../components/SideBar';
import ComparisonModal from '../components/ComparisonModal';
import { getProductsByCategory, compareProducts } from '../api/products';
import { Product, FilterState } from '../types';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setSelectedCategory(category);
  
    if (category) {
      setIsLoading(true);
      getProductsByCategory(category)
        .then((products: Product[]) => {
          setSearchResults(products);
          setFilteredResults(products);
          
          const uniqueBrands = Array.from(new Set(
            products
              .map(p => p.marca)
              .filter((brand): brand is string => typeof brand === 'string')
          ));
          setAvailableBrands(uniqueBrands);
          
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching products:', err);
          setError('Error al cargar los productos');
          setIsLoading(false);
        });
    }
  }, [location]);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = searchResults.filter((product: Product) => {
      // Manejo del precio
      let price = 0;
      if (typeof product.precio === 'string') {
        price = parseFloat(product.precio.replace(/[^0-9.-]+/g,""));
      } else if (typeof product.precio === 'number') {
        price = product.precio;
      }
      const isInPriceRange = !isNaN(price) && 
        price >= filters.priceRange[0] && 
        price <= filters.priceRange[1];
  
      // Manejo de plataformas
      const isInSelectedPlatforms = filters.selectedPlatforms.length === 0 || 
        (product.plataforma && filters.selectedPlatforms.includes(product.plataforma));
  
      // Manejo de marcas
      const isInSelectedBrands = filters.selectedBrands.length === 0 || 
        (product.marca && filters.selectedBrands.includes(product.marca));
  
      // Manejo de envío gratis
      const hasFreeShipping = !filters.freeShipping || 
        (product.envio && product.envio.toLowerCase().includes('gratis'));
  
      return isInPriceRange && isInSelectedPlatforms && isInSelectedBrands && hasFreeShipping;
    });
  
    setFilteredResults(filtered);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else if (prev.length < 2) {
        return [...prev, productId];
      }
      return [prev[1], productId]; // Reemplaza el primer producto seleccionado
    });
  };

  const handleCompare = async () => {
    if (selectedProductIds.length === 2 && selectedCategory) {
      setIsLoading(true);
      try {
        const result = await compareProducts(selectedCategory, selectedProductIds[0], selectedProductIds[1]);
        setComparisonResult(result);
        setIsComparing(true);
      } catch (error) {
        console.error('Error comparing products:', error);
        setError('Error al comparar los productos');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCloseComparison = () => {
    setIsComparing(false);
    setComparisonResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onFilterChange={handleFilterChange}
          availableBrands={availableBrands}
        />
        <div className="flex-grow ml-8">
          {!selectedCategory && <SearchForm />}
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory ? `Resultados en ${selectedCategory}` : 'Resultados de búsqueda'}
          </h2>
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <ProductGrid 
                products={filteredResults}
                selectedProductIds={selectedProductIds}
                onSelectProduct={handleSelectProduct}
              />
              {selectedProductIds.length === 2 && (
                <button
                  onClick={handleCompare}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Comparar productos seleccionados
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {isComparing && comparisonResult && (
        <ComparisonModal 
          comparisonResult={comparisonResult}
          onClose={handleCloseComparison}
        />
      )}
    </div>
  );
};

export default Search;