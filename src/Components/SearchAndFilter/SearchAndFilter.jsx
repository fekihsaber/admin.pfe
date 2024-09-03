import React, { useState, useEffect } from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== 'All') {
      results = results.filter(product =>
        product.category === category
      );
    }
    setFilteredProducts(results);
  }, [searchTerm, category, products]);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewPrice(product.new_price);
  };

  const handleUpdatePrice = async () => {
    if (!editingProduct || !newPrice) return;

    try {
      const response = await fetch('http://localhost:4000/updateprice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingProduct.id,
          new_price: parseFloat(newPrice),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update price');
      }
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editingProduct.id ? { ...product, new_price: parseFloat(newPrice) } : product
        )
      );
      setEditingProduct(null);
      setNewPrice('');
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div className='search-and-filter'>
      <h1>Search & Filter Products</h1>
      <div className='search-filter-controls'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='product-list'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-item'>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Price: ${product.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
