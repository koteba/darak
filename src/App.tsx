import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastProvider } from './components/Toast'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import FavoritesPage from './pages/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage'
export default function App() {
  return (<ToastProvider><Navbar /><main className="min-h-[70vh]"><Routes>
    <Route path="/" element={<HomePage />} /><Route path="/properties" element={<PropertiesPage />} />
    <Route path="/property/:id" element={<PropertyDetailsPage />} /><Route path="/favorites" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /></ToastProvider>)
}
