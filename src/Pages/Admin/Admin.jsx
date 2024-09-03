import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Dashboard from '../../Components/Dashboard/Dashboard';
import UserList from '../../Components/UserList/UserList';
import SearchAndFilter from '../../Components/SearchAndFilter/SearchAndFilter';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userlist' element={<UserList />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/searchandfilter' element={<SearchAndFilter />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;