import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Sidebar from '../components/SideBar';
import ComparisonModal from '../components/ComparisonModal';
import ComparisonBar from '../components/ComparisonBar';
import { getProductsByCategory, compareProducts, searchProducts } from '../api/products';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const query = params.get('query');

    setSelectedCategory(category);
    setIsLoading(true);

    if (query) {
      performSearch(query, category);
    } else if (category) {
      loadProductsByCategory(category);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const performSearch = async (query: string, category: string | null) => {
    try {
      const products = await searchProducts(query, category);
      setSearchResults(products);
      setFilteredResults(products);
      setAvailableBrands(getUniqueBrands(products));
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  const loadProductsByCategory = async (category: string) => {
    try {
      const products = await getProductsByCategory(category);
      setSearchResults(products);
      setFilteredResults(products);
      setAvailableBrands(getUniqueBrands(products));
      setIsLoading(false);
    } catch (err) {
      handleError(err);
    }
  };

  const getUniqueBrands = (products: Product[]) => {
    return Array.from(new Set(
      products
        .map(p => p.marca)
        .filter((brand): brand is string => typeof brand === 'string')
    ));
  };

  const handleError = (err: any) => {
    console.error('Error fetching products:', err);
    setError('Error al cargar los productos');
    setIsLoading(false);
  };

  const handleFilterChange = useCallback((filters: FilterState) => {
    const filtered = searchResults.filter((product: Product) => {
      let price = 0;
      if (typeof product.precio === 'string') {
        price = parseFloat(product.precio.replace(/[^0-9.-]+/g,""));
      } else if (typeof product.precio === 'number') {
        price = product.precio;
      }
      const isInPriceRange = !isNaN(price) && 
        price >= filters.priceRange[0] && 
        price <= filters.priceRange[1];

      const isInSelectedPlatforms = filters.selectedPlatforms.length === 0 || 
        (product.plataforma && filters.selectedPlatforms.includes(product.plataforma));

      const isInSelectedBrands = filters.selectedBrands.length === 0 || 
        (product.marca && filters.selectedBrands.includes(product.marca));

      const hasFreeShipping = !filters.freeShipping || 
        (product.envio && product.envio.toLowerCase().includes('gratis'));

      return isInPriceRange && isInSelectedPlatforms && isInSelectedBrands && hasFreeShipping;
    });

    setFilteredResults(filtered);
    setCurrentPage(1); 
  }, [searchResults]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else if (prev.length < 2) {
        return [...prev, productId];
      }
      return [prev[1], productId];
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
    setSelectedProductIds([]);
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProductIds(prev => prev.filter(id => id !== productId));
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredResults.slice(indexOfFirstProduct, indexOfLastProduct);

  const selectedProducts = filteredResults.filter(product => selectedProductIds.includes(product._id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onFilterChange={handleFilterChange}
          availableBrands={availableBrands}
        />
        <div className="flex-grow ml-8">
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
                products={currentProducts}
                selectedProductIds={selectedProductIds}
                onSelectProduct={handleSelectProduct}
              />
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
      
      {selectedProducts.length > 0 && (
        <ComparisonBar
          products={selectedProducts}
          onRemoveProduct={handleRemoveProduct}
          onCompare={handleCompare}
        />
      )}

      {isComparing && comparisonResult && (
        <ComparisonModal 
          comparisonResult={comparisonResult}
          onClose={handleCloseComparison}
        />
      )}
    </div>
  );
};

const Pagination: React.FC<{ itemsPerPage: number, totalItems: number, paginate: (pageNumber: number) => void, currentPage: number }> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex list-none">
        {pageNumbers.map(number => (
          <li key={number} className={`mx-1 px-3 py-2 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <button onClick={() => paginate(number)} className="focus:outline-none">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Search;
