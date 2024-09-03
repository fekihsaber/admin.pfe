import React, { useEffect, useState } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='userlist'>
      <h1>User List</h1>
      <div className="userlist-format-main">
        <p>Email:</p>
      </div>
      <div className="userlist-allusers">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="userlist-format-main">
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
