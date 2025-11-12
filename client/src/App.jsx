import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from './pages/Login';
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path = '/admin' element = {<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path = '/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
