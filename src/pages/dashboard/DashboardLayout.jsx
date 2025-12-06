import { Outlet, NavLink } from 'react-router-dom';
import { FiShoppingBag, FiBookOpen, FiHeart, FiUser } from 'react-icons/fi';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                <FiUser className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <div className="space-y-1">
              <NavLink
                to="/dashboard/orders"
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-main text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FiShoppingBag className="mr-3 h-5 w-5" />
                My Orders
              </NavLink>
              <NavLink
                to="/dashboard/courses"
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-main text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FiBookOpen className="mr-3 h-5 w-5" />
                My Courses
              </NavLink>
              <NavLink
                to="/dashboard/favorites"
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-main text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <FiHeart className="mr-3 h-5 w-5" />
                Favorites
              </NavLink>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
