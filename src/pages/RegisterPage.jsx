import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/authAPI';
import toast from 'react-hot-toast';


export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('User registered successfully');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/login');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Breadcrumb
  const breadcrumb = (
    <nav className="text-sm mb-4 self-start ml-4" aria-label="Breadcrumb">
      <ol className="list-reset flex text-gray-500">
        <li><a href="/" className="hover:underline text-(--color-primary)">Home</a></li>
        <li><span className="mx-2">&gt;</span></li>
        <li className="text-gray-700 font-semibold">Register</li>
      </ol>
    </nav>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-(--color-bg)">
      {breadcrumb}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-(--color-primary)">
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-(--color-primary) tracking-tight">Create Your Account</h2>
        <div className="mb-6">
          <label className="block text-(--color-font) font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font)"
          />
        </div>
        <div className="mb-6">
          <label className="block text-(--color-font) font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font)"
          />
        </div>
        <div className="mb-6">
          <label className="block text-(--color-font) font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font)"
          />
        </div>
        <div className="mb-8">
          <label className="block text-(--color-font) font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-(--color-accent) rounded-lg focus:outline-none focus:border-(--color-primary) bg-white text-(--color-font)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-(--color-primary) text-white py-3 rounded-lg font-semibold hover:bg-(--color-accent) transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-(--color-primary) hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
