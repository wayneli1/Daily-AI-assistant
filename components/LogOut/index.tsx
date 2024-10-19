// components/LogoutButton.tsx
import { useRouter } from 'next/router';
import React from 'react';

const LogoutButton: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 调用登出 API
      const response = await fetch('http://localhost:8101/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 如果有需要发送的数据，也可以在 body 中传递
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // API 调用成功后，清除本地存储中的用户数据
        localStorage.removeItem('username');
        

        // 重定向到首页
        window.alert('you log out!!')
        router.push('/');
      } else {
        console.error('Logout failed:', await response.json());
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={handleLogout}>
      <i className="fas fa-power-off mr-3"></i>
      <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Log Out</span>
    </li>
  );
};

export default LogoutButton;
