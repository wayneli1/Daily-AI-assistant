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
        body: JSON.stringify({}), // 传递空 body
      });

      if (response.ok) {
        // 清除登录时存储的用户信息
        localStorage.removeItem('userName'); // 确保移除的是 userName

        // 重定向到首页
        window.alert('You have successfully logged out!');
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
