import { useState } from 'react';
import { useRouter } from 'next/router'; // 引入 useRouter 钩子
import LogoutButton from '../LogOut';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter(); // 使用 Next.js 的 useRouter 来控制路由

  // 修改 handleClick 来进行路由跳转
  const handleClick = (path: string) => {
    router.push(`/dashboard/${path}`); // 跳转到对应的路径
  };

  return (
    <div className={`h-screen bg-white p-4 shadow-md ${isCollapsed ? 'w-16' : 'w-64'} transition-width duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Sidebar</h2>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>
      <ul>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('dashboard')}>
          <i className="fas fa-tachometer-alt mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('automaticmealanddietplanning')}>
          <i className="fas fa-utensils mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Automatic Meal and Diet Planning</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('smartnotifications')}>
          <i className="fas fa-bell mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Smart Notifications</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('moodbasedmusicrecommendations')}>
          <i className="fas fa-music mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Mood-Based Music Recommendations</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('intelligenthealthmonitoring')}>
          <i className="fas fa-heartbeat mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Intelligent Health Monitoring</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('proactivehealthinsights')}>
          <i className="fas fa-chart-line mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Proactive Health Insights</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('aichatbot')}>
          <i className="fas fa-robot mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>AI Chatbot</span>
        </li>
        <li className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => handleClick('')}>
          <i className="fas fa-home mr-3"></i>
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
        </li>

        {/* Logout */}
        <LogoutButton isCollapsed={isCollapsed} />
      </ul>
    </div>
  );
};

export default Sidebar;
