import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123456') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/dashboard');
    } else {
      setError('Password incorrect. Use 123456.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
        <h1 className="text-3xl font-black mb-6">Admin Login</h1>
        <p className="text-sm text-slate-400 mb-6">Enter the admin password to access order controls.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/80 px-4 py-3 text-white outline-none focus:border-white"
              placeholder="123456"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-100">
            Login as Admin
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-500">Admin route: <code className="rounded bg-slate-900 px-2 py-1">/admin</code></p>
      </div>
    </div>
  );
};

export default AdminLogin;
