import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiShoppingCart, FiMail, FiMessageSquare, FiCheckSquare, 
  FiCalendar, FiFileText, FiFolder, FiDroplet,  
  FiUser, FiTwitter, FiBarChart2, FiCheck, FiMenu, FiSearch, 
  FiBell, FiChevronDown, FiMoon, FiSun, FiLogOut, FiPieChart, 
  FiTrendingUp, FiX, FiSettings
} from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

ChartJS.register(...registerables);

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches && 
           localStorage.getItem('darkMode') !== 'false');
  });
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const checkAuth = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        navigate('/signin', { replace: true });
      } else {
        setUser(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

 
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [4500, 3900, 5800, 6300, 7800, 8500],
      backgroundColor: darkMode ? 'rgba(167, 139, 250, 0.6)' : 'rgba(124, 58, 237, 0.6)',
      borderColor: darkMode ? 'rgb(167, 139, 250)' : 'rgb(124, 58, 237)',
      borderWidth: 1
    }]
  };

  const productDistributionData = {
      labels: ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Other'],
      datasets: [{
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          darkMode ? 'rgba(167, 139, 250, 0.6)' : 'rgba(124, 58, 237, 0.6)',
          darkMode ? 'rgba(129, 140, 248, 0.6)' : 'rgba(59, 130, 246, 0.6)',
          darkMode ? 'rgba(74, 222, 128, 0.6)' : 'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)'
        ],
        borderWidth: 1
      }]
    };
  
    const visitorTrendsData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Visitors',
        data: [1500, 2200, 1800, 2500],
        fill: false,
        backgroundColor: darkMode ? 'rgba(129, 140, 248, 0.6)' : 'rgba(59, 130, 246, 0.6)',
        borderColor: darkMode ? 'rgb(129, 140, 248)' : 'rgb(59, 130, 246)',
        tension: 0.4
      }]
    };
  
    const NavItem = ({ icon, text, active = false }) => {
      return (
        <li className={`nav-item ${active ? 'active' : ''}`}>
          <span className="icon">{icon}</span>
          {text}
        </li>
      );
    };
  
    const StatCard = ({ icon, title, value, change }) => {
      const isPositive = change >= 0;
      
      return (
        <div className="stat-card">
          <div className="flex items-start">
            <div className={`stat-icon ${darkMode ? 'dark' : 'light'}`}>
              {icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{value}</h3>
              <div className={`text-xs mt-1 flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    const TaskItem = ({ text, completed }) => {
      return (
        <li className="task-item">
          <button className={`task-checkbox ${completed ? 'completed' : 'incomplete'} ${darkMode ? 'dark' : 'light'}`}>
            {completed ? <FiCheck size={14} /> : null}
          </button>
          <span className={`task-text ${completed ? 'completed' : ''}`}>
            {text}
          </span>
        </li>
      );
    };
  
  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
      
      {mobileSidebarOpen && (
        <div className="mobile-overlay md:hidden" onClick={toggleMobileSidebar}></div>
      )}

  
      <nav className="navbar">
        <button 
          onClick={toggleMobileSidebar}
          className="sidebar-toggle md:hidden hover-light transition-colors"
        >
          {mobileSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>

        <button 
          onClick={toggleSidebar}
          className="sidebar-toggle hidden md:block hover-light transition-colors"
        >
          <FiMenu className="text-xl" />
        </button>

        <div className="search-container hidden sm:block">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-field"
            />
          </div>
        </div>

        <div className="navbar-icons">
          <button className="sm:hidden hover-light transition-colors">
            <FiSearch className="text-xl" />
          </button>

          <button
            onClick={toggleDarkMode}
            className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
          </button>

          <button className="notification-button hover-light transition-colors">
            <FiBell className="text-xl" />
            <span className="notification-dot"></span>
          </button>

          <div className="profile-dropdown">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="profile-button hover-light transition-colors"
            >
              <div className={`profile-avatar ${darkMode ? 'dark' : 'light'}`}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="rounded-full" />
                ) : (
                  <FiUser />
                )}
              </div>
              <span className="profile-name">{user?.name || 'User'}</span>
              <FiChevronDown className={`dropdown-arrow ${profileDropdownOpen ? 'open' : ''}`} />
            </button>

            {profileDropdownOpen && (
              <div className={`dropdown-menu ${darkMode ? 'dark' : 'light'}`}>
                <a href="#" className="dropdown-item">
                  <FiUser className="dropdown-icon" /> Profile
                </a>
                <a href="#" className="dropdown-item">
                  <FiSettings className="dropdown-icon" /> Settings
                </a>
                <button onClick={toggleDarkMode} className="dropdown-item">
                  {darkMode ? (
                    <>
                      <FiSun className="dropdown-icon" /> Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon className="dropdown-icon" /> Dark Mode
                    </>
                  )}
                </button>
                <button onClick={handleSignOut} className="dropdown-item">
                  <FiLogOut className="dropdown-icon" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

    
      <div className={`sidebar ${sidebarOpen ? '' : 'sidebar-closed'} ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
       <div className="sidebar-header">
              <h1 className="sidebar-title">
                <FiDroplet className={`sidebar-logo ${darkMode ? 'dark' : 'light'}`} />
              ValhallaVue
              </h1>
              <button 
                onClick={toggleMobileSidebar}
                className="sidebar-close md:hidden hover-light transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>
            
            <nav className="sidebar-content">
              <div className="sidebar-section">
                <h2 className="sidebar-section-title">HOMES</h2>
                <ul className="sidebar-menu">
                  <NavItem icon={<FiHome />} text="Analytics Dashboard" active />
                  <NavItem icon={<FiShoppingCart />} text="Ecommerce Dashboard" />
                </ul>
              </div>
              
              <div className="sidebar-section">
                <h2 className="sidebar-section-title">APPS</h2>
                <ul className="sidebar-menu">
                  <NavItem icon={<FiMail />} text="Email" />
                  <NavItem icon={<FiMessageSquare />} text="Chat" />
                  <NavItem icon={<FiCheckSquare />} text="Todo" />
                  <NavItem icon={<FiCalendar />} text="Calendar" />
                  <NavItem icon={<FiFileText />} text="Invoice" />
                  <NavItem icon={<FiFolder />} text="File Manager" />
                </ul>
              </div>
              
              
    
              <div className="sidebar-section">
                <button
                  onClick={toggleDarkMode}
                  className={`theme-switch ${darkMode ? 'dark' : 'light'}`}
                >
                  <span className="theme-switch-content">
                    {darkMode ? (
                      <>
                        <FiSun className="theme-icon" /> Light Mode
                      </>
                    ) : (
                      <>
                        <FiMoon className="theme-icon" /> Dark Mode
                      </>
                    )}
                  </span>
                  <span className={`theme-switch-toggle ${darkMode ? 'dark' : 'light'}`}>
                    <span className="theme-switch-thumb"></span>
                  </span>
                </button>
              </div>
            </nav>
      </div>

      
      <div className="main-content">
        <div className="content-container">
       
          <div className="grid-responsive gap-4 sm:gap-6 mb-6">
            <StatCard icon={<FiShoppingCart />} title="Total Sales" value="$24,780" change={12.5} />
            <StatCard icon={<FiCheckSquare />} title="New Orders" value="1,250" change={8.2} />
            <StatCard icon={<FiUser />} title="Customers" value="8,549" change={-3.1} />
            <StatCard icon={<FiBarChart2 />} title="Revenue" value="$18,230" change={18.7} />
          </div>

         
          <div className="chart-grid gap-4 sm:gap-6 mb-6">
          
            <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">
                  <FiBarChart2 className="chart-title-icon" /> Sales Overview
                </h3>
                <div className="chart-controls">
                  <select className="chart-select">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
              <div className="chart-wrapper">
                <Bar data={salesData} options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                      ticks: { color: darkMode ? '#D1D5DB' : '#4B5563' }
                    },
                    x: {
                      grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                      ticks: { color: darkMode ? '#D1D5DB' : '#4B5563' }
                    }
                  }
                }} />
              </div>
            </div>
 <div className="chart-container">
              <div className="chart-header">
                <h3 className="chart-title">
                  <FiPieChart className="chart-title-icon" /> Product Distribution
                </h3>
               
              </div>
              <div className="chart-wrapper">
                <Pie 
                  data={productDistributionData} 
                  options={{ 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: window.innerWidth < 640 ? 'bottom' : 'right',
                        labels: { color: darkMode ? '#D1D5DB' : '#4B5563' }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

         
          <div className="chart-container mb-6">
            <div className="chart-header">
              <h3 className="chart-title">
                <FiTrendingUp className="chart-title-icon" /> Visitor Trends
              </h3>
              <div className="chart-controls">
                <select className="chart-select">
                  <option>Last 4 Weeks</option>
                  <option>Last 8 Weeks</option>
                  <option>Last 12 Weeks</option>
                </select>
               
              </div>
            </div>
            <div className="chart-wrapper h-64 sm:h-80">
              <Line 
                data={visitorTrendsData} 
                options={{ 
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                      ticks: { color: darkMode ? '#D1D5DB' : '#4B5563' }
                    },
                    x: {
                      grid: { color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
                      ticks: { color: darkMode ? '#D1D5DB' : '#4B5563' }
                    }
                  }
                }} 
              />
            </div>
          </div>

          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="chart-container">
              <h3 className="card-title">Good Job, {user?.name || 'User'}!</h3>
              <p className="card-subtitle">You've Finished All Of Your Tasks For This week.</p>
              <ul className="task-list">
                <TaskItem text="Finish Dashboard Design" completed />
                <TaskItem text="Fix Issue #74" completed />
                <TaskItem text="Publish Version 1.0.6" completed />
                <TaskItem text="Update Documentation" completed={false} />
                <TaskItem text="Review Pull Requests" completed={false} />
              </ul>
              <button className="task-view-button">
                View All Tasks
              </button>
            </div>

       
            <div className="twitter-card">
              <div className={`twitter-icon ${darkMode ? 'dark' : 'light'}`}>
                <FiTwitter className="text-xl" />
              </div>
              <div>
                <p className="twitter-text">
                  Hi! Wait A Minute . . . . Follow Me On Twitter <a href="#" className="twitter-link">@Mocsaid</a>
                </p>
                <button className="twitter-follow-button">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DashboardPage;