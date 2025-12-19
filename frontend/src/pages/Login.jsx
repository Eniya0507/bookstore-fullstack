import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Import Redux action
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // <--- Import axios for Backend calls

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Register
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation (Basic)
    if (!email || !password || (!isLogin && !name)) {
  return toast.error("Please fill in all fields");
}

    try {
      let res;
      
      // 2. Connect to Real Backend
      if (isLogin) {
        // --- LOGIN Logic ---
        res = await axios.post('http://localhost:5001/api/users/login', { 
          email, 
          password 
        });
      } else {
        // --- REGISTER Logic ---
        res = await axios.post('http://localhost:5001/api/users', { 
          name, 
          email, 
          password,
          isAdmin: userType === 'admin'
        });
      }

      const userData = res.data; // This comes from your Backend (ID, Name, Token)

      // 3. Update Redux State (Global Store)
      dispatch(login(userData));
      
      // 4. Success Message
      toast.success(isLogin ? "Logged In Successfully!" : "Registration Successful!");
      
      // 5. Redirect based on Admin Status from database
      if (userData.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/shop');
      }

    } catch (error) {
      // Handle Errors (e.g., "User already exists" or "Invalid password")
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User Type Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Account Type:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="user" 
                  checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <span>User</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="admin" 
                  checked={userType === 'admin'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>
          
          {/* Show Name field only for Register */}
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" 
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" 
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" 
              placeholder="********"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 font-bold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;