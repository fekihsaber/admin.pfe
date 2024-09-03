import React, { useState } from 'react';
import './ProductSearchFilter.css';

const ProductSearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    onFilter(category);
  };

  return (
    <div className='product-search-filter'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='filter'>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='all'>All Categories</option>
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kids'>Kids</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
      </div>
    </div>
  );
};

export default ProductSearchFilter;
