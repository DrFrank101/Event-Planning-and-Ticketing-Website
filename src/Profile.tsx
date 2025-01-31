import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  username: string;
  email: string;
  role_id: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(user));
  }, [navigate]);

  if (!userData) {
    return null;
  }

  return (
    <div className="container mt-4">
      <div className="profile-container">
        <h2 className="text-center mb-4">Profilio Informacija</h2>
        <div className="profile-card">
          <div className="profile-info">
            <div className="info-group">
              <label>Vartotojo vardas:</label>
              <p>{userData.username}</p>
            </div>
            <div className="info-group">
              <label>El. paštas:</label>
              <p>{userData.email}</p>
            </div>
            <div className="info-group">
              <label>Rolė:</label>
              <p>{getRoleName(userData.role_id)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert role_id to name
function getRoleName(roleId: number): string {
  const roles: { [key: number]: string } = {
    1: 'Neprisijungęs',
    2: 'Prisijungęs',
    3: 'Patvirtintas',
    4: 'Moderatorius',
    5: 'Administratorius'
  };
  return roles[roleId] || 'Nežinoma rolė';
}

export default Profile;