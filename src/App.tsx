import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import { routes } from './routes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        JSON.parse(user);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;