import LoginWithOtp from './LoginWithOtp';

export default function Login() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-md mx-auto py-16">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Login</h1>
        <LoginWithOtp />
      </div>
    </div>
  );
}

