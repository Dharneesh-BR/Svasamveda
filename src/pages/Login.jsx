import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../firebase';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from, message } = location.state || { from: '/', message: null };

  const handleSocial = async (provider) => {
    setIsSubmitting(true);
    setErrors({});
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: `Google login failed: ${result.error || 'Please try again.'}` });
      }
    } catch (e) {
      setErrors({ submit: 'Google login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    try {
      const { email, password } = formData;
      const result = await signIn(email, password);
      
      if (result.success) {
        // Redirect to the intended page or home after successful login
        navigate(from, { replace: true });
      } else {
        // Handle specific Firebase auth errors
        let errorMessage = 'Login failed. Please check your email and password.';
        
        if (result.error.includes('auth/user-not-found')) {
          errorMessage = 'No account found with this email.';
        } else if (result.error.includes('auth/wrong-password')) {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (result.error.includes('auth/too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        } else if (result.error.includes('auth/user-disabled')) {
          errorMessage = 'This account has been disabled. Please contact support.';
        }
        
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-purple-200">
          Or{' '}
          <Link to="/signup" className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 text-red-100 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                Email address <span className="text-red-400">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-400' : 'border-purple-300/30'
                  } rounded-md shadow-sm placeholder-purple-300 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 sm:text-sm backdrop-blur-sm`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-400' : 'border-purple-300/30'
                  } rounded-md shadow-sm placeholder-purple-300 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 sm:text-sm backdrop-blur-sm`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300/30 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/reset-password" className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-300/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-purple-200">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleSocial('google')}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center py-2 px-4 border border-purple-300/30 rounded-md shadow-sm bg-white/10 text-sm font-medium text-purple-200 hover:bg-white/20 disabled:opacity-50 transition-all duration-200 backdrop-blur-sm"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span className="ml-2">Sign in with Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-purple-200">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

