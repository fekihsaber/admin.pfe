import React from 'react'
import './Sidebar.css'
import {Link } from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_List_icon.svg'
import dashboard_icon from '../../assets/dashboard_icon.png'
import userlist_icon from '../../assets/userlist_icon.png'
import search_icon from '../../assets/search_icon.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/searchandfilter'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={search_icon} alt="" />
                <p>Search & Filter</p>
            </div>
        </Link>
        <Link to={'/dashboard'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={dashboard_icon} alt="" />
                <p>Dashboard</p>
            </div>
        </Link>
        <Link to={'/addproduct'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>

            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
        <Link to={'/userlist'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src={userlist_icon} alt="" />
                <p>Users List</p>
            </div>
        </Link>
        


    </div>
  )
}

export default Sidebar 