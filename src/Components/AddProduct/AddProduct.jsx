import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: '',
        new_price: '',
        old_price: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_product = async () => {
        console.log(productDetails);
        let responseDate;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }

            responseDate = await uploadResponse.json();

            if (responseDate.success) {
                product.image = responseDate.image_url;

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (!addProductResponse.ok) {
                    throw new Error('Failed to add product');
                }

                const data = await addProductResponse.json();
                if (data.success) {
                    toast.success('Product successfully added!');
                } else {
                    toast.error('Failed to add product.');
                }
            } else {
                toast.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(`An error occurred: ${error.message}`);
        }
    }

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder="Enter product title" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder="Enter price" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder="Enter offer price" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" name="image" hidden />
                <button onClick={Add_product} className='addproduct-btn'>ADD</button>
            </div>
            <ToastContainer /> {/* Add this to render toast notifications */}
        </div>
    );
}

export default AddProduct;
