import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from './pages/Login';
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
    <div style={{ background: '#0a0a0a', color: 'white', padding: '20px', minHeight: '100vh' }}>
      <h1>Simon's Blog</h1>
      <p>Basic test - if you see this, React works</p>
    </div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path = '/admin' element = {<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path = '/' element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
