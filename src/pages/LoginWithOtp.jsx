import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../utils/auth';

export default function LoginWithOtp() {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: enter mobile, 2: enter otp
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate OTP send, in real app call backend
    setOtpSent(true);
    setStep(2);
    setError('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === '123456') {
      // Simulate registered user
      setUser({ name: 'User' }); // You can replace with real name from backend
      alert('Login successful!');
      navigate('/');
    } else {
      setError('Invalid OTP. Try 123456 for demo.');
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <label className="block mb-2 font-medium text-indigo-700">Registered Mobile Number</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />
          <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700">Send OTP</button>
          <div className="text-sm mt-4 text-center">
            Not registered?{' '}
            <Link className="text-indigo-700 underline font-medium" to="/signup">Sign Up</Link>
          </div>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <label className="block mb-2 font-medium text-indigo-700">Enter OTP</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Enter OTP (use 123456 for demo)"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
            maxLength={6}
          />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700 mb-2">Verify OTP</button>
          <button type="button" className="w-full text-indigo-600 underline" onClick={() => setStep(1)}>Back</button>
        </form>
      )}
    </div>
  );
}
