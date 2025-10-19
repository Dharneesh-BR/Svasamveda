import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  if (initializing) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500 text-sm">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
