import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching message : ', error);
      });
  }, []);

  return (
    <Router>
      <div className='App'>
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  Chat-Bot
                </Link>
              </div>
              
              <div className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <Link 
                      to="/" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-50"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-50"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/history" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-50"
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-50"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="md:hidden">
                <button className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mx-4 mt-4">
            <p className="text-sm">{message}</p>
          </div>
        )}

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/contact' element={<ContactPage/>}/>
            <Route path='/history' element={<HistoryPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App