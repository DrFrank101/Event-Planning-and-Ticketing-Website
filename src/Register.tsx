import React, { useState } from 'react';
import './Login.css';
import './index.css';
import { useNavigate } from 'react-router-dom';  // Add this import

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = 'Vardas turi būti bent 3 simbolių ilgio';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Įveskite teisingą el. pašto adresą';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Slaptažodis turi būti bent 6 simbolių ilgio';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Slaptažodžiai nesutampa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      // Log the raw response for debugging
      const rawResponse = await response.text();
      console.log('Raw server response:', rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (e) {
        console.error('Failed to parse server response:', e);
        throw new Error('Server returned invalid data');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store user data and redirect
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');

    } catch (error: any) {
      setServerError(error.message);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
          setErrors(prev => ({ ...prev, [name]: undefined }));
        }
      };

      return (
        <div className="login-container">
          <div className="login-box">
            <h2>Registracija</h2>
            {serverError && (
              <div className="error-message">{serverError}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Vartotojo vardas</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && (
                  <span className="error-text">{errors.username}</span>
                )}
              </div>
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
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
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
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Pakartokite slaptažodį</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Registruojama...' : 'Registruotis'}
              </button>
            </form>
            <div className="login-footer">
              <p>Jau turite paskyrą? <a href="/login">Prisijungti</a></p>
            </div>
          </div>
        </div>
      );
    };
    
    export default Register;