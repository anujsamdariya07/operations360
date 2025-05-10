import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn(username, password);
    if (res.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222222] text-[#ff851b]">
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 font-bold text-center">Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded bg-[#2d2d2d] text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded bg-[#2d2d2d] text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff851b] text-black py-3 rounded hover:bg-orange-500 font-semibold"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
