import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './MainPage.tsx'
import Navbar from './components/NavBar'  // Import Navbar
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />           {/* Add Navbar here */}
    <MainPage />
  </StrictMode>,
)