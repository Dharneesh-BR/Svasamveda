import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: mobile, 2: otp, 3: registration
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate OTP send
    setOtpSent(true);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === '123456') {
      setStep(3);
    } else {
      alert('Invalid OTP. Try 123456 for demo.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-pink-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-indigo-800 mb-6">Sign Up</h1>
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2 font-medium text-indigo-700">Mobile Number</label>
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
            <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700 mb-2">Verify OTP</button>
            <button type="button" className="w-full text-indigo-600 underline" onClick={() => setStep(1)}>Back</button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleRegister}>
            <label className="block mb-2 font-medium text-indigo-700">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <label className="block mb-2 font-medium text-indigo-700">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Email Address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
            <label className="block mb-2 font-medium text-indigo-700">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white rounded py-2 font-semibold hover:bg-indigo-700">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}
