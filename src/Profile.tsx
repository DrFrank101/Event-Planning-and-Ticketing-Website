import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './Profile.css'

interface User {
  username: string;
  email: string;
  role_id: number;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <h2>Mano Profilis</h2>
        <div className="profile-info">
          <p><strong>Vartotojo vardas:</strong> {user.username}</p>
          <p><strong>El. paštas:</strong> {user.email}</p>
          <p><strong>Rolė:</strong> {
            user.role_id === 1 ? 'Neprisijungęs' :
            user.role_id === 2 ? 'Prisijungęs' :
            user.role_id === 3 ? 'Patvirtintas' :
            user.role_id === 4 ? 'Moderatorius' :
            user.role_id === 5 ? 'Administratorius' : 'Nežinoma'
          }</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;