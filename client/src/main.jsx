import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('React is loading...') // Debug line

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('React mounted successfully') // Debug line
} catch (error) {
  console.error('React mount error:', error) // Debug line
}