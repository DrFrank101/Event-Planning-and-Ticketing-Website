import React, { useState } from 'react';
import './Login.css';
import './index.css';


interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'll add the API call to your backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Prisijungimas</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">El. paštas</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Slaptažodis</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Prisijungti
          </button>
        </form>
        <div className="login-footer">
          <p>Neturite paskyros? <a href="/register">Registruotis</a></p>
          <a href="/forgot-password">Pamiršote slaptažodį?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;