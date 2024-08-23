import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/search?category=${category.id}`}
          className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
        >
          <div className="relative pt-[75%]">
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x225?text=No+Image';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-center">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;