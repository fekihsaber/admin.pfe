import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        await fetchInfo();
    }

    return (
        <div className="listproduct-container">
            <div className='listproduct'>
                <h1>All Products List</h1>
                <div className="listproduct-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
                </div>
                <div className="listproduct-allproduct">
                    <hr />
                    {allproducts.map((product, index) => (
                        <React.Fragment key={index}>
                            <div className="listproduct-format-main">
                                <img className='listproduct-product' src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                                <p>${product.old_price}</p>
                                <p>${product.new_price}</p>
                                <p>{product.category}</p>
                                <img
                                    onClick={() => removeProduct(product.id)}
                                    className='listproduct-remove-icon'
                                    src={cross_icon}
                                    alt="Remove"
                                />
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
